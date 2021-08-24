import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Modal, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '@globalStyles/modal.scss';
import './ModalWindowCannotAssign.scss';

import { Trans } from '@lingui/macro';


export const ModalWindowWarningCannotDeassign = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <Paper elevation={2}>
        <div className='modal-content'>
          <div className='modal-remove'>
            <div className='text font-primary'><Trans>The test has already been deassigned</Trans></div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={props.handleClose}><Trans>Close</Trans></Button>
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
