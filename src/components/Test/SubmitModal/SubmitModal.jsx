import React from 'react';
import { sendingHandler } from './SubmitModalHandler';
import '@globalStyles/modal.scss';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Button } from '@material-ui/core';
import './SubmitModal.scss';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';


export const SubmitModal = ({handleClose}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className='submit-modal'>
      <div className='submit-text'><Trans>Are you sure you want to finish the test?</Trans></div>
      <div className='submit-buttons-wrapper'>
        <Button color='primary'
          variant='outlined'
          className='cancel-button'
          onClick={handleClose}>
          <Trans>Cancel</Trans>
        </Button>
        <Button color='primary'
          variant='contained'
          disabled={loading}
          className='submit-button'
          onClick={() => {
            setLoading(true);
            sendingHandler()
              .then(() => setLoading(false));
          }}>
          {loading ? (
            <CircularProgress className='border-primary' size='23px'/>
          ) : (
            <Trans>Submit</Trans>
          )}
        </Button>
      </div>
    </div>
  );
};

SubmitModal.propTypes = {
  handleClose: PropTypes.func,
};
