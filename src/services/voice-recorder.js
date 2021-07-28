let chunks = [];
let rec = {};
let blobURL;

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.onstop = function () {
    blobURL = window.URL.createObjectURL(
      new Blob(chunks, { type: "audio/ogg; codecs=opus" })
    );
    chunks = [];
  };

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  rec = mediaRecorder;
});

const onRecAudio = () => {
  rec.start(100);
};

const offRecAudio = () => {
  rec.stop();
  rec.onstop();
  return blobURL;
};

export { offRecAudio, onRecAudio };
