import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from "@lingui/macro";

import { switchLang } from '../../../utils/lang-service';
import UserNavigation from '../userNavigation/userNavigation';
import ThemeSwitch from '../themeSwitch/themeSwitch';

import avatar from '../../../assets/images/goose.svg';

const DrawerMenu = (props) => {
  const role = useSelector((state) => state.jwt.role);

  return (
    <div className='drawer'>
      <div className='drawerIcons'>
        <Button
          onClick={props.handleDrawer}>
          <CloseIcon className='icons-color'/>
        </Button>
        <IconButton
          edge='end'
          color='inherit'
          aria-haspopup='true'
          component={Link}
          to={'/profile'}>
          <Avatar
            className='avatarDrawer icons-color'
            src={avatar}/>
        </IconButton>
      </div>
      <Divider/>
      {role !== 'ROLE_USER' &&
      <div className='drawerSplit'>
        <UserNavigation
          roleBtns=''/>
      </div>}
      {role !== 'ROLE_USER' && <Divider/>}
      <div className='drawerSplit'>
        <Button
          className = 'font-primary'
          onClick={ () => switchLang('en')}>
          <Trans>English</Trans>
        </Button>
        <Button
          className = 'font-primary'
          onClick={ () => switchLang('ru')}>
          <Trans>Russian</Trans>
        </Button>
      </div>
      <Divider/>
      <div className='drawerSplit'>
        <Button
          className='font-primary'
          component={Link}
          to={'/profile'}>
          <Trans>Profile</Trans>
        </Button>
        <Button
          className='font-primary'
          onClick={props.handleLogoutModal}>
          <Trans>Logout</Trans>
        </Button>
      </div>
      <Divider/>
      <div className='drawerSplit font-primary'>
        <Trans>Dark mode</Trans>
        <ThemeSwitch/>
      </div>
    </div>);
};

DrawerMenu.propTypes = {
  handleLogoutModal: PropTypes.func,
  handleDrawer: PropTypes.func
};

export default DrawerMenu;
