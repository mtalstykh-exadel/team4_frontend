import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Backdrop, Button } from '@material-ui/core';

import '@globalStyles/modal.scss';
import './HRmodalTestDeassigned.scss';

import { Trans } from '@lingui/macro';


export const HRmodalWindowTestDeassigned = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color hr-modal-deassign'>
        <div className='text font-primary'>
          <Trans>Test was deassigned</Trans>
        </div>
        <div className='btn'>
          <Button variant='outlined' color='primary' onClick={props.handleClose} className='button-standard'><Trans>Close</Trans></Button>
        </div>
      </div>
    </Modal>);
};

HRmodalWindowTestDeassigned.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
