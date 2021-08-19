import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Modal, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../styles/buttons.scss';
import './ModalWindowCannotAssign.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowWarningCannotAssign = (props) => {

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
            <div className='text-modal'><Trans>The test has already been assigned to this employee</Trans></div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={props.handleClose} className='button-standard'><Trans>Close</Trans></Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

ModalWindowWarningCannotAssign.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
