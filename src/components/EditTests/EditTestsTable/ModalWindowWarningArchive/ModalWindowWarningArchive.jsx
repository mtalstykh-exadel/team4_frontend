import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../../styles/modal.scss';
import './ModalWindowWarningArchive.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowWarningArchive = ({handleClose}) => {

  return (
    <Paper elevation={2}>
      <div className='modal-warning-archive'>
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
