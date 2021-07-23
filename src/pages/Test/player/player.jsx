import React, { useState } from "react";
import "./player.scss";
import PropTypes from "prop-types";
import play from "../../../assets/images/play.svg";
import volume from "../../../assets/images/volume.svg";
const Player = ({ src }) => {
  const [checkPlay, setCheckPlay] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const audio = document.getElementById("audio-player");

  const AudioController = () => {
    audio.play();
    setProgressPercent(0);
    setAudioCurrent(0);
    if (checkPlay === false) {
      audio.addEventListener("timeupdate", AudioProgressBar);
      setCheckPlay(true);
    }
  };

  const AudioProgressBar = (e) => {
    const { duration, currentTime } = e.srcElement;
    setAudioDuration(Math.floor(duration));
    setAudioCurrent(Math.floor(currentTime));
    setProgressPercent(() => {
      const perc = (audioCurrent / audioDuration) * 100;
      if (isNaN(perc) === false) {
        return perc;
      }
    });
  };

  return (
    <div className="player">
      <img
        onClick={AudioController}
        className="player-button"
        src={play}
        alt="play"
      />
      <div className="player-time">
        {audioCurrent}/{audioDuration}
      </div>
      <div className="progress-container">
        <audio id="audio-player" src={src}></audio>
        <div
          style={{ width: progressPercent + "%" }}
          className="progress-line"
        ></div>
        <div className="progress"></div>
      </div>
      <img className="player-button" src={volume} alt="volume" />
    </div>
  );
};

Player.propTypes = {
  src: PropTypes.string,
};

export default Player;
