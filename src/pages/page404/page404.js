import React from 'react';

import './page404.scss';
import logo from '../../assets/images/logo/logo.svg';
import Button from '@material-ui/core/Button';

const Page404 = () => {
  return (
    <div className='page404'>
      <div className='logo404-wrapper'>
            <span>4</span>
            <span><img src={logo} alt='logo' className='logo'/></span>
            <span>4</span>
      </div>
      <div className='message-wrapper'>
        <h1>Oops, this page was not found!</h1>
        <h3>Either something went wrong or the page doesn't exist anymore.</h3>
      </div>
      <div className='button-wrapper'>
        <Button color='primary' variant='contained'>Go Home</Button>
      </div>
    </div>
  );
};

export default Page404;
