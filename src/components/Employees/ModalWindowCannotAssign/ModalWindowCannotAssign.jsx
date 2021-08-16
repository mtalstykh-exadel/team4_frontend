import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../../../styles/buttons.scss';
import './ModalWindowCannotAssign.scss';

export const ModalWindowWarningCannotAssign = () => {

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
      <Paper elevation={2}>
        <div className='modal-content'>
          <div className='modal-remove-post'>
            <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
              <CloseIcon className='close-icon' />
            </IconButton>
            <div className='text'>The test has already been assigned to this employee</div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={handleClose} className='button-standard'>Close</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
