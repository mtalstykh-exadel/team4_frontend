import React from 'react';
import '@globalStyles/modal.scss';
import { Backdrop, Button, Modal } from '@material-ui/core';
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
        <div className='banning-text'><Trans>{props.text[0]}{props.text[1]}</Trans></div>
        <div className='btn-warning-temlate'>
          <Button variant='outlined' color='primary' onClick={props.handleClose} className='button-standard'><Trans>Close</Trans></Button>
        </div>
      </div>
    </Modal>
  );
};

ModalWindowWarningTemplate.propTypes =
{
  open: PropTypes.bool,
  text: PropTypes.array,
  handleClose: PropTypes.func
};
