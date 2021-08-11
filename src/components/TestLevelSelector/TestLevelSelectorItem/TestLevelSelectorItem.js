import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './TestLevelSelectorItem.scss';
import { startTest } from '../../../api/start-test';
import { language_english } from '../../../constants/languageConstants';
import { userLanguageKey } from '../../../constants/localStorageConstants';
import { currentTest } from '../../../constants/localStorageConstants';
import { Trans } from '@lingui/macro';
import { CircularProgress } from '@material-ui/core';

export const TestLevelsSelectorItem = ({titleEN, titleRU, descriptionEN, descriptionRU, level}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

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
        className='btn button-wide'
        color='primary'
        disabled={loading ? true : false}
        variant='contained'
        onClick={() => {
          setLoading(true);
          localStorage.removeItem(currentTest);
          startTest(level).then((response) => {
            localStorage.setItem(currentTest, JSON.stringify(response));
            history.push('/test');
            window.scrollTo(0, 0);
          }).catch((err) => {
                alert('Попытки закончились, приходите завтра');
                setLoading(false);
                console.log(level, err);
            });
          }
        }
      >
        {loading ? <CircularProgress className='border-primary'/> : <Trans>Take test</Trans>}
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
