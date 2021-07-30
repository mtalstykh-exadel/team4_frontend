import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PauseIcon from "@material-ui/icons/Pause";
import PropTypes from "prop-types";
import "./player.scss";

const Player = ({ src, audioDuration, id }) => {
  const [showVolumeChanger, setShowVolumeChanger] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [localeDuration, setLocaleDuration] = useState(0);
  const [audioCurrent, setAudioCurrent] = useState(0);
  const audioDomElement = document.getElementById(id);
  const [audioOn, setAudioOn] = useState(false);

  const AudioController = () => {
    if (document.getElementById(id)) {
      document.getElementById(id).play()
        .catch((err) => {
          console.warn(err);
        });

      setProgressPercent(0);
      setAudioCurrent(0);
      setAudioOn(true);

      document.getElementById(id).removeEventListener("timeupdate", AudioProgressBar);
      document.getElementById(id).addEventListener("timeupdate", AudioProgressBar);
    }
  };

  const AudioStop = () => {
    audioDomElement.pause();
    setAudioOn(false);
  };

  const AudioProgressBar = (e) => {
    const { currentTime, duration } = e.srcElement;
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
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  if (audioDomElement) {
    audioDomElement.onended = () => {
      setAudioOn(false);
    };
  }

  return (
    <Paper
      elevation={2}
      className="player">
      <Paper
        elevation={2}
        className={
          showVolumeChanger === true ? "volume-changer" : "invisible"
        }
      >
        <input
          className="volume-range"
          onChange={AudioVolumeHandler}
          type="range"
          min="0"
          step="10"
          max="100"
          defaultValue="30"
        />
      </Paper>
      <button className="player-button">
        {audioOn === false ? (
          <PlayArrowIcon
            className = "icons-color-primary"
            fontSize="medium"
            onClick={AudioController}
            alt="play"
          />
        ) : (
          <PauseIcon
            className = "icons-color-primary"
            fontSize="medium"
            onClick={AudioStop}
            alt="play"
          />
        )}
      </button>
      <div className="player-time">
        {audioCurrent === 0 ? "0:00" : audioCurrent} /
        {audioDuration === undefined
          ? checkTime(localeDuration)
          : checkTime(audioDuration)}
      </div>
      <div className="progress-container">
        <audio id={id} src={src} />
        <div
          style={{ width: progressPercent + "%" }}
          className="progress-line border-primary"
        />
        <div className="progress" />
      </div>
      <button className="player-button">
        <VolumeUpIcon
          className='icons-color'
          fontSize="medium"
          onClick={() => {
            if (showVolumeChanger === false) {
              setShowVolumeChanger(true);
            } else {
              setShowVolumeChanger(false);
            }
          }}
          alt="volume"
        />
      </button>
    </Paper>
  );
};

Player.propTypes = {
  src: PropTypes.string,
  audioDuration: PropTypes.number,
  id: PropTypes.string,
};

export default Player;
