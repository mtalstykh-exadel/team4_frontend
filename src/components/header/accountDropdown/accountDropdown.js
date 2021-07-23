import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';

import { Menu, MenuItem, Switch } from '@material-ui/core';
import { themeChange } from '../../../store/actions/headerActions';

const AccountMenu = (props) => {
  const darktheme = useSelector((state) => state.darktheme);
  const dispatch = useDispatch();

  return (
    <Menu
      className={`${darktheme ? 'theme-dark' : 'theme-light'} base-color`}
      elevation={1}
      anchorEl={props.accEl}
      open={Boolean(props.accEl)}
      keepMounted
      onClose={props.handleAccClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <MenuItem
        className='font-primary'
        component={Link}
        to={'/profile'}
        onClick={props.handleAccClose}>
          Profile
      </MenuItem>
      <MenuItem className='font-primary'>
          Dark mode
        <Switch
          size='small'
          checked={Boolean(darktheme)}
          onChange={() => {dispatch(themeChange(!darktheme));}}/>
      </MenuItem>
      <MenuItem
        className='font-primary'
        onClick={props.handleLogoutMenu}>
          Logout
      </MenuItem>
    </Menu>);
};

AccountMenu.propTypes = {
  accEl: PropTypes.any,
  handleAccClose: PropTypes.func,
  handleLogoutMenu: PropTypes.func
};

export default AccountMenu;
