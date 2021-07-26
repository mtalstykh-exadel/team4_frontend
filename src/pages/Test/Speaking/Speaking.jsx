import React, { useState } from "react";
import { speakingTimerHandler } from "../../../services/timer.js";
import { offRecAudio, onRecAudio } from "../../../services/voice-recorder.js";
import micOn from "../../../assets/images/micOn.svg";
import micOff from "../../../assets/images/micOff.svg";
import Player from "../player/player.jsx";
import "./Speaking.scss";

const Speaking = () => {
  const [invisible, setInvisible] = useState("off");
  const [blobURL, setBlobURL] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);

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
      <Player src={blobURL} audioDuration={audioDuration}></Player>
    </>
  );
};

export default Speaking;
