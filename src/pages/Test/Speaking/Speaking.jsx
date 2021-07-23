import React from "react";
import Button from "@material-ui/core/Button";
import micro from "../../../assets/images/micro.svg";
import {blobURL, offRecAudio, onRecAudio} from "../../../services/voice-recorder.js";
import "./Speaking.scss";

const Speaking = () => {

  return (
    <>
      <div className="stepDescription">Write down record</div>
      <div className="speakingTopic">Speaking Topic</div>
      <div className="img">
        <img src={micro} />
        <audio src={blobURL} controls />
      </div>
      <Button onClick={onRecAudio}>on</Button>
      <Button onClick={offRecAudio}>off</Button>
    </>
  );
};

export default Speaking;
