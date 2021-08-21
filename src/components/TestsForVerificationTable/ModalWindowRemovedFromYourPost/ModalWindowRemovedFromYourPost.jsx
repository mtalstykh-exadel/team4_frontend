import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import '../../../styles/modal.scss';
import './ModalWindowRemovedFromYourPost.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowRemovedFromYourPost = (props) => {

  return (
    <Paper elevation={2}>
      <div className='modal-content'>
        <div className='modal-remove-post'>
          <div className='text font-primary'><Trans>You have been deassigned from the test</Trans></div>
          <div className='btn'>
            <Button variant='outlined' color='primary' onClick={props.handleClose}><Trans>Close</Trans></Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

ModalWindowRemovedFromYourPost.propTypes = {
  handleClose: PropTypes.func
};
