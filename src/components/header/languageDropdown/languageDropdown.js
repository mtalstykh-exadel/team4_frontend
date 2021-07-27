import { React } from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';

const LanguageMenu = (props) => {

  return (
    <Menu
      elevation={1}
      anchorEl={props.langEl}
      open={Boolean(props.langEl)}
      onClose={props.handleLangClose}
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
        onClick={ () => {props.handleLangClose();}}>
        English
      </MenuItem>
      <MenuItem
        onClick={ () => {props.handleLangClose();}}>
        Russian
      </MenuItem>
    </Menu>);
};

LanguageMenu.propTypes = {
  langEl: PropTypes.any,
  handleLangClose: PropTypes.func,
};

export default LanguageMenu;
