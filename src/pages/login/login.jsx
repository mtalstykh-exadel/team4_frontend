import React from "react";
import LoginForm from "../../components/login/loginForm/LoginForm";
import logo from "../../assets/images/logo/logoText.svg";
import "./login.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  const auth = useSelector((state) => state.login.isAuth);
  if (auth) return <Redirect to='/edittests' />;
  return (
    <div className='login'>
      <img src={logo} alt="" className='logo' />
      <LoginForm />
    </div>
  );
};

export default Login;
