import { saveSpeaking } from '../api/test-set';

let chunks = [];
let blobURL;
let rec = {};
let blob = {};

const onRecAudio = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = function () {
      blob = new Blob(chunks, { type: 'audio/mpeg; codecs=opus' });
      blobURL = window.URL.createObjectURL(blob);
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
  return blobURL;
};

const saveBlobUrl = ({ testModule, duration }) => {
  saveSpeaking(blob);
  localStorage.setItem(
    testModule,
    JSON.stringify({ blob: blobURL, blobObj: blob, duration: duration })
  );

  return duration;
};

export { onRecAudio, offRecAudio, saveBlobUrl };
