const mapContainer = document.querySelector('.contacts__map-container');
const map = mapContainer.querySelector('.contacts__map');
const btn = mapContainer.querySelector('.contacts__map-btn');

btn.addEventListener('click', () => {
  mapContainer.classList.toggle('contacts__map-container--open');
  map.classList.toggle('contacts__map--open');
})