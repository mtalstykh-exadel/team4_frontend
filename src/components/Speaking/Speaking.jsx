import React, { useState } from "react";
import { offRecAudio, onRecAudio } from "../../services/voice-recorder";
import { startTimer, createTimer, stopTimer } from "../../services/timer";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import Player from "../Player/Player";
import "./Speaking.scss";

const Speaking = () => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState("off");
  const [blobURL, setBlobURL] = useState("");

  const checkSpeakingTimerHandler = () => {
    const element = document.getElementById("speaking-timer");
    element.addEventListener("DOMNodeInserted", () => {
      if (element.textContent === "0:00") {
        setInvisible("off");
        setBlobURL(offRecAudio());
        setAudioDuration(stopTimer("speaking-timer"));
      }
    });
  };

  return (
    <div className="speaking-step">
      <div className="step-description">Write down record</div>
      <div className="speaking-topic">Speaking Topic</div>
      <div className="audio-speaking-timer" id="speaking-timer">
        5:00
      </div>
      <div className={invisible === "off" ? "microphone" : "microphone microphone-off"}>
        {invisible === "off" ? (
          <MicIcon
            alt="microOn"
            className="microphone-item"
            name="onButton"
            onClick={() => {
              setInvisible("on");
              onRecAudio();
              startTimer(createTimer({domId: "speaking-timer", minutes: 5}));
              checkSpeakingTimerHandler();
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
              setAudioDuration(stopTimer("speaking-timer"));
            }}
          />
        )}
      </div>
      <Player
        id="player-speaking"
        src={blobURL}
        audioDuration={audioDuration}
      />
    </div>
  );
};

export default Speaking;
