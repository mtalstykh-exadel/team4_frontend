import React from 'react';
import '../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import './ModalWindowRemovedFromYourPost.scss';

export const ModalWindowRemovedFromYourPost = () => {
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
            <div className='text'>You have been deassign from the test</div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={handleClose}>Close</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
