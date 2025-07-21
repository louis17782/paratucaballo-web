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

/*MODAL*/
document.querySelectorAll('.tarjeta img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'block';
    modalImg.src = this.src;
    modalImg.alt = this.alt;
  });
});

document.querySelector('.close').onclick = function() {
  document.getElementById('imageModal').style.display = 'none';
};

window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

//ver mas 

// ...existing code...

// Mostrar solo 4 tarjetas .pro-1 al inicio y mostrar 4 más cada vez que se haga clic en "Ver más"
document.addEventListener('DOMContentLoaded', function() {
  const tarjetas = document.querySelectorAll('.tarjeta.pro-1');
  const verMasBtn = document.getElementById('verMasBtn');
  let visibles = 4;

  function mostrarTarjetas() {
    tarjetas.forEach((tarjeta, i) => {
      tarjeta.style.display = i < visibles ? 'block' : 'none';
    });
    if (visibles >= tarjetas.length) {
      verMasBtn.style.display = 'none';
    } else {
      verMasBtn.style.display = 'block';
    }
  }

  mostrarTarjetas();

  verMasBtn.addEventListener('click', function() {
    visibles += 4;
    mostrarTarjetas();
  });
});