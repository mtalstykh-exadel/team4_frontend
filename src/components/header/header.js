import { React, useState } from 'react';

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Badge,
  useMediaQuery,
  Drawer,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MenuIcon from '@material-ui/icons/Menu';

import './header.scss';

import logo from '../../assets/images/logo/logo.svg';
import avatar from '../../assets/images/goose.svg';

import AccountMenu from './accountDropdown/accountDropdown';
import LogoutModal from './logoutModal/logoutModal';
import DrawerMenu from './drawerMenu/drawerMenu';
import LanguageMenu from './languageDropdown/languageDropdown';
import Notifications from './notificationsDropdown/notificationsDropdown';
import UserNavigation from './userNavigation/userNavigation';

const Header = () => {
  const matches = useMediaQuery('(min-width:1024px)');
  const [states, setState] = useState({
    accumulatorEl: null,
    languageEl: null,
    logoutEl: false,
    notificationsEl: null,
    notificationsEmpty: false,
    drawerEl: false,
  });

  const handleBadge = (value) =>
    setState({
      notificationsEmpty: value,
    });

  const handleDrawer = (value) =>
    setState({
      drawerEl: value,
    });

  const handleAccount = (event) =>
    setState({
      accumulatorEl: event.currentTarget,
    });

  const handleAccountClose = () =>
    setState({
      accumulatorEl: null,
    });

  const handleLanguage = (event) =>
    setState({
      languageEl: event.currentTarget,
    });

  const handleLanguageClose = () =>
    setState({
      languageEl: null,
    });

  const handleLogout = (value) =>
    setState({
      logoutEl: value,
    });

  const handleNotifications = (event) =>
    setState({
      notificationsEl: event.currentTarget,
    });

  const handleNotificationsClose = () =>
    setState({
      notificationsEl: null,
    });

  return (
    <AppBar color='inherit' elevation={1} position='static'>
      <div className='toolbar-wrapper'>
        <Toolbar className='toolbar'>
          <div className='toolbar-sideLeft'>
            {!matches && (
              <>
                <IconButton
                  edge='start'
                  aria-haspopup='true'
                  onClick={() => handleDrawer(true)}
                >
                  <MenuIcon className='icons-color' />
                </IconButton>
                <Drawer
                  elevation={2}
                  anchor={'left'}
                  open={states.drawerEl}
                  onClose={() => handleDrawer(false)}
                >
                  {
                    <DrawerMenu
                      handleLogoutModal={handleLogout}
                      handleDrawer={() => handleDrawer(false)}
                    />
                  }
                </Drawer>
              </>
            )}
            {matches && (
              <Box className='logo-text-wrapper' component={Link} to={''}>
                <img src={logo} alt='logo' className={'logo'} />
                <div className='logo-text font-primary bold'>
                  Untitled Testing <br />
                  System
                </div>
              </Box>
            )}
            {matches && <UserNavigation roleBtns={'roleBtns'} />}
          </div>
          {!matches && (
            <Box className='logo-wrapper-small' component={Link} to={'/'}>
              <img src={logo} alt='logo' className={'logo'} />
            </Box>
          )}
          <div className='toolbar-sideRight'>
            <Button onClick={handleNotifications}>
              <Badge
                classes={{ badge: 'notifications-color' }}
                overlap='circular'
                variant='dot'
              >
                <NotificationsNoneIcon className='icons-color' />
              </Badge>
            </Button>
            {matches && (
              <>
                <Button onClick={handleAccount}>
                  <Avatar
                    className='avatarHeader border-secondary'
                    src={avatar}
                    alt='avatar'
                  />
                  <ArrowDropDownIcon className='icons-triangle icons-color' />
                </Button>
                <Button className='bold font-primary' onClick={handleLanguage}>
                  {localStorage.getItem('lang')}
                  <ArrowDropDownIcon className='icons-triangle icons-color' />
                </Button>
              </>
            )}
          </div>
          {
            <AccountMenu
              accEl={states.accumulatorEl}
              handleAccClose={handleAccountClose}
              handleLogoutMenu={() => {
                handleLogout(true);
              }}
            />
          }
          {
            <LogoutModal
              logoutEl={states.logoutEl}
              handleAccClose={handleAccountClose}
              handleLogoutClose={() => {
                handleLogout(false);
              }}
              handleLangClose={handleLanguageClose}
            />
          }
          {
            <LanguageMenu
              langEl={states.languageEl}
              handleLangClose={handleLanguageClose}
            />
          }
          {
            <Notifications
              notifEl={states.notificationsEl}
              handleNotifClose={handleNotificationsClose}
              handleCircle={(value) => handleBadge(value)}
            />
          }
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
