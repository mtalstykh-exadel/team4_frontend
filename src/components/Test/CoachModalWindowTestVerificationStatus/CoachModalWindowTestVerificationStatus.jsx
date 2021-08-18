import React from 'react';
import '../../../styles/modal.scss';
import { Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './CoachModalWindowTestVerificationStatus.scss';

export const CoachModalWindowTestVerificationStatus = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color coach-modal'>
        <div className='test-ver'>This test is currently in the verification status</div>
        <Button className='button-medium close-button' variant='outlined' color='primary' onClick={props.handleClose}>Close</Button>
      </div>
    </Modal>
  );
};

CoachModalWindowTestVerificationStatus.propTypes =
  {
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };
