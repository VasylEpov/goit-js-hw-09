//dom links
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
//events
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
//functions

let timerId = null;

//------------------------

function onStartBtnClick (e) {
    e.target.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();   
    }, 1000);
}

// -------------------------

function onStopBtnClick (e) {
    e.target.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');

    clearInterval(timerId);
}

// -------------------------
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }