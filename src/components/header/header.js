import { React, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppBar,Toolbar , Button, IconButton, Avatar, Badge, useMediaQuery, Drawer} from '@material-ui/core';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';

import './headerStyles.scss';

import logo from '../../assets/images/logo/logo.svg';
import logoText from '../../assets/images/logo/logoText.svg';
import avatar from '../../assets/images/logo/logoText.svg';

import AccountMenu from './accountMenu';
import LogoutModal from './logoutModal';
import DrawerMenu from './drawerMenu';
import LanguageMenu from './languageMenu';
import Notifications from './notificationsMenu';

const Header = () => {
  const matches = useMediaQuery('(min-width:1024px)');
  const location = useLocation();

  const role = useSelector((state) => state.role);
  const shorthand = useSelector((state) => state.language).substring(0,2);
  const [states, setState] = useState({
    accumulatorEl: null,
    languageEl: null,
    logoutEl: false,
    notificationsEl: null,
    notificationsEmpty: false,
    drawerEl: false
  });
  const handleCircle = (value) => setState({
    notificationsEmpty: value
  });
  const handleDrawer = (value) => setState({
    drawerEl: value
  });

  const handleAccountMenu = (event) => setState({
    accumulatorEl: event.currentTarget
  });
  const handleAccountClose = () => setState({
    accumulatorEl: null
  });

  const handleLanguageMenu = (event) => setState({
    languageEl: event.currentTarget
  });

  const handleLanguageClose = () => setState({
    languageEl: null
  });

  const handleLogoutModal = (value) => setState({
    logoutEl: value
  });
  const handleNotificationsOpen = (event) => setState({
    notificationsEl: event.currentTarget
  });

  const handleNotificationsClose = () => setState({
    notificationsEl: null
  });
  const linkBtn = (path, name) => (
    <Button
      disableElevation
      className={`${location.pathname === path ? 'bold' : null} 'roleBtns'`}
      component={Link}
      to={path}>
      {name}
    </Button>
  );

  return (
    <AppBar
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
                handleLogoutModal={handleLogoutModal}
                handleDrawer={() => handleDrawer(false)}/>}
            </Drawer>
          </>}
          { matches && <img src={logoText} alt='logo' className='logoText'/> }
          { role === 'hr' && matches && <>{linkBtn('/employees','Employees')}</>}
          { role === 'admin' && matches && <>{linkBtn('/employees','Employees')}{linkBtn('/tests','Tests')}</>}
          { role === 'coach' && matches && <>{linkBtn('/tests','Tests')}{linkBtn('/edittests','Edit tests')}</>}
        </div>
        { !matches && <img src={logo} alt="logo" className={'logo'}/> }
        <div className='toolbar-sideRight'>
          <IconButton
            edge='start'
            aria-haspopup='true'
            onClick={handleNotificationsOpen}>
            <Badge
              classes={{ badge: 'notifications-color' }}
              color='primary'
              overlap='circular'
              variant='dot'>
              <NotificationsNoneIcon className='icons-color'/>
            </Badge>
          </IconButton>
          { matches &&
          <>
            <IconButton
              edge='end'
              color='inherit'
              aria-haspopup='true'
              onClick={handleAccountMenu}>
              <Avatar
                className='avatar icons-color'
                src={avatar}
                alt='avatar'/>
              <ArrowDropDownIcon
                className='icons-triangle icons-color'/>
            </IconButton>
            <Button
              className='bold'
              onClick={handleLanguageMenu}>
              {shorthand}
              <ArrowDropDownIcon
                className='icons-triangle icons-color'/>
            </Button>
          </>}
        </div>
        {<AccountMenu
          accEl={states.accumulatorEl}
          handleAccClose={handleAccountClose}
          handleLogoutMenu={() => {handleLogoutModal(true);}}/>}
        {<LogoutModal
          logoutEl={states.logoutEl}
          handleAccClose={handleAccountClose}
          handleLogoutClose={() => {handleLogoutModal(false);}}
          handleLangClose={handleLanguageClose}/>}
        {<LanguageMenu
          langEl={states.languageEl}
          handleLangClose={handleLanguageClose}/>}
        {<Notifications
          notifEl={states.notificationsEl}
          handleNotifClose={handleNotificationsClose}
          handleCircle={(value) => handleCircle(value)}/>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
