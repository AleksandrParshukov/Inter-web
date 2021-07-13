const sliders = document.querySelectorAll('.hor-slider');

sliders.forEach((slider) => {
  const buttonsNext = slider.querySelectorAll('.hor-slider__link--next');
  const buttonsPrev = slider.querySelectorAll('.hor-slider__link--prev');

  let currentIndex = 0;

  buttonsNext.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex++;
      slider.style.transform = `translateX(${-100*currentIndex}%)`;
    })
  })

  buttonsPrev.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex--;
      slider.style.transform = `translateX(${100*currentIndex}%)`;
    })
  })
})