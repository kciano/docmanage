const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const { OAuth2Client } = require('google-auth-library');

const fetch = require('node-fetch');
const { response } = require('express');
const { use } = require('../routes/auth.routes');

const registerUser = (req, res) => {
    const { name, email, password, role } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const newUser = new User({ name, email, password, role });
        newUser.save();
        
        return res.status(201).json({
            message: 'User created successfully! Please signin',
            newUser
        });
    })
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password does not match'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role }
        });
    })
};

const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET
    // algorithms: ['HS256']
})

const adminMiddleware = (req, res, next) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        if (user.role !== "admin") {
            return res.status(400).json({
                error: "Admin resource. Access denied"
            })
        }

        req.profile = user;
        next()
    })
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = (req, res) => {
    const { idToken } = req.body;

    client.verifyIdToken({ idToken: idToken, audience: process.env.GOOGLE_CLIENT_ID })
        .then(response => {
            const { email_verified, name, email } = response.payload;

            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
                        const { _id, email, name, role } = user;

                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                })
            }
        })
}

const facebookAuth = (req, res) => {
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            const { email, name } = response;

            User.findOne({email}).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
                    const { _id, email, name, role } = user;

                    return res.json({
                        token,
                        user: { _id, email, name, role }
                    })
                }
            })
        })
        .catch(error => {
            res.json({
                error: 'Facebook login failed. Try later'
            })
        })
    )
}
module.exports = {
    registerUser,
    loginUser,
    requireSignin,
    adminMiddleware,
    googleAuth,
    facebookAuth
}