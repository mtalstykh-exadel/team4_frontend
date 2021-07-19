import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Divider, Button, Avatar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { languageChange } from '../../store/actions/headerActions';
import { makeStyles } from '@material-ui/core/styles';

// import image as an avatar for profile icon
import avatar from '../../assets/images/logo/logoText.svg';

const DrawerMenu = (props) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const useStyles = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    triangle: {
      fontSize: 15
    }
  }));
  const classes = useStyles();
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
    <div className='list'>
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
          <Avatar className={classes.avatar} src={avatar}/>
        </IconButton>
      </div>
      <Divider/>
      {role !== 'default' &&
      <div className='drawer'>
        {role === 'hr' && <>{linkBtn('/employees','Employees')}</>}
        {role === 'admin' && <>{linkBtn('/employees','Employees')}{linkBtn('/tests','Tests')}</>}
        {role === 'coach' && <>{linkBtn('/tests','Tests')}{linkBtn('/edittests','Edit tests')}</>}
      </div>}
      <Divider/>
      <div className='drawer'>
        <Button onClick={ () => {dispatch(languageChange('english'));}}>English</Button>
        <Button onClick={ () => {dispatch(languageChange('russian'));}}>Russian</Button>
      </div>
      <Divider/>
      <div className='drawer'>
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
