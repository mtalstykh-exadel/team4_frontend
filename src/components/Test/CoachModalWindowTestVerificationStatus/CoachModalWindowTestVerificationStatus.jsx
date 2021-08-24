import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '@globalStyles/modal.scss';
import './CoachModalWindowTestVerificationStatus.scss';

import { Trans } from '@lingui/macro';

export const CoachModalWindowTestVerificationStatus = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color coach-modal'>
        <div className='test-ver font-primary'><Trans>This test is currently in the verification status</Trans></div>
        <Button className='button-medium close-button' variant='outlined' color='primary' onClick={props.handleClose}><Trans>Close</Trans></Button>
      </div>
    </Modal>
  );
};

CoachModalWindowTestVerificationStatus.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
