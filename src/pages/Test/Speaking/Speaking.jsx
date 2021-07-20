import React from "react";
import Button from '@material-ui/core/Button';
import micro from '../../../assets/images/micro.svg';
import "./Speaking.scss";
const Speaking = () => {
  let url = null;
  let startTime = null;
  let startTimeId = null;
  navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) => {
      if (document.getElementById('start').hasAttribute('a')) return;
      const mediaRecorder = new MediaRecorder(stream);
      const voice = new Array();

      document.getElementById('start').setAttribute('a', 'a');
      document.getElementById('start').addEventListener('click', function () {
        let sum = 0;
        for (let k = 0; k < voice.length; k++) sum = sum + voice[k].time;
        console.log(voice.length);


        mediaRecorder.start();
        // setTimeout(function(){mediaRecorder.stop();}, 300000);
        startTime = Date.now();
        startTimeId = setInterval(function () {
          document.getElementById('time').innerHTML = parseInt((Date.now() - startTime) / 1000 + sum).toString();
        }, 500);
      });


      mediaRecorder.addEventListener("dataavailable", function (event) {
        const key = Math.random();
        voice.push({key: key, time: parseInt((Date.now() - startTime) / 1000), data: event.data});
        url = URL.createObjectURL(event.data);

        let obj = document.createElement('audio');
        obj.setAttribute('src', url);
        obj.setAttribute("controls", "controls");
        obj.setAttribute("key", key);

        document.getElementById('audio').appendChild(obj);
        obj = document.createElement('span');
        obj.setAttribute("key", key);
        obj.innerHTML = 'DELETE';
        obj.addEventListener("click", function (event) {
          const key = event.target.getAttribute("key");
          const lst = document.getElementById('audio').childNodes;
          for (let k = 0; k < lst.length; k++) {
            if (lst[k].getAttribute("key") === key) {
              document.getElementById('audio').removeChild(lst[k]);
              k--;
            }
          }

          for (let k = 0; k < voice.length; k++) {
            if (voice[k].key == key) {
              voice.splice(k, 1);
              break;
            }
          }

        });
        document.getElementById('audio').appendChild(obj);

      });

      document.getElementById('stop').addEventListener('click', function () {
        mediaRecorder.stop();
        clearTimeout(startTimeId);
      });


    });


  return (
    <>
      <div className='stepDescription'>Write down record</div>
      <div className='speakingTopic'>Speaking Topic</div>
      <div className='img'><img src={micro}/></div>
      <div id='time'></div>
      <div id='audio'></div>
      <Button id='start' color='primary'>start</Button>
      <Button id='stop' color='primary'>stop</Button>
    </>
  );
};

export default Speaking;
