import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import './UserModalWindowBanningOfPassingTest.scss';

export const UserModalWindowBanningTest = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color user-modal'>
        <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
          <CloseIcon className='close-icon icons-color'/>
        </IconButton>
        <div className='banning-text'><Trans>You can't take the test anymore today.</Trans></div>
      </div>
    </Modal>
  );
};

UserModalWindowBanningTest.propTypes =
  {
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };
  
