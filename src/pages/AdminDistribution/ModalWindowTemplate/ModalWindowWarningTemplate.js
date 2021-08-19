import React from 'react';
import '../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, IconButton, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import './ModalWindowWarningTemplate.scss';

export const ModalWindowWarningTemplate = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color user-modal'>
        <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
          <CloseIcon className='close-icon icons-color'/>
        </IconButton>
        <div className='banning-text'><Trans>{props.text}</Trans></div>
      </div>
    </Modal>
  );
};

ModalWindowWarningTemplate.propTypes =
  {
    open: PropTypes.bool,
    text: PropTypes.string,
    handleClose: PropTypes.func
  };
