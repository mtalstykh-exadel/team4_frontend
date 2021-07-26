import React, { useState } from "react";
import micOn from "../../../assets/images/micOn.svg";
import micOff from "../../../assets/images/micOff.svg";
import Player from "../player/player.jsx";
import { offRecAudio, onRecAudio } from "../../../services/voice-recorder.js";
import "./Speaking.scss";

const Speaking = () => {
  const [blobURL, setBlobURL] = useState("");
  const [invisible, setInvisible] = useState("off");
  return (
    <>
      <div className="step-description">Write down record</div>
      <div className="speaking-topic">Speaking Topic</div>
      <div className="microphone">
        <img
          src={micOn}
          alt="micro"
          name="onButton"
          className={invisible === "on" ? "invisible-button" : ""}
          onClick={() => {
            setInvisible("on");
            onRecAudio();
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
          }}
        />
      </div>
      <Player src={blobURL}></Player>
    </>
  );
};

export default Speaking;
