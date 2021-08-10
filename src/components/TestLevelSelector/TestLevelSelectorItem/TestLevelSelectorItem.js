import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './TestLevelSelectorItem.scss';
import { startTest } from '../../../api/start-test';
import { language_english } from '../../../constants/languageConstants';
import { currentTest } from '../../../constants/localStorageConstants';
import { Trans } from '@lingui/macro';

export const TestLevelsSelectorItem = ({titleEN, titleRU, descriptionEN, descriptionRU, level}) => {

  return (
    <div className='test-level-selector-item'>
      <div className='title'>
        {localStorage.getItem('language') === language_english ? titleEN : titleRU}
      </div>
      <div className='description'>
        {localStorage.getItem('language') === language_english ? descriptionEN : descriptionRU}
      </div>
      <Button
        disableElevation
        className='btn'
        color='primary'
        variant='contained'
        component={Link}
        to='/test'
        onClick={() => startTest(level).then((response) => localStorage.setItem(currentTest, JSON.stringify(response)))}
      >
        <Trans>Take test</Trans>
      </Button>
    </div>
  );
};

TestLevelsSelectorItem.propTypes = {
  level: PropTypes.string.isRequired,
  titleEN: PropTypes.string.isRequired,
  descriptionEN: PropTypes.string.isRequired,
  titleRU: PropTypes.string.isRequired,
  descriptionRU: PropTypes.string.isRequired
};
