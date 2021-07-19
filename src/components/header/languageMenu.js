import { React } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';

import { languageChange } from '../../store/actions/headerActions';

const LanguageMenu = (props) => {
  const dispatch = useDispatch();

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
        onClick={ () => {props.handleLangClose(); dispatch(languageChange('english'));}}>
        English
      </MenuItem>
      <MenuItem
        onClick={ () => {props.handleLangClose(); dispatch(languageChange('russian'));}}>
        Russian
      </MenuItem>
    </Menu>);
};

LanguageMenu.propTypes = {
  langEl: PropTypes.any,
  handleLangClose: PropTypes.func,
};

export default LanguageMenu;
