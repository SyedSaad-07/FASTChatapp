import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.PNG';

const cookies = new Cookies();


const initialState = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSignup, setIsSignup] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormErrors(validate(form))
        setIsSubmit(true);
        console.log(formErrors);

        if(Object.keys(formErrors).length === 0 && isSubmit){
            const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';
        // const URL = 'https://fastchatting.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword, email } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, email:form.email, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('email', email);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }
        window.location.reload();
        }

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    useEffect(()=>{
        // console.log(formErrors);
        // if(formErrors === true && isSubmit) {
        //     console.log(form)
        // }
        if(Object.keys(formErrors).length === 0 && isSubmit){
            // console.log(form)
        }
    }, [isSignup])

    const validate = (values) =>{
        const errors = {};
        const email_regex = /[a-z]+[0-9]+@+[nu]+\.edu.pk/ ;
        
        if(!values.username) {
            errors.username = "Username is required!";
        }
        if(!values.email && isSignup) {
            errors.email = "Email is required! ";
        }else if(!email_regex.test(values.email) && isSignup) {
            errors.email = "Enter your nu email address! ";
        }
        if(!values.phoneNumber&& isSignup){
            errors.phoneNumber = "Phone Number is required! ";
        }else if(values.phoneNumber.length < 11 && isSignup){
            errors.phoneNumber = "Phone number must be 11 characters long";
        }else if(values.phoneNumber.length > 11 && isSignup){
            errors.phoneNumber = "Phone number must not be 11 characters long";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4 && isSignup) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10 && isSignup) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if((values.confirmPassword!==values.password) && isSignup)
        {
            errors.confirmPassword = "Password is incorrect! ";
        }
          return errors;
    }

    const errorStyle = {
        color:"red",
        fontSize:"14px"
    } 

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Email</label>
                                <input 
                                    name="email" 
                                    type="email"
                                    placeholder="nu email address"
                                    value={form.email}
                                    onChange={handleChange}
                                    // required
                                />
                            <p style={errorStyle}>{formErrors.email}</p>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    // required
                                />
                            </div>
                            <p style={errorStyle}>{formErrors.username}</p>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    // required
                                />
                            <p style={errorStyle}>{formErrors.phoneNumber}</p>
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    value={form.avatarURL}
                                    onChange={handleChange}
                                    // required
                                />
                             <p style={errorStyle}>{formErrors.avatarURL}</p>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    // required
                                />
                            </div>
                        <p style={errorStyle}>{formErrors.password}</p>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    // required
                                />
                            <p style={errorStyle}>{formErrors.confirmPassword}</p>
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth