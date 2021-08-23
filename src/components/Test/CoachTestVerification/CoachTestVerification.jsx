import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Modal, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../styles/modal.scss';
import './CoachTestVerification.scss';

import { Trans } from '@lingui/macro';

export const CoachTestVerification = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={2}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <div className='modal-content'>
          <div className='coach-modal'>
            <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
              <CloseIcon className='close-icon'/>
            </IconButton>
            <div className='test-ver font-primary'><Trans>This test is currently in the verification status</Trans></div>
            <Button variant='outlined' color='primary' onClick={handleClose}><Trans>Close</Trans></Button>
          </div>
        </div>
      </Modal>
    </Paper>
  );
};

CoachTestVerification.propTypes =
{
  status: PropTypes.bool,
};
