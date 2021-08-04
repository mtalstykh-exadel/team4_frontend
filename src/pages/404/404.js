import React from 'react';
import './404.scss';
import logo from '../../assets/images/logo/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';
// import ResultTest from '../../components/ResultTest/ResultTest';

export const Page404 = () => {
  return (
    // <ResultTest/>
    <div className='page404'>
      <div className='logo404-wrapper font-color'>
        <span>4</span>
        <span><img src={logo} alt='logo' className='logo'/></span>
        <span>4</span>
      </div>
      <div className='message-wrapper font-warning'>
        <h1><Trans>Oops, this page was not found!</Trans></h1>
        <h3><Trans>Either something went wrong or the page doesn't exist anymore.</Trans></h3>
      </div>
      <div className='button-wrapper'>
        <Button color='primary' variant='contained' component={Link} to='/'><Trans>Go Home</Trans></Button>
      </div>
    </div>
  );
};
