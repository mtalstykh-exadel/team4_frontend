import React, { useEffect, useState } from 'react';
import { offRecAudio, onRecAudio, saveBlobUrl } from '../../../services/voice-recorder';
import { startTimer, createTimer, stopTimer } from '../../../services/timer';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import {Player, ReportAMistakeModal} from '../../index';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';
import './Speaking.scss';
import { Modal } from '@material-ui/core';

export const Speaking = ({ task, testModule, level, testID, reportModule }) => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState('off');
  const [blobURL, setBlobURL] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkSpeakingTimerHandler = () => {
    const element = document.getElementById('speaking-timer');
    element.addEventListener('DOMNodeInserted', () => {
      if (element.textContent === '0:00') {
        setInvisible('off');
        setBlobURL(offRecAudio());
        setAudioDuration(stopTimer('speaking-timer'));
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem(testModule) !== null) {
      setBlobURL(JSON.parse(localStorage.getItem(testModule)).blob);
      setAudioDuration(JSON.parse(localStorage.getItem(testModule)).duration);
    }
  }, [setBlobURL]);

  return (
    <div className='speaking-step'>
      <div className='step-description'><Trans>Write down record</Trans></div>
      <div className='speaking-topic'>{task[0].questionBody}</div>
      <div className='report-mistake' onClick={handleOpen}>
        <Trans>Report a mistake</Trans>
      </div>
      <div className='audio-speaking-timer' id='speaking-timer'>
        5:00
      </div>
      <div
        className={
          invisible === 'off' ? 'microphone base-color-primary' : 'microphone base-color-error'
        }
        onClick={() => {
          navigator.permissions.query({ name: 'microphone'}).then(function(result) {
            if (result.state === 'granted') { 
              if (invisible !== 'off') {
                setInvisible('off');
                setBlobURL(offRecAudio());
                setAudioDuration(stopTimer('speaking-timer'));
                saveBlobUrl({ testModule, duration: stopTimer('speaking-timer') });
              } else {
                setInvisible('on');
                onRecAudio();
                startTimer(createTimer({ domId: 'speaking-timer', seconds: 300 }));
                checkSpeakingTimerHandler();
              }
            } else {
              alert('please allow this page to use a microphone');
            }
          });
        }}
      >
        {invisible === 'off' ? (
          <MicIcon alt='microOn' className='microphone-item' />
        ) : (
          <MicOffIcon alt='microOff' className='microphone-item' />
        )}
      </div>
      <div className='player-speaking'>
        <Player
          id='player-speaking'
          src={blobURL}
          audioDuration={audioDuration}
          speaking={true}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <div className='modal-content base-color'>
          <ReportAMistakeModal
            question={task[0].questionBody}
            questionId={task[0].id}
            level={level}
            module={['Speaking', 'Говорение']}
            handleClose={handleClose}
            testId={testID}
            reportModule={reportModule}
          />
        </div>
      </Modal>
    </div>
  );
};

Speaking.propTypes = {
  task: PropTypes.array,
  testModule: PropTypes.string,
  level: PropTypes.string,
  testID: PropTypes.number,
  reportModule: PropTypes.string
};
