const express = require('express');
const router = express.Router();

const { registerUser, loginUser, adminMiddleware, googleAuth, facebookAuth } = require('../controller/auth.controller')

router.post('/signup', registerUser)
router.post('/signin', loginUser)

router.post('/google-loggin', googleAuth);
router.post('/facebook-loggin', facebookAuth);

module.exports = router