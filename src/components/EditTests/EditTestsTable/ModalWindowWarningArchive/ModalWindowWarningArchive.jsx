import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import '@globalStyles/modal.scss';
import './ModalWindowWarningArchive.scss';

import { Trans } from '@lingui/macro';

export const ModalWindowWarningArchive = ({ handleClose, status }) => {

  return (
    <div className='modal-warning-archive'>
      <div className='text font-primary'>
        {
          status === 'ARCHIVED'
            ? <Trans>Are you sure you want to dearchive this?</Trans>
            : <Trans>Are you sure you want to archive this?</Trans>
        }
      </div>
      <div className='btn'>
        <Button variant='outlined' color='primary' onClick={() => handleClose(true, 'archivation')}><Trans>Yes</Trans></Button>
        <Button variant='contained' color='primary' onClick={() => handleClose(false, 'archivation')}><Trans>Cancel</Trans></Button>
      </div>
    </div>
  );
};

ModalWindowWarningArchive.propTypes =
{
  handleClose: PropTypes.func,
  status: PropTypes.any
};
