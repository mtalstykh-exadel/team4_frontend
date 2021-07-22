import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// import image as an avatar for profile icon
import avatar from '../../../assets/images/logo/logoText.svg';

const DrawerMenu = (props) => {
  const role = useSelector((state) => state.login.data.role);

  const linkBtn = (path, name) => (
    <Button
      className={location.pathname === path ? 'bold' : null}
      disableElevation
      component={Link}
      to={path}>
      {name}
    </Button>
  );

  return (
    <div className='drawer'>
      <div className='drawerIcons'>
        <Button
          onClick={props.handleDrawer}>
          <CloseIcon/>
        </Button>
        <IconButton
          edge='end'
          color='inherit'
          aria-haspopup='true'
          component={Link}
          to={'/profile'}>
          <Avatar
            className='avatarHeader'
            src={avatar}/>
        </IconButton>
      </div>
      <Divider/>
      {role !== 'default' &&
      <div className='drawerSplit'>
        {role === 'hr' && <>{linkBtn('/employees','Employees')}</>}
        {role === 'admin' && <>{linkBtn('/employees','Employees')}{linkBtn('/tests','Tests')}</>}
        {role === 'coach' && <>{linkBtn('/tests','Tests')}{linkBtn('/edittests','Edit tests')}</>}
      </div>}
      <Divider/>
      <div className='drawerSplit'>
        <Button>English</Button>
        <Button>Russian</Button>
      </div>
      <Divider/>
      <div className='drawerSplit'>
        <Button
          component={Link}
          to={'/profile'}>
          My account
        </Button>
        <Button
          onClick={props.handleLogoutModal}>
        Logout
        </Button>
      </div>
      <Divider/>
    </div>);
};

DrawerMenu.propTypes = {
  handleLogoutModal: PropTypes.func,
  handleDrawer: PropTypes.func
};

export default DrawerMenu;
