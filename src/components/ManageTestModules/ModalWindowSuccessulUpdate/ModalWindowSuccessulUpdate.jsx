import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './ModalWindowSuccessulUpdate.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowSuccessulUpdate = ({ handleClose }) => {

  return (
    <div className='modal-remove'>
      <div className='text font-primary'><Trans>The data was saved successfully</Trans></div>
      <div className='btn'>
        <Button variant='outlined' color='primary' onClick={handleClose} className='button-standard'><Trans>Close</Trans></Button>
      </div>
    </div>
  );
};

ModalWindowSuccessulUpdate.propTypes = {
  handleClose: PropTypes.func,
};
