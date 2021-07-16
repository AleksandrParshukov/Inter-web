const SWIPE_LENGTH = 100;

const services = document.querySelector('.services');
const sliders = document.querySelectorAll('.hor-slider');

sliders.forEach((slider) => {
  const buttonsNext = slider.querySelectorAll('.hor-slider__link--next');
  const buttonsPrev = slider.querySelectorAll('.hor-slider__link--prev');

  let currentIndex = 0;
  let xStart = 0;

  buttonsNext.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex++;
      updateSliderList(slider, currentIndex);
    })
  })

  buttonsPrev.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex--;
      updateSliderList(slider, currentIndex);
    })
  })

  slider.addEventListener('touchstart', (evt) => {
    xStart = evt.changedTouches[0].clientX;
  })
  
  slider.addEventListener('touchend', (evt) => {
    const lenght = evt.changedTouches[0].clientX - xStart;

    if (isSwipeLeft(lenght) && currentIndex != slider.children.length - 2) {
      currentIndex++;
      updateSliderList(slider, currentIndex);
    }

    if (isSwipeRight(lenght)) {
      if (currentIndex > -1) {
        currentIndex--;
      }
      updateSliderList(slider, currentIndex);
    }
  })

  
})

services.addEventListener('touchstart', (evt) => {
  xStart = evt.changedTouches[0].clientX;
})

services.addEventListener('touchend', serviceSwipeHandle);

function serviceSwipeHandle(evt) {
  const slider = services.querySelector('.service--current').querySelector('.hor-slider');
  const lenght = evt.changedTouches[0].clientX - xStart;

  if (isSwipeLeft(lenght)) {
    updateSliderList(slider, 0);
    services.removeEventListener('touchend', serviceSwipeHandle);
  }
}
  
function isSwipeLeft(length) {
  return length <= -SWIPE_LENGTH;
}

function isSwipeRight(length) {
  return length >= SWIPE_LENGTH;
}

function updateSliderList(slider, index) {
  slider.style.transform = `translateX(${-100*index}%)`;

  if (slider.classList.contains('service__list')) {
    const serviceContent = document.querySelector('.services__content');

    if (window.innerWidth >= 1200) {
      if (index === 0) {
        serviceContent.style.left = '32%';
      } else {
        serviceContent.style.left = '0';
        }
    } else {
      if (index === -1) {
        serviceContent.style.left = '100%';
        services.addEventListener('touchend', serviceSwipeHandle);
        services.style.height = 'auto';
      } else {
        serviceContent.style.left = '0';
        services.style.height = `${slider.children[index+1].scrollHeight}px`;
      }
    }
  }
}