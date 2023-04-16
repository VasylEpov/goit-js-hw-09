
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('input[type="text"]'),
  buttonStartDate: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const diff = selectedDates[0] - currentDate;

    if (diff < 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.buttonStartDate.removeAttribute('disabled');
    };
  }
}; 

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

      const days = String(Math.floor(ms / day)).padStart(2,0);
    // Remaining hours
    const hours = String((Math.floor((ms % day) / hour))).padStart(2,0);
    // Remaining minutes
    const minutes = String(Math.floor(ms % day % hour / minute)).padStart(2,0);
    // Remaining seconds
    const seconds = String(Math.floor((ms % day % hour % minute) / second)).padStart(2,0);
  
    return { days, hours, minutes, seconds };
  }

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



refs.buttonStartDate.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(countDownTimeToSelectDate, 1000);
  // refs.buttonStartEl.removeEventListener('click', startTimer);
  // refs.buttonStartEl.setAttribute('disabled', '');
}

function countDownTimeToSelectDate() {
  const currentDate = new Date();
  const selectedDates = new Date(refs.inputDate.value);
  const diff = selectedDates - currentDate;

  if (diff < 0) {
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}