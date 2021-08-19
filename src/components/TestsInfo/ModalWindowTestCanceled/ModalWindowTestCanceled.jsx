import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Backdrop } from '@material-ui/core';

import '../../../styles/modal.scss';
import './ModalWindowTestCanceled.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowTestCanceled = (props) => {

  return (
    <Modal
      open={props.open}
      BackdropComponent={Backdrop}
      onClose={props.handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <Paper elevation={2}>
        <div className='modal-content'>
          <div className='modal-remove'>
            <div className='text'><Trans>The test was canceled</Trans></div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={props.handleClose} className='button-standard'><Trans>Close</Trans></Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

ModalWindowTestCanceled.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
