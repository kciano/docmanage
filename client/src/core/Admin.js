import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth, getCookie, signout, updateUser } from '../auth/Helper';

import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {

    const [ values, setValues ] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `/api/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const { role, name, email } = response.data;
            setValues({ ...values, role, name, email });
        })
        .catch((error) => {
            if (error.response.status === 401) {
                signout(() => history.push('/'));
            }
        });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting'});

        axios({
            method: 'PUT',
            url: `/api/admin/update`,
            data: { name, password },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        .then((response) => {
            updateUser(response, () => {
                setValues({ ...values, buttonText: 'Submitted'});
                toast.success('Profile updated successfully');

                setValues({ ...values, buttonText: 'Submit' });
            });
        })

        .catch((error) => {
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input
                    disabled
                    defaultValue={role}
                    type="text"
                    style={{cursor: 'not-allowed'}}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    disabled
                    defaultValue={email}
                    type="email"
                    style={{cursor: 'not-allowed'}}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    )

    
    return (
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="pt-5 text-center">Admin</h1>
            <p className="lead text-center">Profile Update</p>
            {updateForm()}
        </div>
    );
};

export default Admin;