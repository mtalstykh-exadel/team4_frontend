import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import {
  Speaking,
  Essay,
  Grammar,
  Listening,
  grammarTasks,
  listeningTasks,
  ReportAMistakeModal,
  SubmitModal
} from '../../components';
import { startTimer, createTimer } from '../../services/timer';
import Layout from '../../components/Layout/Layout';
import Button from '@material-ui/core/Button';
import './Test.scss';
import { Trans } from '@lingui/macro';

export const Test = () => {
  const TestDurationInMinutes = 40;
  const [step, setStep] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [nextButtonClass, setNextButtonClass] = useState(
    'next-step-button'
  );
  const [prevButtonClass, setPrevButtonClass] = useState(
    'previous-step-button invisible'
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const steps = [
    <Grammar key='0' tasks={grammarTasks}/>,
    <Listening key='1' tasks={listeningTasks}/>,
    <Essay key='2'/>,
    <Speaking key='3'/>,
  ];

  const modals = [
    <ReportAMistakeModal key='0' tasks={grammarTasks} level={'A1'} module={'Grammar'} handleClose={handleClose}/>,
    <ReportAMistakeModal key='1' tasks={listeningTasks} level={'A1'} module={'Listening'} handleClose={handleClose}/>,
    <ReportAMistakeModal key='2' level={'A1'} topic={'About Myself'} module={'Essay'} handleClose={handleClose}/>,
    <ReportAMistakeModal key='3' level={'A1'} topic={'About Myself'} module={'Speaking'} handleClose={handleClose}/>,
    <SubmitModal key='4' handleClose={handleClose}/>,
  ];

  useEffect(() => {
    startTimer(
      createTimer({
        domId: 'test-timer',
        minutes: TestDurationInMinutes,
      })
    );
  }, [TestDurationInMinutes]);

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
            }}
          >
            <Trans>Speaking</Trans>
          </div>
          <div className='test-step time' id='test-timer'>
            {TestDurationInMinutes}:00
          </div>
        </div>
        <div className='test-task-wrapper'>{steps[step]}</div>
        <div className='buttons-wrapper'>
          <div className='step-navigation-buttons'>
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
                  setNextButtonClass('next-step-button');
                  return prev;
                });
              }}
            >
              <Trans>Previous</Trans>
            </Button>
            <Button
              className={nextButtonClass}
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
                  return next;
                });
              }}
            >
              <Trans>Next</Trans>
            </Button>
          </div>
          <div className='submit-button-wrapper'>
            <Button
              className='submit-button'
              color='primary'
              variant='contained'
              onClick={() => {setModalIndex(4); handleOpen();}}
            >
              <Trans>Submit</Trans>
            </Button>
          </div>
          <div className='report-mistake' onClick={() => {setModalIndex(step); handleOpen();}}><Trans>Report a mistake</Trans></div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            className='modal'>
            <div className='modal-content'>
              {modals[modalIndex]}
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};
