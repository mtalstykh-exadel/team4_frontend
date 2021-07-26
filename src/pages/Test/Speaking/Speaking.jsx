import React, { useState } from "react";
import { offRecAudio, onRecAudio } from "../../../services/voice-recorder.js";
import { speakingTimerHandler } from "../../../services/timer.js";
import micOff from "../../../assets/images/micOff.svg";
import micOn from "../../../assets/images/micOn.svg";
import Player from "../player/player.jsx";
import "./Speaking.scss";

const Speaking = () => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState("off");
  const [blobURL, setBlobURL] = useState("");

  const checkTime = ( time ) => {
    const minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10){
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="step-description">Write down record</div>
      <div className="speaking-topic">Speaking Topic</div>
      <div className="audio-speaking-timer" id="speaking-timer">5:00</div>
      <div className="microphone">
        <img
          src={micOn}
          alt="micro"
          name="onButton"
          className={invisible === "on" ? "invisible-button" : ""}
          onClick={() => {
            setInvisible("on");
            onRecAudio();
            speakingTimerHandler(true);
          }}
        />
        <img
          src={micOff}
          alt="micro"
          name="offButton"
          className={invisible === "off" ? "invisible-button" : ""}
          onClick={() => {
            setInvisible("off");
            setBlobURL(offRecAudio());
            setAudioDuration(speakingTimerHandler(false));
          }}
        />
      </div>
      <Player src={blobURL} audioDuration={audioDuration} checkTime={checkTime}></Player>
    </>
  );
};

export default Speaking;
