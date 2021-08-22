import { testSpeakingFile } from '../constants/localStorageConstants';
let chunks = [];
let blobURL;
let rec = {};
let blob = {};
let state = '';

const onRecAudio = () => {

  navigator.permissions.query({ name: 'microphone'}).then(function(result) {
    if (result.state === 'granted') {
      state = 'granted';
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
    } 
    if (result.state === 'denied') {
      state = 'denied';
      alert('please allow this page to use a microphone');
    }
  });
};

const offRecAudio = () => {
  if (state !== 'denied') {
    rec.stop();
    rec.onstop();
    return blobURL;
  } 
};

const saveBlobUrl = ({ testModule, duration }) => {
  if (state !== 'denied') {
    const reader = new FileReader();

    reader.onload = (event) => {
      localStorage.setItem(testSpeakingFile, event.target.result);
    };
    reader.readAsDataURL(blob);

    localStorage.setItem(
      testModule,
      JSON.stringify({ blob: blobURL })
    );

    return duration;
  }
};

export { onRecAudio, offRecAudio, saveBlobUrl };
