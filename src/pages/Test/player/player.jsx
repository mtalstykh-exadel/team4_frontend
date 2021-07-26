import React, { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PauseIcon from "@material-ui/icons/Pause";
import PropTypes from "prop-types";
import "./player.scss";

const Player = ({ src, audioDuration, checkTime }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const audio = document.getElementById("audio-player");
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [audioOn, setAudioOn] = useState(false);

  const AudioController = () => {
    if (audio) {
      audio.play();
      setProgressPercent(0);
      setAudioCurrent(0);
      audio.removeEventListener("timeupdate", AudioProgressBar);
      audio.addEventListener("timeupdate", AudioProgressBar);
      setAudioOn(true);
    }
  };

  const AudioStop = () => {
    audio.pause();
    setAudioOn(false);
  };

  const AudioProgressBar = (e) => {
    const { currentTime } = e.srcElement;
    setAudioCurrent(checkTime(currentTime));
    setProgressPercent((currentTime / audioDuration) * 100);
  };

  audio.onended = () => {
    setAudioOn(false);
  };

  return (
    <div className="player">
      <button className="player-button">
        {audioOn === false ? (
          <PlayArrowIcon
            color="primary"
            fontSize="medium"
            onClick={AudioController}
            alt="play"
          />
        ) : (
          <PauseIcon
            color="primary"
            fontSize="medium"
            onClick={AudioStop}
            alt="play"
          />
        )}
      </button>
      <div className="player-time">
        {audioCurrent === 0 ? "0:00" : audioCurrent}/{checkTime(audioDuration)}
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
          color="action"
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
  audioDuration: PropTypes.number,
  checkTime: PropTypes.func,
};

export default Player;
