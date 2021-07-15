const portfolio = document.querySelector('.portfolio');
const portfolioLinks = portfolio.querySelectorAll('.portfolio__link');
const landingPageBtns = portfolio.querySelectorAll('.landing-page-btn');
const portfolioContent = portfolio.querySelector('.portfolio__content');
const portfolioContentList = portfolio.querySelector('.portfolio__content-list');
const landingPageItems = portfolio.querySelectorAll('.landing-page__item');
const portfolioBack = portfolioContent.querySelector('.portfolio__back');
const projectBtnBack = portfolioContent.querySelectorAll('.project__back');

landingPageBtns.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    portfolioContent.style.display = 'flex';
    if (window.innerWidth >= 1200) {
      pageHeader.classList.add('page-header--closed');
    } 
    portfolioContentList.style.transform = `translateX(0%)`;
    updateHeight(0);
  });
})

portfolioBack.addEventListener('click', (evt) => {
  evt.preventDefault();
  portfolioContent.style.display = 'none';
  pageHeader.classList.remove('page-header--closed');
  updateHeight(-1);
});

landingPageItems.forEach((item) => {
  item.childNodes.forEach((element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      portfolioContentList.style.transform = `translateX(${-100*item.value}%)`;
      updateHeight(item.value);
    });
  })
})

projectBtnBack.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    portfolioContentList.style.transform = `translateX(0%)`;
    updateHeight(0);
  });
})

portfolioLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    const submenu = link.parentElement.querySelector('.submenu');
    if (submenu) {
      submenu.style.display = 'revert';
    }
  })
});

function updateHeight (index) {
  if (index === -1) {
    portfolio.style.height = '';
  } else {
    console.log(portfolioContentList.children[index].scrollHeight);
    portfolio.style.height = `${portfolioContentList.children[index].scrollHeight}px`;
  }
}