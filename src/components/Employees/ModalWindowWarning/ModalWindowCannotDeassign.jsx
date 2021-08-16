import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../styles/modal.scss';
import './ModalWindowCannotAssign.scss';

export const ModalWindowWarningCannotDeassign = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <Paper elevation={2}>
        <div className='modal-content'>
          <div className='modal-remove-post'>
            <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
              <CloseIcon className='close-icon' />
            </IconButton>
            <div className='text'>The test has already been deassigned</div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={props.handleClose}>Close</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

ModalWindowWarningCannotDeassign.propTypes =
  {
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };
