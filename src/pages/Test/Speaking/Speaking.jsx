import React, { useState } from "react";
import { offRecAudio, onRecAudio } from "../../../services/voice-recorder.js";
import { speakingTimerHandler } from "../../../services/speaking-timer.js";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import Player from "../player/player.jsx";
import "./Speaking.scss";

const Speaking = () => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState("off");
  const [blobURL, setBlobURL] = useState("");

  const SpeakingTimerHandler = () => {
    const element = document.getElementById("speaking-timer");
    element.addEventListener("DOMNodeInserted", () => {
      if (element.textContent === "0:00") {
        setInvisible("off");
        setBlobURL(offRecAudio());
        setAudioDuration(speakingTimerHandler(false));
      }
    });
  };

  return (
    <>
      <div className="step-description">Write down record</div>
      <div className="speaking-topic">Speaking Topic</div>
      <div className="audio-speaking-timer" id="speaking-timer">
        5:00
      </div>
      <div className={invisible === "off" ? "microphone" : "microphone off"}>
        {invisible === "off" ? (
          <MicIcon
            alt="microOn"
            className="microphone-item"
            name="onButton"
            onClick={() => {
              setInvisible("on");
              onRecAudio();
              speakingTimerHandler(true);
              SpeakingTimerHandler();
            }}
          />
        ) : (
          <MicOffIcon
            alt="microOff"
            className="microphone-item"
            name="offButton"
            onClick={() => {
              setInvisible("off");
              setBlobURL(offRecAudio());
              setAudioDuration(speakingTimerHandler(false));
            }}
          />
        )}
      </div>
      <Player
        id="player-speaking"
        src={blobURL}
        audioDuration={audioDuration}
      />
    </>
  );
};

export default Speaking;