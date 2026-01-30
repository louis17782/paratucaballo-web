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

// carousel petos
document.querySelectorAll('.carousel-content').forEach(carousel => {
  const container = carousel.querySelector('.carousel-petos');
  const track = carousel.querySelector('.carousel-track');
  const dots = carousel.querySelectorAll('.dot');
  const leftArrow = carousel.querySelector('.arrow.left');
  const rightArrow = carousel.querySelector('.arrow.right');

  const images = track.children;
  const totalImages = images.length;
  const maxDots = dots.length;

  const imagesPerPage = 3;

  let currentIndex = 0; 
  let pageIndex = 0;   

  container.addEventListener('scroll', () => {
    if (window.innerWidth >= 1024) return;

    const imageWidth = container.clientWidth;
    currentIndex = Math.round(container.scrollLeft / imageWidth);
    updateDots(currentIndex);
  });

  function updateDesktopCarousel() {
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    const imageWidth = images[0].clientWidth + gap;

    const moveX = pageIndex * imageWidth * imagesPerPage;
    track.style.transform = `translateX(-${moveX}px)`;

    updateArrows();
  }

  const totalPages = Math.ceil(totalImages / imagesPerPage);

  rightArrow?.addEventListener('click', () => {
    if (window.innerWidth < 1024) return;

    if (pageIndex < totalPages - 1) {
      pageIndex++;
      updateDesktopCarousel();
    }
  });

  leftArrow?.addEventListener('click', () => {
    if (window.innerWidth < 1024) return;

    if (pageIndex > 0) {
      pageIndex--;
      updateDesktopCarousel();
    }
  });

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % maxDots]?.classList.add('active');
  }

  function updateArrows() {
    if (!leftArrow || !rightArrow) return;

    leftArrow.style.opacity = pageIndex === 0 ? '0.3' : '1';
    leftArrow.style.pointerEvents = pageIndex === 0 ? 'none' : 'auto';

    rightArrow.style.opacity = pageIndex === totalPages - 1 ? '0.3' : '1';
    rightArrow.style.pointerEvents = pageIndex === totalPages - 1 ? 'none' : 'auto';
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      pageIndex = 0;
      track.style.transform = 'translateX(0)';
      updateArrows();
    } else {
      container.scrollLeft = 0;
      currentIndex = 0;
      updateDots(0);
    }
  });

  // Init
  updateArrows();
});
