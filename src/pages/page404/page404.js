import React from 'react';

import './page404.scss';
import logo from '../../assets/images/logo/logo.svg';
import Button from '@material-ui/core/Button';

const Page404 = () => {
  return (
    <>
      <div className='body404'>
        <div className='body404 block'>
          <div className='text404'>
            <div>4</div>
            <img src={logo} alt='logo' className='logo404'/>
            <div>4</div>
          </div>
        </div>
      </div>
      <div className='caption404'>
        <h1>Oops, this page was not found!</h1>
        <h3>Either something went wrong or the page doesn't exist anymore.</h3>
      </div>
      <div className='button404'>
        <Button color='primary' variant='contained'>Go Home</Button>
      </div>
    </>
  );
};

export default Page404;
