import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './headerStyles';
import { changeToRussian, changeToEnglish } from '../../store/actions/headerActions';

// import image as an avatar for profile icon
import avatar from '../../assets/images/logo/logoText.svg';

const DrawerMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);

  const linkBtn = (path, name) => (
    <Button
      className={location.pathname === path ? classes.bold : null} to={path}
      disableElevation
      color="inherit"
      component={Link}>
      {name}
    </Button>
  );

  return (
    <div className={classes.list}>
      <div className={classes.drawerIcons}>
        <Button
          onClick={props.handleDrawer}>
          <CloseIcon/>
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-haspopup="true"
          component={Link}
          to={'/profile'}>
          <Avatar src={avatar}/>
        </IconButton>
      </div>
      <Divider/>
      {role !== 'default' &&
      <div className={classes.drawer}>
        {role === 'hr' && <>{linkBtn('/employees','Employees')}</>}
        {role === 'admin' && <>{linkBtn('/employees','Employees')}{linkBtn('/tests','Tests')}</>}
        {role === 'coach' && <>{linkBtn('/tests','Tests')}{linkBtn('/edittests','Edit tests')}</>}
      </div>}
      <Divider/>
      <div className={classes.drawer}>
        <Button onClick={ () => {dispatch(changeToEnglish());}}>English</Button>
        <Button onClick={ () => {dispatch(changeToRussian());}}>Russian</Button>
      </div>
      <Divider/>
      <div className={classes.drawer}>
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
