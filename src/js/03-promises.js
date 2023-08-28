import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handlerStart);

function handlerStart(evt) {
  evt.preventDefault();
  const formElements = {
    delay: Number(evt.currentTarget.elements.delay.value),
    step: Number(evt.currentTarget.elements.step.value),
    amount: Number(evt.currentTarget.elements.amount.value),
  };

  for (let i = 1; i <= formElements.amount; i += 1) {
    createPromise(i, formElements.delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );

    formElements.delay += formElements.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
