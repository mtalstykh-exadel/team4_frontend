import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu, MenuItem } from '@material-ui/core';

const AccountMenu = (props) => {
  return (
    <Menu
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
        component={Link}
        to={'/profile'}
        onClick={props.handleAccClose}>
          My account
      </MenuItem>
      <MenuItem
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
