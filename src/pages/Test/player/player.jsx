import React, { useState } from "react";
import "./player.scss";
import PropTypes from "prop-types";
import play from "../../../assets/images/play.svg";
import volume from "../../../assets/images/volume.svg";
const Player = ({ src, audioDuration }) => {
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
    setAudioCurrent(Math.floor(currentTime));
    setProgressPercent((currentTime / duration) * 100);
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
  audioDuration: PropTypes.number
};

export default Player;
