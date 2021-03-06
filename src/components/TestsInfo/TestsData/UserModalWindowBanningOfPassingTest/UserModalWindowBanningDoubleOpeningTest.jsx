import React from 'react';

import { Backdrop, Button, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

import '@globalStyles/modal.scss';
import './UserModalWindowBanningOfPassingTest.scss';

import { Trans } from '@lingui/macro';

export const UserModalWindowBanningDoubleOpeningTest = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color user-modal'>
        <div className='banning-text'><Trans>You can't take two tests at the same time!</Trans></div>
        <div className='btn-modal-banning'>
          <Button variant='outlined' color='primary' onClick={props.handleClose} className='button-standard'><Trans>Close</Trans></Button>
        </div>
      </div>
    </Modal>
  );
};

UserModalWindowBanningDoubleOpeningTest.propTypes =
{
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
