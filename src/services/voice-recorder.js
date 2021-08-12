import { testSpeakingAnswers } from '../constants/localStorageConstants';

let chunks = [];
let blobURL;
let rec = {};

const onRecAudio = () => {
  navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = function () {
      blobURL = window.URL.createObjectURL(new Blob(chunks, {type: 'audio/ogg; codecs=opus'}));
      chunks = [];
      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    rec = mediaRecorder;

    rec.start(100);
  });
};
const offRecAudio = () => {
  rec.stop();
  rec.onstop();
  saveBlobUrl({testModule: testSpeakingAnswers});
  return blobURL;
};

const saveBlobUrl = ({testModule, duration}) => {
  localStorage.setItem(testModule, JSON.stringify({blob: blobURL, duration: duration}));
  return duration;
};

export {onRecAudio, offRecAudio, saveBlobUrl};
