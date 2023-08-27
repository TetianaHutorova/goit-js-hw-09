import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from '../convertMs';
import Notiflix from 'notiflix';

const refs = {
  timerChoise: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  btnClear: document.querySelector('button[data-clear]'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
};
refs.btnStart.setAttribute('disabled', 'disabled');
refs.btnClear.setAttribute('disabled', 'disabled');
refs.btnStart.addEventListener('click', handlerCountingTime);
refs.btnClear.addEventListener('click', handlerResetSettings);

let differentInTime = null;
let idTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure(
        'Please choose a date in the future',
        function cb() {}
      );
    } else {
      differentInTime = selectedDates[0] - new Date();
      refs.btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.timerChoise, options);

function handlerCountingTime() {
  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnClear.removeAttribute('disabled');
  refs.timerChoise.setAttribute('disabled', 'disabled');

  setTimeout(() => valueAssignment(differentInTime),0);
  idTime = setInterval(() => {
    if (differentInTime < 1000) {
      clearInterval(idTime);
      refs.btnClear.setAttribute('disabled', 'disabled');
    }
    valueAssignment(differentInTime);
  }, 1000);
}

function valueAssignment(value) {
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = convertMs(value);
  differentInTime -= 1000;
  refs.day.textContent = addLeadingZero(days);
  refs.hour.textContent = addLeadingZero(hours);
  refs.minute.textContent = addLeadingZero(minutes);
  refs.second.textContent = addLeadingZero(seconds);
}

function handlerResetSettings() {
  clearInterval(idTime);
  refs.btnStart.removeAttribute('disabled');
  refs.timerChoise.removeAttribute('disabled');
  refs.btnClear.setAttribute('disabled', 'disabled');
  valueAssignment("");
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
