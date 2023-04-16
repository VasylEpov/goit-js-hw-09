import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  firstDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amountPromises: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(refs.firstDelay.value);
  const step = Number(refs.stepDelay.value);
  const amount = Number(refs.amountPromises.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
