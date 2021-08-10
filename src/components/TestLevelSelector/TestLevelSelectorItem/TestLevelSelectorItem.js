import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './TestLevelSelectorItem.scss';
import { startTest } from '../../../api/start-test';
import { language_english } from '../../../constants/languageConstants';
import { userLanguageKey } from '../../../constants/localStorageConstants';
import { currentTest } from '../../../constants/localStorageConstants';
import { Trans } from '@lingui/macro';

export const TestLevelsSelectorItem = ({titleEN, titleRU, descriptionEN, descriptionRU, level}) => {
  const history = useHistory();
  
  return (
    <div className='test-level-selector-item'>
      <div className='title'>
        {localStorage.getItem(userLanguageKey) === language_english ? titleEN : titleRU}
      </div>
      <div className='description'>
        {localStorage.getItem(userLanguageKey) === language_english ? descriptionEN : descriptionRU}
      </div>
      <Button
        disableElevation
        className='btn'
        color='primary'
        variant='contained'
        onClick={() => {
          localStorage.removeItem(currentTest);
          startTest(level).then((response) => {
              localStorage.setItem(currentTest, JSON.stringify(response));
              history.push('/test');
            });
          }
        }
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
