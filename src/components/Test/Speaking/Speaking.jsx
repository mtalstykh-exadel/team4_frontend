import React, { useState } from 'react';
import { offRecAudio, onRecAudio } from '../../../services/voice-recorder';
import { startTimer, createTimer, stopTimer } from '../../../services/timer';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import { Player } from '../../index';
import { Trans } from '@lingui/macro';
import './Speaking.scss';

export const Speaking = () => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState('off');
  const [blobURL, setBlobURL] = useState('');

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

  return (
    <div className='speaking-step'>
      <div className='step-description'><Trans>Write down record</Trans></div>
      <div className='speaking-topic'><Trans>Speaking Topic</Trans></div>
      <div className='audio-speaking-timer' id='speaking-timer'>
        5:00
      </div>
      <div
        className={
          invisible === 'off' ? 'microphone base-color-primary' : 'microphone base-color-error'
        }
        onClick={() => {
          if (invisible !== 'off') {
            setInvisible('off');
            setBlobURL(offRecAudio());
            setAudioDuration(stopTimer('speaking-timer'));
          } else {
            setInvisible('on');
            onRecAudio();
            startTimer(createTimer({ domId: 'speaking-timer', minutes: 5 }));
            checkSpeakingTimerHandler();
          }
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
        />
      </div>
    </div>
  );
};
