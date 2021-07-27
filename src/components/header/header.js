import { React, useState } from 'react';

import { AppBar,Toolbar , Button, IconButton, Avatar, Badge, useMediaQuery, Drawer} from '@material-ui/core';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';

import './header.scss';

import logo from '../../assets/images/logo/logo.svg';
import logoText from '../../assets/images/logo/logoText.svg';
import avatar from '../../assets/images/logo/logoText.svg';

import AccountMenu from './accountDropdown/accountDropdown';
import LogoutModal from './logoutModal/logoutModal';
import DrawerMenu from './drawerMenu/drawerMenu';
import LanguageMenu from './languageDropdown/languageDropdown';
import Notifications from './notificationsDropdown/notificationsDropdown';
import RoleButtons from './roleButtons/roleButtons';

const Header = () => {
  const matches = useMediaQuery('(min-width:1024px)');

  const [states, setState] = useState({
    accumulatorEl: null,
    languageEl: null,
    logoutEl: false,
    notificationsEl: null,
    notificationsEmpty: false,
    drawerEl: false
  });
  const handleBadge = (value) => setState({
    notificationsEmpty: value
  });
  const handleDrawer = (value) => setState({
    drawerEl: value
  });

  const handleAccount = (event) => setState({
    accumulatorEl: event.currentTarget
  });
  const handleAccountClose = () => setState({
    accumulatorEl: null
  });

  const handleLanguage = (event) => setState({
    languageEl: event.currentTarget
  });

  const handleLanguageClose = () => setState({
    languageEl: null
  });

  const handleLogout = (value) => setState({
    logoutEl: value
  });
  const handleNotifications = (event) => setState({
    notificationsEl: event.currentTarget
  });

  const handleNotificationsClose = () => setState({
    notificationsEl: null
  });

  return (
    <AppBar
      color='inherit'
      className='base-color'
      elevation={1}
      position='static'>
      <Toolbar className='toolbar'>
        <div className='toolbar-sideLeft'>
          {!matches && <>
            <IconButton
              edge='start'
              aria-haspopup='true'
              onClick={() => handleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer anchor={'left'}
              open={states.drawerEl}
              onClose={() => handleDrawer(false)}>
              {<DrawerMenu
                handleLogoutModal={handleLogout}
                handleDrawer={() => handleDrawer(false)}/>}
            </Drawer>
          </>}
          { matches && <img src={logoText} alt='logo' className='logoText'/> }
          { matches &&
            <RoleButtons
              roleBtns={'roleBtns'}/>}
        </div>
        { !matches && <img src={logo} alt="logo" className={'logo'}/> }
        <div className='toolbar-sideRight'>
          <IconButton
            edge='start'
            aria-haspopup='true'
            color='inherit'
            onClick={handleNotifications}>
            <Badge
              color='primary'
              overlap='circular'
              variant='dot'>
              <NotificationsNoneIcon/>
            </Badge>
          </IconButton>
          { matches &&
          <>
            <IconButton
              edge='end'
              color='inherit'
              aria-haspopup='true'
              onClick={handleAccount}>
              <Avatar
                className='avatarHeader'
                src={avatar}
                alt='avatar'/>
              <ArrowDropDownIcon
                className='icons-triangle'/>
            </IconButton>
            <Button
              className='bold'
              onClick={handleLanguage}>
              {localStorage.getItem('lang')}
              <ArrowDropDownIcon
                className='icons-triangle'/>
            </Button>
          </>}
        </div>
        {<AccountMenu
          accEl={states.accumulatorEl}
          handleAccClose={handleAccountClose}
          handleLogoutMenu={() => {handleLogout(true);}}/>}
        {<LogoutModal
          logoutEl={states.logoutEl}
          handleAccClose={handleAccountClose}
          handleLogoutClose={() => {handleLogout(false);}}
          handleLangClose={handleLanguageClose}/>}
        {<LanguageMenu
          langEl={states.languageEl}
          handleLangClose={handleLanguageClose}/>}
        {<Notifications
          notifEl={states.notificationsEl}
          handleNotifClose={handleNotificationsClose}
          handleCircle={(value) => handleBadge(value)}/>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
