import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import './ModalWindowWarningArchive.scss';

export const ModalWindowWarningArchive = ({handleClose}) => {

  return (
    <Paper elevation={2}>
      <div className='modal-warning-archive'>
        <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
          <CloseIcon className='close-icon'/>
        </IconButton>
        <div className='text'>Are you sure you want to archive this?</div>
        <div className='btn'>
          <Button variant='outlined' color='primary' onClick={handleClose}>Yes,do</Button>
          <Button variant='contained' color='primary' onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </Paper>);
};

ModalWindowWarningArchive.propTypes =
  {
    handleClose: PropTypes.func
  };
