function showMenu() {
  const navBar = document.getElementById('navbar');
  const navLinks = document.getElementById('navlinks');

  navBar.classList.replace('hidden', 'backdrop-transitioning');
  navLinks.classList.replace('hidden', 'nav-transitioning');

  setTimeout(() => {
    navBar.classList.remove('backdrop-transitioning');
    navLinks.classList.remove('nav-transitioning');
  })
};

function hideMenu() {
  const navBar = document.getElementById('navbar');
  const navLinks = document.getElementById('navlinks');

  navBar.classList.add('backdrop-transitioning');
  navLinks.classList.add('nav-transitioning');

  setTimeout(() => {
    navBar.classList.replace('backdrop-transitioning', 'hidden');
    navLinks.classList.replace('nav-transitioning', 'hidden');
  }, 500)
};

function moveCarouselRight() {
  if (window.innerWidth >= 1024) {
    const carousel = document.getElementById('carousel');
    const currentPosition = carousel.classList.item(1);

    if (currentPosition === 'carr-pos-1') carousel.classList.replace('carr-pos-1', 'carr-pos-2');
    if (currentPosition === 'carr-pos-2') carousel.classList.replace('carr-pos-2', 'carr-pos-3');
    if (currentPosition === 'carr-pos-3') carousel.classList.replace('carr-pos-3', 'carr-pos-1');
  }
}

function moveCarouselLeft() {
  if (window.innerWidth >= 1024) {
    const carousel = document.getElementById('carousel');
    const currentPosition = carousel.classList.item(1);

    if (currentPosition === 'carr-pos-1') carousel.classList.replace('carr-pos-1', 'carr-pos-3');
    if (currentPosition === 'carr-pos-2') carousel.classList.replace('carr-pos-2', 'carr-pos-1');
    if (currentPosition === 'carr-pos-3') carousel.classList.replace('carr-pos-3', 'carr-pos-2');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');

  modal.addEventListener('click', (event) => event.stopPropagation());
})

function showModal(product) {
  console.log(product);

  const modal = document.getElementById('backdrop');

  modal.classList.replace('modal-hidden', 'modal-transitioning');

  setTimeout(() => modal.classList.remove('modal-transitioning'));
}

function hideModal() {
  const modal = document.getElementById('backdrop');

  modal.classList.add('modal-transitioning');

  setTimeout(() => modal.classList.replace('modal-transitioning', 'modal-hidden'), 500);
}

function generateCardHTML(product) {
  const anchor = document.createElement('a');
  anchor.classList.add('project-title');

  const card = document.createElement('div');
  card.classList.add('tarjeta');

  const image = document.createElement('img');
  image.src = product.imageURL;
  image.alt = 'Product Image';
  image.classList.add('project-image');

  const content = document.createElement('div');
  content.classList.add('contenido');
  
  const paragraph = document.createElement('p');
  paragraph.classList.add('project-title');

  const text = document.createTextNode(product.name);

  paragraph.appendChild(text);
  content.appendChild(paragraph);
  card.appendChild(image);
  card.appendChild(content);
  anchor.appendChild(card);

  return anchor;
}

function renderCards(products, category) {
  const container = document.getElementById('products-container');

  const filteredProducts = products.filter((product) => product.category === category);

  filteredProducts.forEach((product) => container.appendChild(generateCardHTML(product)));
}
 /*Cambiar el botón "Agregar" por botones
function toggleButtons() {
  var addButton = document.getElementById('agregar');
  var counterDisplay = document.getElementById('counter');
  var counter = 0;
 
  addButton.innerHTML = '+';
  addButton.setAttribute('onclick', 'sumar()');
  addButton.setAttribute('id', 'sumar');
  addButton.style.marginRight = '15px';

  var restarButton = document.createElement('button');
  restarButton.innerHTML = '-';
  restarButton.setAttribute('onclick', 'restar()');
  restarButton.setAttribute('id', 'restar');
  addButton.parentNode.insertBefore(restarButton, counterDisplay);
}

function sumar() {
  var counterDisplay = document.getElementById('counter');
  var counter = parseInt(counterDisplay.textContent);
  counter++;
  counterDisplay.textContent = counter;
}

function restar() {
  var counterDisplay = document.getElementById('counter');
  var counter = parseInt(counterDisplay.textContent);
  if (counter > 1) {
    counter--;
    counterDisplay.textContent = counter;
  } else if (counter === 1) {
    counterDisplay.textContent = 'agregar';
    var restarButton = document.getElementById('restar');
    if (restarButton) {
      restarButton.remove();
    }
    var addButton = document.getElementById('agregar');
    addButton.innerHTML = 'agregar';
    addButton.setAttribute('onclick', 'toggleButtons()');
    addButton.setAttribute('id', 'agregar');
  }
  */