let audioDuration = 0;
const timers = [];

const stopTimer = (domId) => {
  clearInterval(timers.pop());
  if (domId !== 'test-timer') {
    document.getElementById(domId).textContent = '5:00';
    return audioDuration;
  }
};

const createTimer = ({ domId, minutes }) => {
  let seconds = minutes * 60 - 1;
  timers.push(
    setInterval(() => {
      const element = document.getElementById(domId);
      const localeMinutes = (seconds / 60) % 60;
      let localeSeconds = seconds % 60;

      if (localeSeconds < 10) {
        localeSeconds = '0' + localeSeconds;
      }
      if (element.textContent === '0:00') {
        element.textContent = '0:00';
        stopTimer(domId);
      }
      seconds--;
      if (domId !== 'test-timer') {
        ++audioDuration;
      }
      element.textContent = `${Math.floor(localeMinutes)}:${localeSeconds}`;
    }, 1000)
  );
  return { id: timers.length - 1 };
};

const startTimer = ({ id }) => {
  timers[id];
  audioDuration = 0;
};

export { startTimer, createTimer, stopTimer };
