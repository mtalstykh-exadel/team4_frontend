import React, { useState } from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PropTypes from "prop-types";
import "./player.scss";


const Player = ({ src, audioDuration, checkTime }) => {
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const audio = document.getElementById("audio-player");

  const AudioController = () => {
    audio.play();
    setProgressPercent(0);
    setAudioCurrent(0);
    audio.removeEventListener("timeupdate", AudioProgressBar);
    audio.addEventListener("timeupdate", AudioProgressBar);
  };

  const AudioProgressBar = (e) => {
    const { duration, currentTime } = e.srcElement;
    setAudioCurrent(checkTime(currentTime));
    setProgressPercent((currentTime / duration) * 100);
  };

  return (
    <div className="player">
      <button className="player-button">
        <PlayArrowIcon
          color="primary"
          fontSize="medium"
          onClick={AudioController}
          alt="play"
        />
      </button>
      <div className="player-time">
        {audioCurrent === 0 ? "0:00" : audioCurrent}/{audioDuration}
      </div>
      <div className="progress-container">
        <audio id="audio-player" src={src}></audio>
        <div
          style={{ width: progressPercent + "%" }}
          className="progress-line"
        ></div>
        <div className="progress"></div>
      </div>
      <button className="player-button">
        <VolumeUpIcon
          color="primary"
          fontSize="medium"
          onClick={AudioController}
          alt="volume"
        />
      </button>
    </div>
  );
};

Player.propTypes = {
  src: PropTypes.string,
  audioDuration: PropTypes.string,
  checkTime: PropTypes.func
};

export default Player;
