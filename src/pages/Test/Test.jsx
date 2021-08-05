import React, { useState, useEffect } from 'react';
import './Test.scss';
import Layout from '../../components/Layout/Layout';
import Speaking from './Speaking/Speaking';
import Essay from './Essay/Essay';
import Grammar from './Grammar/Grammar';
import Listening from './Listening/Listening';
import Button from '@material-ui/core/Button';
import { Trans } from '@lingui/macro';
import grammarTasks from './testData/GrammarTasks';
import listeningTasks from './testData/ListeningTasks';
import { testTimerHandler } from '../../services/test-timer';

const Test = () => {
  const minutes = 40;
  const [step, setStep] = useState(0);
  const [nextButtonText, setNextButtonText] = useState(['Next step', 'Следующий этап']);
  const [prevButtonClass, setPrevButtonClass] = useState(
    'previous-step-button invisible'
  );

  const steps = [
    <Grammar key='0' tasks={grammarTasks} />,
    <Listening key='1' tasks={listeningTasks} />,
    <Essay key='2' />,
    <Speaking key='3' />,
  ];

  useEffect(() => {
    testTimerHandler(minutes);
  },[minutes]);

  return (
    <Layout>
      <div className='test-page font-primary'>
        <div className='test-navigation-wrapper'>
          <div
            className={`${step === 0 ? 'test-step active' : 'test-step'}`}
            onClick={() => {
              setStep(0);
              setNextButtonText(['Next step', 'Следующий этап']);
              setPrevButtonClass('previous-step-button invisible');
            }}
          >
            <Trans>Grammar</Trans>
          </div>
          <div
            className={step === 1 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(1);
              setNextButtonText(['Next step', 'Следующий этап']);
              setPrevButtonClass('previous-step-button');
            }}
          >
            <Trans>Listening</Trans>
          </div>
          <div
            className={step === 2 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(2);
              setNextButtonText(['Next step', 'Следующий этап']);
              setPrevButtonClass('previous-step-button');
            }}
          >
            <Trans>Essay</Trans>
          </div>
          <div
            className={step === 3 ? 'test-step active' : 'test-step'}
            onClick={() => {
              setStep(3);
              setNextButtonText(['Submit', 'Отправить']);
              setPrevButtonClass('previous-step-button');
            }}
          >
            <Trans>Speaking</Trans>
          </div>
          <div className='test-step time' id='test-timer'>{minutes}:00</div>
        </div>
        <div className='test-task-wrapper'>{steps[step]}</div>
        <div className='buttons-wrapper'>
          <div className='test-buttons'>
            <Button
              className={prevButtonClass}
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
                  setNextButtonText(['Next step', 'Следующий этап']);
                  return prev;
                });
              }}
            >
              <Trans>Previous step</Trans>
            </Button>
            <Button
              className='next-step-button'
              color='primary'
              variant='contained'
              onClick={() => {
                setStep((next) => {
                  if (next < 3) {
                    next++;
                  }
                  if (next === 3) {
                    setNextButtonText(['Submit', 'Отправить']);
                  }
                  setPrevButtonClass('previous-step-button');
                  return next;
                });
              }}
            >
              <Trans>{nextButtonText[0]}{nextButtonText[1]}</Trans>
            </Button>
          </div>
          <div className='report-mistake'><Trans>Report a mistake</Trans></div>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
