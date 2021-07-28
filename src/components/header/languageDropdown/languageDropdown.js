import { React } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';

import { Trans } from "@lingui/macro";

import { switchLang } from '../../../utils/lang-service';

const LanguageMenu = (props) => {
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
        onClick={ () => {props.handleLangClose(); switchLang('en');}}>
        <Trans>English</Trans>
      </MenuItem>
      <MenuItem
        className='font-primary'
        onClick={ () => {props.handleLangClose(); switchLang('ru');}}>
        <Trans>Russian</Trans>
      </MenuItem>
    </Menu>);
};

LanguageMenu.propTypes = {
  langEl: PropTypes.any,
  handleLangClose: PropTypes.func,
};

export default LanguageMenu;
