const galleries = document.querySelectorAll('.gallery__list');  

galleries.forEach((slider) => {
  const buttonPrev = slider.parentElement.querySelector('.gallery__link--prev');
  const buttonNext = slider.parentElement.querySelector('.gallery__link--next');
  const childrenValue = slider.children.length;
  const sliderScreenValue = Math.ceil(childrenValue / 2) - 1;
  const galleryLinks = slider.querySelectorAll('.gallery__image-link');
  const galleryImages = slider.querySelectorAll('.gallery__image');


  let currentIndex = 0;
  let xStart = 0;
  
  updateSliderList(slider, currentIndex);

  buttonPrev.addEventListener('click', (evt) => {
    evt.preventDefault();
    currentIndex--;
    updateSliderList(slider, currentIndex);
  })

  buttonNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    currentIndex++;
    updateSliderList(slider, currentIndex);
  })

  slider.addEventListener('mousedown', (evt) => {
    xStart = evt.screenX;
  })
  
  slider.addEventListener('mouseup', (evt) => {
    const lenght = evt.screenX - xStart;
    touchendHandler(lenght);
  })

  slider.addEventListener('touchstart', (evt) => {
    xStart = evt.changedTouches[0].clientX;
  })
  
  slider.addEventListener('touchend', (evt) => {
    const lenght = evt.changedTouches[0].clientX - xStart;
    touchendHandler(lenght);
  })



  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const newModal = createNewElement();
      const modalImg = newModal.querySelector('.modal__img');
      
      modalImg.setAttribute('src', galleryImages[index].getAttribute('src'));
  
      document.body.appendChild(newModal);
      document.addEventListener('click', documentClickHandler);
  
      function documentClickHandler(evt) {
        evt.preventDefault()
  
        if (evt.target !== modalImg && newModal.contains(evt.target)) {
          document.body.removeChild(newModal);
          document.removeEventListener('click', documentClickHandler);
        }
      }
    })
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

  function updateSliderList() {  
    slider.style.transform = `translateX(${-100*currentIndex}%)`;
    buttonPrev.disabled = false;    
    buttonNext.disabled = false;    
  
    if (currentIndex === 0) {
      buttonPrev.disabled = true;    
    } 
  
    if (currentIndex === sliderScreenValue) {
      buttonNext.disabled = true;    
    }
  }
})
