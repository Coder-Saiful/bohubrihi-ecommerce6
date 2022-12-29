import React, { useState } from 'react';
import { register } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        disabled: false
    });

    const {name, email, password, error, disabled} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        setValues({
            ...values,
            disabled: true
        });

        const submitBtn = document.querySelector('.submitBtn');
        submitBtn.textContent = '';
        submitBtn.classList.add('loading');

        register({name: name, email: email, password: password})
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    disabled: false,
                    error: false
                });
        
                submitBtn.textContent = 'Register';
                submitBtn.classList.remove('loading');

                toast.success(`${response.data.message} Please login.`, {
                    autoClose: 3000
                });
            })
            .catch(err => {
                if (err.response) {
                    setValues({
                        ...values,
                        disabled: false,
                        error: err.response.data
                    });
            
                    submitBtn.textContent = 'Register';
                    submitBtn.classList.remove('loading');
                    
                    if (err.response.data.message) {
                        toast.error(`${err.response.data.message}`, {
                            autoClose: 3000
                        });
                    }
                } else {
                    if (navigator.onLine) {
                        setValues({
                            ...values,
                            disabled: false,
                            error: false
                        });  

                        submitBtn.textContent = 'Register';
                        submitBtn.classList.remove('loading');

                        toast.error(`Registration failed! Please try again.`, {
                            autoClose: 3000
                        });
                    } else {
                        setValues({
                            ...values,
                            disabled: false,
                            error: false
                        });  

                        submitBtn.textContent = 'Register';
                        submitBtn.classList.remove('loading');

                        toast.error(`Internet connection failed!`, {
                            autoClose: 3000
                        });
                    }
                }
            });
    }

    return (
        <Layout title='Register' classname='container'>
            <ToastContainer />
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <h1 className='text-center'>Register Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Your Name:</label>
                            <input type="text" className="form-control" name='name' value={name} onChange={handleChange} />
                            <div className="text-danger">{error.name ? error.name + '!' : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address:</label>
                            <input type="text" className="form-control" name='email' value={email} onChange={handleChange} />
                            <div className="text-danger">{error.email ? error.email + '!' : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" className="form-control" name='password' value={password} onChange={handleChange} />
                            <div className="text-danger">{error.password ? error.password + "!" : ''}</div>
                        </div>
                        <button type="submit" disabled={disabled} className="submitBtn">Register</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;