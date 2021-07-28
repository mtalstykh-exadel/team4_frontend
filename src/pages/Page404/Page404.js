import React from 'react';
import './Page404.scss';
import logo from '../../assets/images/logo/logo.svg';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import '../../styles/modal.scss';
import AssignTest from '../../components/modal_windows_hr/assigning_test_to_user';
import ViewingUserInf from "../../components/modal_windows_hr/user_inf";


const Page404 = () => {

  return (
    <div className='page404'>
      <AssignTest/>
      <div>
        < ViewingUserInf name={'Ivanov Ivan'} gmail={'E-mail: yaroslavsmirnov@gmail.com'} img={'a'}/>
      </div>
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
        <Button color='primary' variant='contained' component={Link} to='/'>Go Home</Button>
      </div>
    </div>
  );
};

export default Page404;
