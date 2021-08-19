import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Modal, Backdrop } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import '../../../../styles/modal.scss';

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
      <div className='modal-content base-color'>
        <div className='hr-modal'>
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper' onSubmit={() => { props.handleClose(); }}>
            <CloseIcon className='close-icon icons-color' />
          </IconButton><Trans>Test was deassigned</Trans></div>
      </div>
    </Modal>);
};

HRmodalWindowTestDeassigned.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
