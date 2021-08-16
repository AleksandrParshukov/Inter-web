const SWIPE_LENGTH = 100;

const services = document.querySelector('.services');
const sliders = document.querySelectorAll('.hor-slider');

sliders.forEach((slider) => {
  const buttonsNext = slider.parentElement.querySelectorAll('.hor-slider__link--next');
  const buttonsPrev = slider.parentElement.querySelectorAll('.hor-slider__link--prev');

  let currentIndex = 0;
  let xStart = 0;

  updateSliderList(slider, currentIndex);

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

  slider.addEventListener('mousedown', (evt) => {
    xStart = evt.screenX;
  })
  
  slider.addEventListener('mouseup', (evt) => {
    const lenght = evt.screenX - xStart;
    console.log(lenght);
    touchendHandler(lenght);
  })

  slider.addEventListener('touchstart', (evt) => {
    xStart = evt.changedTouches[0].clientX;
  })
  
  slider.addEventListener('touchend', (evt) => {
    const lenght = evt.changedTouches[0].clientX - xStart;
    console.log(lenght);
    touchendHandler(lenght);
  })


  function touchendHandler(lenght) {
    if (isSwipeLeft(lenght) && currentIndex != slider.children.length - 2) {
      currentIndex++;
      updateSliderList(slider, currentIndex);
    }

    if (isSwipeRight(lenght)) {
      if (currentIndex > -1) {
        currentIndex--;
      }
      updateSliderList(slider, currentIndex);

      if (currentIndex === -1) {
        currentIndex = 0;
      }

    }
  }
})

services.addEventListener('mousedown', (evt) => {
  xStart = evt.screenX;
})

services.addEventListener('mouseup', serviceSwipeHandle);

services.addEventListener('touchstart', (evt) => {
  xStart = evt.changedTouches[0].clientX;
})

services.addEventListener('touchend', serviceSwipeHandle);

function serviceSwipeHandle(evt) {
  const slider = services.querySelector('.service--current').querySelector('.hor-slider');
  const lenght = evt.changedTouches ? evt.changedTouches[0].clientX - xStart : evt.screenX - xStart;

  if (isSwipeLeft(lenght)) {
    updateSliderList(slider, 0);
    services.removeEventListener('touchend', serviceSwipeHandle);
    services.removeEventListener('mouseup', serviceSwipeHandle);
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
        services.addEventListener('mouseup', serviceSwipeHandle);
        services.style.height = 'auto';
      } else {
        serviceContent.style.left = '0';
        services.style.height = `${slider.children[index+1].scrollHeight}px`;
      }
    }
  }

  if (slider.classList.contains('clients__list') || slider.classList.contains('landing-page__list')) {
    const buttonNext = slider.parentElement.querySelector('.hor-slider__link--next');
    const buttonPrev = slider.parentElement.querySelector('.hor-slider__link--prev');
    const childrenValue = slider.children.length;
    
    let sliderScreenValue;

    if (slider.classList.contains('landing-page__list')) {
      sliderScreenValue = Math.ceil(childrenValue / 2) - 1;
    } else if (window.innerWidth >= 1880) {
      sliderScreenValue = Math.ceil(childrenValue / 9) - 1;
    } else {
      sliderScreenValue = Math.ceil(childrenValue / 6) - 1;
    }

    buttonPrev.disabled = false;    
    buttonNext.disabled = false;    

    if (index === 0) {
      buttonPrev.disabled = true;    
    } 

    if (index === sliderScreenValue) {
      buttonNext.disabled = true;    
    }
  }
}