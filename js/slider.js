const WHEEL_TICKS = 12;
const SLIDER_NAV_RIGHT = 90;

const pageBody = document.querySelector('.page-body');
const pageHeader = pageBody.querySelector('.page-header')
const pageMain = pageBody.querySelector('.page-main');
const slider = pageMain.querySelector('.slider');
const sliderItems = slider.querySelectorAll('.slider__item');
const sliderNav = pageMain.querySelector('.slider-nav');
const sliderNavList = sliderNav.querySelector('.slider-nav__list');
const sliderNavItems = sliderNavList.querySelectorAll('.slider-nav__item');
const sliderBtnPrev = sliderNav.querySelector('.slider-nav__button--prev');
const sliderBtnNext = sliderNav.querySelector('.slider-nav__button--next');
const navLinks = pageBody.querySelectorAll('.nav-link');

pageBody.style.width = `${window.innerWidth}px`;
sliderNav.style.left = `${window.innerWidth - sliderNav.clientWidth - SLIDER_NAV_RIGHT}px`;

pageBody.addEventListener('resize', (evt) => {
  pageBody.style.width = `${window.innerWidth}px`;
  sliderNav.style.left = `${window.innerWidth - sliderNav.clientWidth - SLIDER_NAV_RIGHT}px`;
})

if (window.innerWidth >= 1200) {
  let currentIndex = 0;
  let wheelTickCounter = 0;
  let offset = [0];
  slider.style.height = `${sliderItems[0].scrollHeight}px`;

  for (let i = 1; i < sliderItems.length; i++) {
    offset[i] = offset[i-1] + sliderItems[i-1].scrollHeight;
  }

  document.addEventListener('wheel', (evt) => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    if (window.pageYOffset === 0 || window.pageYOffset + window.innerHeight >= scrollHeight) {
      wheelTickCounter++;
    } else {
      wheelTickCounter = 0;
    }

    if (window.pageYOffset === 0 && currentIndex !== 0 && evt.deltaY < 0 && wheelTickCounter >= WHEEL_TICKS)  {
      currentIndex--;
      updateSliderList(currentIndex);
    }

    if (window.pageYOffset + window.innerHeight >= scrollHeight && currentIndex !== sliderNavItems.length - 1 && evt.deltaY > 0 && wheelTickCounter >= WHEEL_TICKS)  {
      currentIndex++;
      updateSliderList(currentIndex);
    }
  })

  sliderBtnNext.addEventListener('click', () => {
    currentIndex++;
    updateSliderList(currentIndex);
  })

  sliderBtnPrev.addEventListener('click', () => {
    currentIndex--;
    updateSliderList(currentIndex);
  })

  sliderNavItems.forEach(element => {
    element.firstElementChild.addEventListener('click', () => {
      currentIndex = Number(element.value);
      updateSliderList(currentIndex);
    })
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex = link.parentElement.value;
      updateSliderList(currentIndex);
    })
  });

  function updateSliderList(index) {
    sliderBtnNext.disabled = false;
    sliderBtnPrev.disabled = false;
    pageHeader.classList.remove('page-header--closed');
    wheelTickCounter = 0;

    sliderNavList.querySelector('.slider-nav__radio--current').classList.remove('slider-nav__radio--current');
    sliderNavItems[index].firstElementChild.classList.add('slider-nav__radio--current');

    slider.style.transform = `translateY(${-offset[index]}px)`;
    slider.scrollIntoView({
      behavior: "smooth",
    });
    slider.style.height = `${sliderItems[index].scrollHeight}px`;

    if (sliderItems[index].querySelector('.portfolio__content')) {
      if (sliderItems[index].querySelector('.portfolio__content').style.display === 'flex') {
        pageHeader.classList.add('page-header--closed');
      }
    }

    if (index === sliderNavItems.length - 1) {
      sliderBtnNext.disabled = true;
      pageHeader.classList.add('page-header--closed');
    }

    if (index === 0) {
      sliderBtnPrev.disabled = true;
    }
  }
} else {
  navLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      sliderItems[link.parentElement.value].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      mainNav.classList.remove('main-nav--open');
      mainNavList.classList.remove('main-nav__list--open');
      mainNavBtn.classList.remove('main-nav__button--open');
    })
  });
}
