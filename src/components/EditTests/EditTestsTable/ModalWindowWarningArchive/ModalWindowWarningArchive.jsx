import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../../styles/modal.scss';
import './ModalWindowWarningArchive.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowWarningArchive = ({handleClose}) => {

  return (
    <Paper elevation={2}>
      <div className='modal-warning-archive'>
        <IconButton aria-label='close' onClick={() => handleClose(false)} className='close-icon-wrapper'>
          <CloseIcon className='close-icon'/>
        </IconButton>
        <div className='text'><Trans>Are you sure you want to archive this?</Trans></div>
        <div className='btn'>
          <Button variant='outlined' color='primary' onClick={() => handleClose(true)}><Trans>Yes,do</Trans></Button>
          <Button variant='contained' color='primary' onClick={() => handleClose(false)}><Trans>Cancel</Trans></Button>
        </div>
      </div>
    </Paper>);
};

ModalWindowWarningArchive.propTypes =
  {
    handleClose: PropTypes.func
  };
