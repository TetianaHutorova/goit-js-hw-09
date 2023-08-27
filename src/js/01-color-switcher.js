import getRandomHexColor from '../createColor';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
refs.btnStop.setAttribute('disabled', 'disabled');

let timerId = null;

refs.btnStart.addEventListener('click', handlerBackgroundColor);
refs.btnStop.addEventListener('click', handlerStopRandomColor);

function handlerBackgroundColor(evt) {
  evt.currentTarget.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled');

  setTimeout(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 0);

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handlerStopRandomColor(evt) {
  clearInterval(timerId);
  evt.currentTarget.setAttribute('disabled', 'disabled');
  refs.btnStart.removeAttribute('disabled');
}
