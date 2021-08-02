import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { Trans } from '@lingui/macro';

export const TestLevelsSelectorItem = (props) => {

  return (
    <div className='test-level-selector-item'>
      <div className='title'><Trans>{props.titleEN}{props.titleRU}</Trans></div>
      <div className='description'><Trans>{props.descriptionEN}{props.descriptionRU}</Trans></div>
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
  titleEN: PropTypes.string.isRequired,
  descriptionEN: PropTypes.string.isRequired,
  titleRU: PropTypes.string.isRequired,
  descriptionRU: PropTypes.string.isRequired
};
