let dots = document.querySelectorAll(' .dot');
var counter = 0;

function indicators() {
  for(i=0; i < dots.length; i++){ 
    dots[i].className = dots[i].className.replace(' active', '');
  }
  dots[counter].className += ' active';
}
function moveCarouselRight() {
    const carousel = document.getElementById('carousel');
    const currentPosition = carousel.classList.item(1);
    
    if (currentPosition === 'carr-pos-1') {
      carousel.classList.replace('carr-pos-1', 'carr-pos-2');
    counter = 1; }
   else if (currentPosition === 'carr-pos-2') {
    carousel.classList.replace('carr-pos-2', 'carr-pos-3');
    counter = 2; }
   else if (currentPosition === 'carr-pos-3') { 
    carousel.classList.replace('carr-pos-3', 'carr-pos-4');
    counter = 3; }
   else if (currentPosition === 'carr-pos-4') {
    carousel.classList.replace('carr-pos-4', 'carr-pos-5');
    counter = 4; }
   else if (currentPosition === 'carr-pos-5') {
    carousel.classList.replace('carr-pos-5', 'carr-pos-6');
    counter = 5; }
   else if (currentPosition === 'carr-pos-6') { 
    carousel.classList.replace('carr-pos-6', 'carr-pos-1');
    counter = 0; }
    indicators();
}

function moveCarouselLeft() {
    const carousel = document.getElementById('carousel');
    const currentPosition = carousel.classList.item(1);
  
    if (currentPosition === 'carr-pos-1') {
       carousel.classList.replace('carr-pos-1', 'carr-pos-6');
       counter = 5; }
   else if (currentPosition === 'carr-pos-2') { 
    carousel.classList.replace('carr-pos-2', 'carr-pos-1');
    counter = 0; }
   else if (currentPosition === 'carr-pos-3') { 
    carousel.classList.replace('carr-pos-3', 'carr-pos-2');
    counter = 1; }
   else if (currentPosition === 'carr-pos-4') { 
    carousel.classList.replace('carr-pos-4', 'carr-pos-3');
    counter = 2; }
   else if (currentPosition === 'carr-pos-5') { 
    carousel.classList.replace('carr-pos-5', 'carr-pos-4');
    counter = 3; }
   else if (currentPosition === 'carr-pos-6') { 
    carousel.classList.replace('carr-pos-6', 'carr-pos-5');
    counter = 4; 
  }
  indicators();
};
function moveCarouselTo(position) {
  const carousel = document.getElementById('carousel');
  const currentClass = `carr-pos-${counter + 1}`;
  const newClass = `carr-pos-${position + 1}`;
  
  carousel.classList.replace(currentClass, newClass);
  counter = position;
  indicators();
}

function moveCarouselRight() {
  const newCounter = (counter + 1) % dots.length;
  moveCarouselTo(newCounter);
}

function moveCarouselLeft() {
  const newCounter = (counter - 1 + dots.length) % dots.length;
  moveCarouselTo(newCounter);
}

// Añadir manejadores de eventos a los puntos
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
      moveCarouselTo(index);
  });
});

