import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from "@lingui/macro";

import RoleButtons from '../roleButtons/roleButtons';

// import image as an avatar for profile icon
import avatar from '../../../assets/images/logo/logoText.svg';

const DrawerMenu = (props) => {
  const role = useSelector((state) => state.jwt.role);

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
      {role !== 'ROLE_USER' &&
      <div className='drawerSplit'>
        <RoleButtons
          roleBtns=''/>
      </div>}
      {role !== 'ROLE_USER' && <Divider/>}
      <div className='drawerSplit'>
        <Button>
          <Trans>English</Trans>
        </Button>
        <Button>
          <Trans>Russian</Trans>
        </Button>
      </div>
      <Divider/>
      <div className='drawerSplit'>
        <Button
          component={Link}
          to={'/profile'}>
          <Trans>Profile</Trans>
        </Button>
        <Button
          onClick={props.handleLogoutModal}>
          <Trans>Logout</Trans>
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
