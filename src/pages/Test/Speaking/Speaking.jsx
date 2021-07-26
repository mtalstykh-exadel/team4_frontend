import React, { useState } from "react";
import { offRecAudio, onRecAudio } from "../../../services/voice-recorder.js";
import { speakingTimerHandler } from "../../../services/timer.js";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import Player from "../player/player.jsx";
import "./Speaking.scss";

const Speaking = () => {
  const [audioDuration, setAudioDuration] = useState(0);
  const [invisible, setInvisible] = useState("off");
  const [blobURL, setBlobURL] = useState("");

  const checkTime = (time) => {
    const minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  const SpeakingTimerHandker = () => {
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
            style={{ color: "white" }}
            name="onButton"
            onClick={() => {
              setInvisible("on");
              onRecAudio();
              speakingTimerHandler(true);
              SpeakingTimerHandker();
            }}
          />
        ) : (
          <MicOffIcon
            alt="microOff"
            className="microphone-item"
            style={{ color: "white" }}
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
        src={blobURL}
        audioDuration={audioDuration}
        checkTime={checkTime}
      />
    </>
  );
};

export default Speaking;
