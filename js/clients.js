const clientsContainer = document.querySelector('.clients');
const clientsLinks = clientsContainer.querySelectorAll('.clients__image-link');
const clientsImages = clientsContainer.querySelectorAll('.clients__image');

clientsLinks.forEach((link, index) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    const newModal = createNewElement();
    const modalImg = newModal.querySelector('.modal__img');
    
    modalImg.setAttribute('src', clientsImages[index].getAttribute('src'));

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

function createNewElement () {
  const element = document.createElement('div');
  const overlay = document.createElement('div');
  const img = document.createElement('img');
  
  element.classList.add('modal');
  overlay.classList.add('modal__overlay');
  img.classList.add('modal__img');

  element.appendChild(overlay);
  element.appendChild(img);

  return element;
}