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

  const handleAccMenu = (event) => setState({
    accumulatorEl: event.currentTarget
  });
  const handleAccClose = () => setState({
    accumulatorEl: null
  });

  const handleLangMenu = (event) => setState({
    languageEl: event.currentTarget
  });

  const handleLangClose = () => setState({
    languageEl: null
  });

  const handleLogoutModal = (value) => setState({
    logoutEl: value
  });
  const handleNotifOpen = (event) => setState({
    notificationsEl: event.currentTarget
  });

  const handleNotifClose = () => setState({
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
      elevation={1}
      position='static'
      color='inherit'>
      <Toolbar className='toolbar'>
        <div className='sideLeft'>
          {!matches && <>
            <IconButton
              edge='start'
              color='inherit'
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
        <div className='sideRight'>
          <IconButton
            edge='start'
            color='inherit'
            aria-haspopup='true'
            onClick={handleNotifOpen}>
            <Badge overlap='circular' variant='dot' color='primary'>
              <NotificationsNoneIcon/>
            </Badge>
          </IconButton>
          { matches &&
          <>
            <IconButton
              edge='end'
              color='inherit'
              aria-haspopup='true'
              onClick={handleAccMenu}>
              <Avatar
                className='avatar'
                src={avatar}/>
              <ArrowDropDownIcon
                className='triangle'/>
            </IconButton>
            <Button
              className='bold'
              onClick={handleLangMenu}>
              {shorthand}
              <ArrowDropDownIcon
                className='triangle'/>
            </Button>
          </>}
        </div>
        {<AccountMenu
          accEl={states.accumulatorEl}
          handleAccClose={handleAccClose}
          handleLogoutMenu={() => {handleLogoutModal(true);}}/>}
        {<LogoutModal
          logoutEl={states.logoutEl}
          handleAccClose={handleAccClose}
          handleLogoutClose={() => {handleLogoutModal(false);}}
          handleLangClose={handleLangClose}/>}
        {<LanguageMenu
          langEl={states.languageEl}
          handleLangClose={handleLangClose}/>}
        {<Notifications
          notifEl={states.notificationsEl}
          handleNotifClose={handleNotifClose}
          handleCircle={(value) => handleCircle(value)}/>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
