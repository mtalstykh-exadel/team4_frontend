import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './ModalWindowSuccessulUpdate.scss';

export const ModalWindowSuccessulUpdate = ({ handleClose }) => {

  return (
    <div className='modal-remove-post'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon' />
      </IconButton>
      <div className='text'>The data was saved successfully</div>
      <div className='btn'>
        <Button variant='outlined' color='primary' onClick={handleClose} className='button-standard' >Close</Button>
      </div>
    </div>
  );
};

ModalWindowSuccessulUpdate.propTypes = {
  handleClose: PropTypes.func,
};
