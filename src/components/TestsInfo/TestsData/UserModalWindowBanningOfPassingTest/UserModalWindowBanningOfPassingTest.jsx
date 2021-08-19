import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, IconButton, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

import '../../../../styles/modal.scss';
import './UserModalWindowBanningOfPassingTest.scss';

import { Trans } from '@lingui/macro';

export const UserModalWindowBanningTest = (props) => {

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
          <CloseIcon className='close-icon icons-color' />
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
