const news = document.querySelector('.news');
const newsSlider = news.querySelector('.news__slider');
const newsSlides = news.querySelectorAll('.news__slide');
const newsTitle = news.querySelector('.news__title');
const newsBtns = news.querySelector('.news__button');
const newsMenuWrap = news.querySelector('.news__menu-wrap');
const newsMenu = newsMenuWrap.querySelector('.news__menu');
const newsMenuLinks = newsMenu.querySelectorAll('.news__menu-link');
const newsLinks = news.querySelectorAll('.news__link');
const newsBackBtns = news.querySelectorAll('.news__back');

let resizable;

if (window.innerWidth >= 1200) {
  resizable = slider;
} else {
  resizable = news;
}

newsBtns.addEventListener('click', (evt) => {
  evt.preventDefault();
  newsMenu.classList.toggle('news__menu--closed');
  newsBtns.classList.toggle('news__button--open');
  document.addEventListener('click', documentClickHandle);
})

newsMenuLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    newsTitle.textContent = link.textContent;
  })
})

newsLinks.forEach((link, index) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    newsSlider.style.transform = `translateX(${-100*(index+1)}%)`;
    resizable.style.height = `${newsSlides[index+1].scrollHeight}px`;
  })
})

newsBackBtns.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    newsSlider.style.transform = 'translateX(0%)';
    resizable.style.height = `${newsSlides[0].scrollHeight}px`;
  })
})

function documentClickHandle(evt) {
  if (!newsMenuWrap.contains(evt.target)) {
    newsMenu.classList.add('news__menu--closed');
    newsBtns.classList.remove('news__button--open');
    document.removeEventListener('click', documentClickHandle);
  }
}