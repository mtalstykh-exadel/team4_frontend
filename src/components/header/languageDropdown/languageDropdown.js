import { React } from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';

import { Trans } from '@lingui/macro';

import { switchLang } from '@utils/lang-service';

import { language_english, language_russian } from '@constants/languageConstants';

const LanguageMenu = (props) => {

  return (
    <Menu
      elevation={2}
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
        onClick={ () => {props.handleLangClose(); switchLang(language_english);}}>
        <Trans>English</Trans>
      </MenuItem>
      <MenuItem
        className='font-primary'
        onClick={ () => {props.handleLangClose(); switchLang(language_russian);}}>
        <Trans>Russian</Trans>
      </MenuItem>
    </Menu>);
};

LanguageMenu.propTypes = {
  langEl: PropTypes.any,
  handleLangClose: PropTypes.func,
};

export default LanguageMenu;
