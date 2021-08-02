import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './TestLevelSelectorItem.scss';

import { Trans } from '@lingui/macro';

export const TestLevelsSelectorItem = ({ title, description }) => {

  return (
    <div className='test-level-selector-item'>
      <div className='title'><Trans>{title}</Trans></div>
      <div className='description'><Trans>{description}</Trans></div>
      <Button
        disableElevation
        className='btn'
        color='primary'
        variant='contained'
        component={Link}
        to='/test'
      >
        <Trans>Take test</Trans>
      </Button>
    </div>
  );
};

TestLevelsSelectorItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
