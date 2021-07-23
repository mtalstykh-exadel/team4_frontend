import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import micro from "../../../assets/images/micro.svg";
import {offRecAudio, onRecAudio} from "../../../services/voice-recorder.js";
import "./Speaking.scss";

const Speaking = () => {
  const [blobURL, setBlobURL] = useState("");
  return (
    <>
      <div className="step-description">Write down record</div>
      <div className="speaking-topic">Speaking Topic</div>
      <div className="img">
        <img src={micro} />
        <audio src={blobURL} controls />
      </div>
      <Button onClick={onRecAudio}>on</Button>
      <Button onClick={() => setBlobURL(offRecAudio())}>off</Button>
    </>
  );
};

export default Speaking;
