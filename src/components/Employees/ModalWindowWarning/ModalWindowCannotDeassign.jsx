import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Modal } from '@material-ui/core';
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
