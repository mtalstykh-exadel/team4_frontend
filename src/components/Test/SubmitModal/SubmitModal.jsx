import React from 'react';
import '../../../styles/modal.scss';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import './SubmitModal.scss';

export const SubmitModal = ({handleClose}) => {
  return (
    <div className='submit-modal'>
      <div className='submit-text'>Are you sure you want to finish the test?</div>
      <div className='submit-buttons-wrapper'>
        <Button className='cancel-button' color='primary' variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button className='submit-button' color='primary' variant='contained'>Submit</Button>
      </div>
    </div>
  );
};

SubmitModal.propTypes = {
  handleClose: PropTypes.func,
};
