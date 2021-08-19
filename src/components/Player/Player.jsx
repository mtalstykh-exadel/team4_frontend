import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseIcon from '@material-ui/icons/Pause';
import { CircularProgress } from '@material-ui/core';
import getBlobDuration from 'get-blob-duration';
import PropTypes from 'prop-types';
import {
  testAudioAttempts,
  AudioDurationInBlobUrl,
} from '../../constants/localStorageConstants';
import './Player.scss';

export const Player = ({ src, audioDuration, id, speaking = false }) => {
  const [showVolumeChanger, setShowVolumeChanger] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [localeDuration, setLocaleDuration] = useState(0);
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [audioElement, setAudioElement] = useState({});
  let audioDomElement = document.getElementById(id);
  const [audioOn, setAudioOn] = useState(false);
  const [loading, setloading] = useState(true);

  const AudioStart = () => {
    document
      .getElementById(id)
      .play()
      .catch((err) => {
        console.warn(err);
      });

    setProgressPercent(0);
    setAudioCurrent(0);
    setAudioOn(true);
  };

  const AudioStop = () => {
    if (document.getElementById('player-listening') === null) {
      audioDomElement.pause();
      setAudioOn(false);
    }
  };

  const AudioController = () => {
    let attempts;
    if (document.getElementById(id)) {
      if (
        document.getElementById('player-listening') &&
        parseInt(localStorage.getItem(testAudioAttempts), 16) > 0
      ) {
        AudioStart();
        attempts = parseInt(localStorage.getItem(testAudioAttempts), 16) - 1;
      } else {
        AudioStart();
      }

      if (
        document.getElementById('player-listening') &&
        parseInt(localStorage.getItem(testAudioAttempts), 16) === 0
      ) {
        audioDomElement.pause();
        setAudioOn(false);
        return;
      }
    }
    localStorage.setItem(testAudioAttempts, attempts.toString());
  };

  const AudioProgressBar = (e) => {
    const { currentTime } = e.srcElement;
    const duration = localStorage.getItem(AudioDurationInBlobUrl);

    setAudioElement(e.srcElement);
    setAudioCurrent(checkTime(currentTime));

    if (audioDuration) {
      setProgressPercent((currentTime / audioDuration) * 100);
    } else {
      setProgressPercent((currentTime / duration) * 100);
      setLocaleDuration(duration);
    }
  };

  const AudioVolumeHandler = (e) => {
    audioDomElement.volume = e.target.value / 100;
  };

  const checkTime = (time) => {
    const minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  const setAudioProgressBar = (e) => {
    if (audioElement.currentTime !== null) {
      if (document.getElementById('player-listening') === null) {
        audioElement.currentTime =
          (e.nativeEvent.offsetX / e.target.offsetWidth) *
          Number(localeDuration);
      }
    }
  };

  if (audioDomElement) {
    audioDomElement.onended = () => {
      setAudioOn(false);
    };
  }

  setTimeout(() => {
    audioDomElement = document.getElementById(id);
    audioDomElement.addEventListener('loadeddata', async () => {
      const durationBlobLink = await getBlobDuration(src).catch((err) => {
        console.warn(err);
      });

      setLocaleDuration(durationBlobLink);
      localStorage.setItem(AudioDurationInBlobUrl, durationBlobLink);
      setloading(false);
      document
        .getElementById(id)
        .removeEventListener('timeupdate', AudioProgressBar);
      document
        .getElementById(id)
        .addEventListener('timeupdate', AudioProgressBar);
    });
  }, 0);

  return (
    <Paper elevation={3} className='player'>
      <Paper
        elevation={2}
        className={showVolumeChanger === true ? 'volume-changer' : 'invisible'}
      >
        <input
          className='volume-range'
          onChange={AudioVolumeHandler}
          type='range'
          min='0'
          step='10'
          max='100'
          defaultValue='30'
        />
      </Paper>
      <button
        className='player-button'
        onClick={() => {
          if (audioOn === false) {
            AudioController();
          } else {
            AudioStop();
          }
        }}
      >
        {audioOn === false ? (
          loading && !speaking ? (
            <CircularProgress className='border-primary' size='23px' />
          ) : parseInt(localStorage.getItem(testAudioAttempts), 16) === 0 &&
            document.getElementById('player-listening') ? (
              <PlayArrowIcon
                className='icons-color-secondory'
                fontSize='medium'
              />
            ) : (
              <PlayArrowIcon className='icons-color-primary' fontSize='medium' />
            )
        ) : (
          <PauseIcon className='icons-color-primary' fontSize='medium' />
        )}
      </button>
      <div className='player-time font-primary'>
        {audioCurrent === 0 ? '0:00' : audioCurrent}/
        {audioDuration === undefined
          ? checkTime(localeDuration)
          : checkTime(audioDuration)}
      </div>
      <div className='progress-container' onClick={setAudioProgressBar}>
        <audio id={id} src={src} />
        <div
          style={{ width: progressPercent + '%' }}
          className='progress-line border-primary'
        />
        <div className='progress border-secondary' />
      </div>
      <button
        className='player-button'
        onClick={() => {
          if (showVolumeChanger === false) {
            setShowVolumeChanger(true);
          } else {
            setShowVolumeChanger(false);
          }
        }}
      >
        <VolumeUpIcon className='icons-color' fontSize='medium' />
      </button>
    </Paper>
  );
};

Player.propTypes = {
  src: PropTypes.string,
  audioDuration: PropTypes.number,
  id: PropTypes.string,
  speaking: PropTypes.bool,
};
