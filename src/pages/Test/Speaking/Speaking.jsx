import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import micro from "../../../assets/images/micro.svg";
import "./Speaking.scss";

const Speaking = () => {
  const [blobURL, setBlobURL] = useState('');
  const [onRec, setOnRec] = useState(true);
  const [chunks, setChunks] = useState([]);
  const [rec, setRec] = useState({});

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.onstop = function() {
        setBlobURL(window.URL.createObjectURL(new Blob(chunks, {'type': 'audio/ogg; codecs=opus'})));
        setChunks([]);
      };
    
      mediaRecorder.ondataavailable = function(e) {
        setChunks((prev) => [...prev, e.data]);
      };
      setRec(mediaRecorder);
    });


  const onRecAudio = () => {
    rec.start(100);
    setOnRec(false);
  };

  const offRecAudio = () => {
    rec.onstop();
    setOnRec(true);
  };

  return (
    <>
      <div className="stepDescription">Write down record</div>
      <div className="speakingTopic">Speaking Topic</div>
      <div className="img">
        <img src={micro} />
        <audio src={blobURL} controls />
      </div>
      <Button onClick={onRec ? onRecAudio : offRecAudio}>on/off</Button>
    </>
  );
};

export default Speaking;
