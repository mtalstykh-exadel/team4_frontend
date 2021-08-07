import React from 'react';
import '../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, Modal} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './CoachTestVerification.scss';
export const CoachTestVerification = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content'>
        <div className='coach-modal'>
          <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
            <CloseIcon className='close-icon'/>
          </IconButton>
          <div className='test-ver'>This test is currently in the verification status</div>
          <Button variant='outlined' color='primary' onClick={handleClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

CoachTestVerification.propTypes =
  {
    status: PropTypes.bool,
  };
