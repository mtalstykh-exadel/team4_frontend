import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './TestLevelSelectorItem.scss';
import { startTestByLevel } from '@api/start-test';
import { language_english } from '@constants/languageConstants';
import { testAudioAttempts, userLanguageKey, currentTest, testGrammarUserAnswers, testEassyUserAnswers, testListeningUserAnswers, testSpeakingAnswers } from '../../../constants/localStorageConstants';
import { Trans } from '@lingui/macro';
import { CircularProgress } from '@material-ui/core';
import { UserModalWindowBanningTest } from '../../TestsInfo/TestsData/UserModalWindowBanningOfPassingTest/UserModalWindowBanningOfPassingTest';
import { UserModalWindowBanningDoubleOpeningTest } from '../../TestsInfo/TestsData/UserModalWindowBanningOfPassingTest/UserModalWindowBanningDoubleOpeningTest';

export const TestLevelsSelectorItem = ({
  titleEN,
  titleRU,
  descriptionEN,
  descriptionRU,
  level,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [openModalDouble, setOpenModalDouble] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenModalDouble = () => {
    setOpenModalDouble(true);
  };
  const handleCloseModalDouble = () => {
    setOpenModalDouble(false);
  };

  return (
    <div className='test-level-selector-item'>
      <UserModalWindowBanningTest open={open} handleClose={handleClose} />;
      <UserModalWindowBanningDoubleOpeningTest open={openModalDouble} handleClose={handleCloseModalDouble} />;
      <div className='title'>
        {localStorage.getItem(userLanguageKey) === language_english
          ? titleEN
          : titleRU}
      </div>
      <div className='description'>
        {localStorage.getItem(userLanguageKey) === language_english
          ? descriptionEN
          : descriptionRU}
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
          localStorage.removeItem(testGrammarUserAnswers);
          localStorage.removeItem(testEassyUserAnswers);
          localStorage.removeItem(testListeningUserAnswers);
          localStorage.removeItem(testSpeakingAnswers);
          localStorage.setItem(testAudioAttempts, 3);
          startTestByLevel(level)
            .then((response) => {
              localStorage.setItem(currentTest, JSON.stringify(response));
              history.push('/test');
              window.scrollTo(0, 0);
            })
            .catch((err) => {
              setLoading(false);
              if (err.response.status === 409) {
                handleOpenModalDouble();
              }
              if (err.response.status === 405) {
                handleOpen();
              }
            });
        }}
      >
        {loading ? (
          <CircularProgress className='border-primary' />
        ) : (
          <Trans>Take test</Trans>
        )}
      </Button>
    </div>
  );
};

TestLevelsSelectorItem.propTypes = {
  level: PropTypes.string.isRequired,
  titleEN: PropTypes.string.isRequired,
  descriptionEN: PropTypes.string.isRequired,
  titleRU: PropTypes.string.isRequired,
  descriptionRU: PropTypes.string.isRequired,
};
