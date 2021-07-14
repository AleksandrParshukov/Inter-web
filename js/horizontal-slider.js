const sliders = document.querySelectorAll('.hor-slider');


sliders.forEach((slider) => {
  const buttonsNext = slider.querySelectorAll('.hor-slider__link--next');
  const buttonsPrev = slider.querySelectorAll('.hor-slider__link--prev');

  let currentIndex = 0;

  buttonsNext.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex++;
      updateSliderList(currentIndex);
    })
  })

  buttonsPrev.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex--;
      updateSliderList(currentIndex);
    })
  })

  function updateSliderList(index) {
    slider.style.transform = `translateX(${-100*currentIndex}%)`;
  
    if (slider.classList.contains('service__list')) {
      const serviceContent = document.querySelector('.services__content');
  
      if (index === 0) {
        serviceContent.style.left = '32%';
      } else {
        serviceContent.style.left = '0';
      }
    }
  }
})