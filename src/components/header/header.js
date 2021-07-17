import { React, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppBar,Toolbar , Button, IconButton, Avatar, Badge, useMediaQuery, Drawer} from '@material-ui/core';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './headerStyles';
import logo from '../../assets/images/logo/logoText.svg';
import avatar from '../../assets/images/logo/logoText.svg';
import AccountMenu from './accountMenu';
import LogoutModal from './logoutModal';
import DrawerMenu from './drawerMenu';
import LanguageMenu from './languageMenu';
import Notifications from './notifications';

const Header = () => {
  const matches = useMediaQuery('(min-width:1024px)');
  const location = useLocation();
  const classes = useStyles();

  const role = useSelector((state) => state.role);
  const shorthand = useSelector((state) => state.language.short);
  const [states, setState] = useState({
    accEl: null,
    langEl: null,
    logoutEl: false,
    notifEl: null,
    notifEmpty: false,
    draEl: false
  });
  const handleCircle = (value) => setState({
    notifEmpty: value
  });
  const handleDrawer = (value) => setState({
    draEl: value
  });

  const handleAccMenu = (event) => setState({
    accEl: event.currentTarget
  });
  const handleAccClose = () => setState({
    accEl: null
  });

  const handleLangMenu = (event) => setState({
    langEl: event.currentTarget
  });

  const handleLangClose = () => setState({
    langEl: null
  });

  const handleLogoutModal = (value) => setState({
    logoutEl: value
  });
  const handleNotifOpen = (event) => setState({
    notifEl: event.currentTarget
  });

  const handleNotifClose = () => setState({
    notifEl: null
  });
  const linkBtn = (path, name) => (
    <Button
      disableElevation
      className={`${location.pathname === path ? classes.bold : null} ${classes.roleBtns}`}
      component={Link}
      to={path}>
      {name}
    </Button>
  );
  return (
    <AppBar
      elevation={1}
      position="static"
      color="inherit">
      <Toolbar className={classes.toolbar}>
        <div className={classes.sideLeft}>
          {!matches && <>
            <IconButton
              edge="start"
              color="inherit"
              aria-haspopup="true"
              onClick={() => handleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer anchor={'left'}
              open={states.draEl}
              onClose={() => handleDrawer(false)}>
              {<DrawerMenu
                handleLogoutModal={handleLogoutModal}
                handleDrawer={() => handleDrawer(false)}/>}
            </Drawer>
          </>}
          { matches && <img src={logo} alt="logo" className={classes.logoText}/> }
          { role === 'hr' && matches && <>{linkBtn('/employees','Employees')}</>}
          { role === 'admin' && matches && <>{linkBtn('/employees','Employees')}{linkBtn('/tests','Tests')}</>}
          { role === 'coach' && matches && <>{linkBtn('/tests','Tests')}{linkBtn('/edittests','Edit tests')}</>}
        </div>
        { !matches && <img src={logo} alt="logo" className={classes.logo}/> }
        <div className={classes.sideRight}>
          <IconButton
            className={classes.notifBtn}
            edge="start"
            color="inherit"
            aria-haspopup="true"
            onClick={handleNotifOpen}>
            <Badge overlap="circular" variant="dot" color="primary">
              <NotificationsNoneIcon/>
            </Badge>
          </IconButton>
          { matches &&
          <div className={classes.sideBtns}>
            <IconButton
              edge="end"
              color="inherit"
              aria-haspopup="true"
              onClick={handleAccMenu}>
              <Avatar className={classes.avatar} src={avatar}/>
              <ArrowDropDownIcon className={classes.triangle}/>
            </IconButton>
            <Button
              className={classes.bold}
              onClick={handleLangMenu}>
              {shorthand}
              <ArrowDropDownIcon
                className={classes.triangle}/>
            </Button>
          </div>}
        </div>
      </Toolbar>
      {<AccountMenu
        accEl={states.accEl}
        handleAccClose={handleAccClose}
        handleLogoutMenu={() => {handleLogoutModal(true);}}/>}
      {<LogoutModal
        logoutEl={states.logoutEl}
        handleAccClose={handleAccClose}
        handleLogoutClose={() => {handleLogoutModal(false);}}
        handleLangClose={handleLangClose}/>}
      {<LanguageMenu
        langEl={states.langEl}
        handleLangClose={handleLangClose}/>}
      {<Notifications
        notifEl={states.notifEl}
        handleNotifClose={handleNotifClose}
        handleCircle={(value) => handleCircle(value)}/>}
    </AppBar>
  );
};

export default Header;
