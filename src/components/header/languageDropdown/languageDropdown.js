import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';

import { languageChange } from '../../../store/actions/headerActions';

const LanguageMenu = (props) => {
  const dispatch = useDispatch();
  const darktheme = useSelector((state) => state.darktheme);

  return (
    <Menu
      className={`${darktheme ? 'theme-dark' : 'theme-light'}`}
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
        className='font-primary'
        onClick={ () => {props.handleLangClose(); dispatch(languageChange('english'));}}>
        English
      </MenuItem>
      <MenuItem
        className='font-primary'
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
