import React from 'react';
import '../../../styles/modal.scss';
import PropTypes from 'prop-types';
import './TestsForVerificationModal.scss';
import { IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const TestsForVerificationModal = ({id, level, handleClose}) => {

return (
    <div className='tests-verification-modal'>
      <div className='tests-verification-modal-header'>
        <div className='test-information'>
          <span className='test-id-verification-modal'>test ID {id}</span>
          <span>Level {level}</span>
        </div>
        <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
          <CloseIcon/>
        </IconButton>
      </div>
      <div className='tests-verification-modal-navigation'>
        <div className='reported-mistake-navigation chosen'><div className='navigation-text'>Reported mistake</div></div>
        <div className='essay-navigation'><div className='navigation-text'>Essay</div></div>
        <div className='speaking-navigation'><div className='navigation-text'>Speaking</div></div>
      </div>
      <div className='tests-verification-modal-buttons-wrapper'>
        <Button variant='contained' color='primary' className='save-button'>Save</Button>
        <Button variant='contained' color='secondary' className='submit-button'>Submit</Button>
      </div>
    </div>
  );
};

TestsForVerificationModal.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  handleClose: PropTypes.func,
};
