const mainNav = document.querySelector('.main-nav');
const mainNavList = mainNav.querySelector('.main-nav__list');
const mainNavBtn = mainNav.querySelector('.main-nav__button');

mainNavBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  mainNav.classList.toggle('main-nav--open');
  mainNavList.classList.toggle('main-nav__list--open');
  mainNavBtn.classList.toggle('main-nav__button--open');
});