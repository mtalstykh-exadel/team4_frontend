import React from 'react';
import LoginForm from './loginForm/LoginForm';
import logo from '../../assets/images/logo/logo.png';
import './login.scss';

const Login = () => {

    return <div className='login'>
        <img src={logo} alt="" className='logo' />
        <h2>English level test</h2>
        <LoginForm />

    </div>;
};

export default Login;