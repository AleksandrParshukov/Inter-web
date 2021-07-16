const servicesLinks = document.querySelectorAll('.services__link');
const servicesNavBtns = document.querySelectorAll('.services__nav-btn');
const servicesList = document.querySelectorAll('.service');

servicesLinks.forEach((link, index) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateServiceList(index);
  })
})

servicesNavBtns.forEach((btn, index) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateServiceList(index);
  })
})


function updateServiceList (index) {
  document.querySelector('.services__link--current').classList.remove('services__link--current');
  document.querySelector('.services__nav-btn--current').classList.remove('services__nav-btn--current');
  document.querySelector('.service--current').classList.remove('service--current');
  servicesLinks[index].classList.add('services__link--current');
  servicesNavBtns[index].classList.add('services__nav-btn--current');
  servicesList[index].classList.add('service--current');
}