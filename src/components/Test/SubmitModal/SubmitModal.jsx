import React from 'react';
import '../../../styles/modal.scss';
import PropTypes from 'prop-types';
import {Trans} from '@lingui/macro';
import {Button, Paper} from '@material-ui/core';
import './SubmitModal.scss';

export const SubmitModal = ({handleClose}) => {
  return (
    <Paper elevation={2}>
      <div className='submit-modal'>
        <div className='submit-text'><Trans>Are you sure you want to finish the test?</Trans></div>
        <div className='submit-buttons-wrapper'>
          <Button className='cancel-button' color='primary' variant='outlined'
            onClick={handleClose}><Trans>Cancel</Trans></Button>
          <Button className='submit-button' color='primary' variant='contained'><Trans>Submit</Trans></Button>
        </div>
      </div>
    </Paper>
  );
};

SubmitModal.propTypes = {
  handleClose: PropTypes.func,
};
