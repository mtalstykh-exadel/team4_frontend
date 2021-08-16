import React from 'react';
import '../../../../styles/modal.scss';
import PropTypes from 'prop-types';
import {Trans} from '@lingui/macro';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';
import {
  Modal,
  Backdrop,
} from '@material-ui/core';


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
        <div className='hr-modal-view-user-info'>
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
            <CloseIcon className='close-icon icons-color'/>
          </IconButton>
          <div className='question'><Trans>Are you sure you want to be removed from your position?</Trans></div>
        </div>
      </div>
    </Modal>);
};

AdminModalWindowWarningDeassign.propTypes =
  {
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };
