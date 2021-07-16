const feedbackBtns = document.querySelectorAll('.feedback-open');
const orderBtns = document.querySelectorAll('.order-open');
const feedback = document.querySelector('.feedback');
const order = document.querySelector('.order');
const modalList = document.querySelectorAll('.modal');

feedbackBtns.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    feedback.classList.remove('modal--close');
  })
})

orderBtns.forEach(button => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    order.classList.remove('modal--close');
  })
})

modalList.forEach((modal) => {
  const modalClose = modal.querySelector('.modal__close');
  modalClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--close');
  })
});