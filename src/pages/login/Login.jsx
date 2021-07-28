import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/images/logo/logoText.svg";
import "./Login.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  if (auth) return <Redirect to='/' />;
  return (
    <div className='loginWrapper'>
      <div className='loginRow'>
        <img src={logo} alt="" className='logo' />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
