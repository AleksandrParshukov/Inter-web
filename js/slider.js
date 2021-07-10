const pageHeader = document.querySelector('.page-header')
const pageMain = document.querySelector('.page-main');
const slider = pageMain.querySelector('.slider');
const sliderItems = slider.querySelectorAll('.slider__item');
const sliderNav = pageMain.querySelector('.slider-nav');
const sliderNavList = sliderNav.querySelector('.slider-nav__list');
const sliderNavItems = sliderNavList.querySelectorAll('.slider-nav__item');
const sliderBtnPrev = sliderNav.querySelector('.slider-nav__button--prev');
const sliderBtnNext = sliderNav.querySelector('.slider-nav__button--next');

let currentIndex = 0;

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

function updateSliderList(index) {
  sliderBtnNext.disabled = false;
  sliderBtnPrev.disabled = false;
  console.log(pageHeader);
  pageHeader.classList.remove('page-header--closed');

  sliderNavList.querySelector('.slider-nav__radio--current').classList.remove('slider-nav__radio--current');
  sliderNavItems[index].firstElementChild.classList.add('slider-nav__radio--current');
  slider.querySelector('.slider__item--current').classList.remove('slider__item--current');
  sliderItems[index].classList.add('slider__item--current');

  if (index === sliderNavItems.length - 1) {
    sliderBtnNext.disabled = true;
    pageHeader.classList.add('page-header--closed');
  }

  if (index === 0) {
    sliderBtnPrev.disabled = true;
  }
}