import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
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
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
            <CloseIcon className='close-icon' />
          </IconButton>
          <div className='text'><Trans>You have been deassigned from the test</Trans></div>
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
