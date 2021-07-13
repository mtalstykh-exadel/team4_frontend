import React from 'react';
import LoginForm from '../../components/login/loginForm/LoginForm';
import logo from '../../assets/images/logo/logoText.png';
import './login.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const auth = useSelector((state) => state.login.isAuth);
	if (auth) return <Redirect to='/profile' />;
	return <div className='login'>
		<img src={logo} alt="" className='logo' />
		<LoginForm />
	</div>;
};

export default Login;
