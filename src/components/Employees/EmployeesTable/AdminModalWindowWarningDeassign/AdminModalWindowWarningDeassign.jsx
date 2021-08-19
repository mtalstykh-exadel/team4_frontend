import React from 'react';
import '../../../../styles/modal.scss';
import PropTypes from 'prop-types';
import {Trans} from '@lingui/macro';
import {
  Modal,
  Backdrop,
  Button,
} from '@material-ui/core';
import './AdminModalWindowWarningDeassign.scss';

export const AdminModalWindowWarningDeassign = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color'>
        <div className='admin-modal-w-warning'>
          <div className='warning-question'><Trans>Do you want to deassign?</Trans></div>
          <div className='choice-buttons'>
            <Button variant='outlined' color='primary'><Trans>Yes</Trans></Button>
            <Button variant='contained' color='primary'><Trans>No</Trans></Button>
          </div>
        </div>
      </div>
    </Modal>);
};

AdminModalWindowWarningDeassign.propTypes =
  {
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };
