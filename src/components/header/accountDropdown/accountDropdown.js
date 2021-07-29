import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu, MenuItem } from '@material-ui/core';

import ThemeSwitch from '../themeSwitch/themeSwitch';

import { Trans } from "@lingui/macro";

const AccountMenu = (props) => {

  return (
    <Menu
      elevation={2}
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
        <Trans>Profile</Trans>
      </MenuItem>
      <MenuItem className='font-primary'>
        <Trans>Dark mode</Trans>
        <ThemeSwitch/>
      </MenuItem>
      <MenuItem
        className='font-primary'
        onClick={props.handleLogoutMenu}>
        <Trans>Logout</Trans>
      </MenuItem>
    </Menu>);
};

AccountMenu.propTypes = {
  accEl: PropTypes.any,
  handleAccClose: PropTypes.func,
  handleLogoutMenu: PropTypes.func
};

export default AccountMenu;
