import React from 'react';
import '../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './ModalWindowWarningPassingTest.scss';

export const ModalWindowWarningPassingTest = () => {
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
          <div className='modal-warning-passing-test'>
            <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
              <CloseIcon className='close-icon' />
            </IconButton>
            <div className='warning-text'>This functionality will be available to you only after passing the test</div>
            <div className='btn'>
              <Button variant='outlined' color='primary' onClick={handleClose}>Close</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
