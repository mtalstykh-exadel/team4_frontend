import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import {Paper} from '@material-ui/core';
import './ModalWindowRemovedFromYourPost.scss';

export const ModalWindowRemovedFromYourPost = (props) => {

  return (
    <Paper elevation={2}>
      <div className='modal-content'>
        <div className='modal-remove-post'>
          <div className='text'>You have been deassigned from the test</div>
          <div className='btn'>
            <Button variant='outlined' color='primary' onClick={props.handleClose}>Close</Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

ModalWindowRemovedFromYourPost.propTypes = {
  handleClose: PropTypes.func
};
