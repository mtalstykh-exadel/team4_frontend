import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import {
  Speaking,
  Essay,
  Grammar,
  Listening,
  SubmitModal,
} from '@components/index';
import { startTimer, createTimer, stopTimer } from '@services/timer';
import Layout from '@components/Layout/Layout';
import Button from '@material-ui/core/Button';
import {
  currentTest,
  testEassyUserAnswers,
  testListeningUserAnswers,
  testGrammarUserAnswers,
  testSpeakingAnswers,
  reportAMistakeSpeaking,
  reportAMistakeEssay,
  reportAMistakeListening,
  reportAMistakeGrammar
} from '@constants/localStorageConstants';
import './Test.scss';
import { Trans } from '@lingui/macro';

import moment from 'moment';

export const Test = () => {
  const [testID, setTestID] = useState(0);
  const [level, setLevel] = useState('');
  const [listeningTasks, setListeningTasks] = useState([]);
  const [speakingTask, setSpeakingTask] = useState([]);
  const [grammarTasks, setGrammarTasks] = useState([]);
  const [contentFile, setContentFile] = useState('');
  const [essayTask, setEssayTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [testDurationInSeconds, setTestDurationInSeconds] = useState(2400);

  const [nextButtonClass, setNextButtonClass] = useState('next-step-button');

  const [prevButtonClass, setPrevButtonClass] = useState('previous-step-button invisible');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const steps = [
    <Grammar
      key='0'
      tasks={grammarTasks}
      testModule={testGrammarUserAnswers}
      reportModule={reportAMistakeGrammar}
      level={level}
      testID={testID}
      module={['Grammar','Грамматика']}
    />,
    <Listening
      key='1'
      tasks={listeningTasks}
      contentFile={contentFile}
      testModule={testListeningUserAnswers}
      reportModule={reportAMistakeListening}
      level={level}
      testID={testID}
      module={['Listening','Аудирование']}
    />,
    <Essay
      key='2'
      task={essayTask}
      testModule={testEassyUserAnswers}
      reportModule={reportAMistakeEssay}
      level={level}
      testID={testID}
    />,
    <Speaking
      key='3'
      task={speakingTask}
      testModule={testSpeakingAnswers}
      reportModule={reportAMistakeSpeaking}
      level={level}
      setTestDuration={setTestDurationInSeconds}
      testID={testID}
    />,
  ];

  useEffect(() => {
    stopTimer('test-timer');
    const checkData = async () => {
      const testData = JSON.parse(localStorage.getItem(currentTest));
      if (testData !== null) {
        setGrammarTasks(testData.questions.Grammar);
        setListeningTasks(testData.questions.Listening);
        setEssayTask(testData.questions.Essay);
        setSpeakingTask(testData.questions.Speaking);
        setContentFile(testData.contentFile);
        setLevel(testData.level);
        setTestID(testData.id);
        setTestDurationInSeconds(Math.floor((testData.finishTime - moment()) / 1000));
      }
    };
    checkData();
    if (testDurationInSeconds > 0) {
      startTimer(
        createTimer({
          domId: 'test-timer',
          seconds: testDurationInSeconds,
        })
      );
    } else {
      setTestDurationInSeconds(0);
      stopTimer('test-timer');
      document.getElementById('test-timer').textContent = '0:00';
    }
  }, [testDurationInSeconds]);

  return (
    <Layout>
      <div className='test-page font-primary'>
        <div className='test-navigation-wrapper'>
          <div
            className={`${step === 0 ? 'test-step active' : 'test-step'}`}
            onClick={() => {
              setStep(0);
              setNextButtonClass('next-step-button');
              setPrevButtonClass('previous-step-button invisible');
              window.scrollTo(0, 0);
            }}
          >
            <Trans>Grammar</Trans>
          </div>
          <div
            className={step === 1 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(1);
              setNextButtonClass('next-step-button');
              setPrevButtonClass('previous-step-button');
              window.scrollTo(0, 0);
            }}
          >
            <Trans>Listening</Trans>
          </div>
          <div
            className={step === 2 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(2);
              setNextButtonClass('next-step-button');
              setPrevButtonClass('previous-step-button');
              window.scrollTo(0, 0);
            }}
          >
            <Trans>Essay</Trans>
          </div>
          <div
            className={step === 3 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(3);
              setNextButtonClass('next-step-button invisible');
              setPrevButtonClass('previous-step-button');
              window.scrollTo(0, 0);
            }}
          >
            <Trans>Speaking</Trans>
          </div>
          <div className='test-step time' id='test-timer'>
            {Math.trunc(testDurationInSeconds / 60)}:{testDurationInSeconds % 60}
          </div>
        </div>
        <div className='test-task-wrapper'>{steps[step]}</div>
        <div className='buttons-wrapper'>
          <div className='step-navigation-buttons'>
            <Button
              className={`${prevButtonClass} button-wide`}
              color='primary'
              variant='outlined'
              onClick={() => {
                setStep((prev) => {
                  if (prev > 0) {
                    prev--;
                  }
                  if (prev === 0) {
                    setPrevButtonClass('previous-step-button invisible');
                  }
                  setNextButtonClass('next-step-button');
                  window.scrollTo(0, 0);
                  return prev;
                });
              }}
            >
              <Trans>Previous</Trans>
            </Button>
            <Button
              className={`${nextButtonClass} button-wide`}
              color='primary'
              variant='outlined'
              onClick={() => {
                setStep((next) => {
                  if (next < 3) {
                    next++;
                  }
                  if (next === 3) {
                    setNextButtonClass('next-step-button invisible');
                  }
                  setPrevButtonClass('previous-step-button');
                  window.scrollTo(0, 0);
                  return next;
                });
              }}
            >
              <Trans>Next</Trans>
            </Button>
          </div>
          <div className='submit-button-wrapper'>
            <Button
              className='submit-button button-wide'
              color='primary'
              variant='contained'
              onClick={handleOpen}
            >
              <Trans>Submit test</Trans>
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            className='modal'>
            <div className='modal-content base-color'>
              <SubmitModal key='8' handleClose={handleClose}/>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};
