import React from 'react';
import './Page404.scss';
import logo from '../../assets/images/logo/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className='page404'>
      <div className='logo404-wrapper font-color'>
        <span>4</span>
        <span><img src={logo} alt='logo' className='logo'/></span>
        <span>4</span>
      </div>
      <div className='message-wrapper font-warning'>
        <h1>Oops, this page was not found!</h1>
        <h3>Either something went wrong or the page doesn't exist anymore.</h3>
      </div>
      <div className='button-wrapper'>
        <Button className='primary-contained' variant='contained' component={Link} to='/'>Go Home</Button>
      </div>
    </div>
  );
};

export default Page404;
