import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton, Switch } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from "@lingui/macro";

import { switchLang } from '../../../utils/lang-service';
import { themeChange } from '../../../store/actions/themeActions';
import UserNavigation from '../userNavigation/userNavigation';

// import image as an avatar for profile icon
import avatar from '../../../assets/images/logo/logoText.svg';

const DrawerMenu = (props) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.jwt.role);
  const darktheme = useSelector((state) => state.darktheme);

  return (
    <div className={`drawer ${darktheme ? 'theme-dark' : 'theme-light'}`}>
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
            className='avatarHeader icons-color'
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
      <div className='drawerSplit'>
        Dark mode
        <Switch
          size='small'
          checked={Boolean(darktheme)}
          onChange={() => {dispatch(themeChange(!darktheme));}}/>
      </div>
    </div>);
};

DrawerMenu.propTypes = {
  handleLogoutModal: PropTypes.func,
  handleDrawer: PropTypes.func
};

export default DrawerMenu;
