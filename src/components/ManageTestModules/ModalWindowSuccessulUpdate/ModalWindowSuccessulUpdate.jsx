import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './ModalWindowSuccessulUpdate.scss';

export const ModalWindowSuccessulUpdate = ({ handleClose }) => {

  return (
    <div className='modal-remove'>
      <div className='text'>The data was saved successfully</div>
      <div className='btn'>
        <Button variant='outlined' color='primary' onClick={handleClose} className='button-standard'>Close</Button>
      </div>
    </div>
  );
};

ModalWindowSuccessulUpdate.propTypes = {
  handleClose: PropTypes.func,
};
