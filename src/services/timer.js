let audioDuration = 0;
let timeMinut = 300;
let timer;

const speakingTimerHandler = (timerOn) => {
  const speakingTimerDomElement = document.getElementById("speaking-timer");
  timeMinut = 300;
  if (timerOn === false || timeMinut <= 0) {
    return stopTimer(speakingTimerDomElement);
  } else {
    startTimer(speakingTimerDomElement);
  }
};

const startTimer = (element) => {
  audioDuration = 0;
  timer = setInterval(() => {
    let seconds = timeMinut % 60;
    const minutes = (timeMinut / 60) % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
    ++audioDuration;
    --timeMinut;
    element.textContent = `${Math.floor(minutes)}:${seconds}`;
  }, 1000);
};

const stopTimer = (element) => { 
  clearInterval(timer);
  element.textContent = "5:00";
  return audioDuration;
};

export { speakingTimerHandler };
