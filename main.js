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
  console.log('Working');

  if (window.innerWidth >= 1024) {
    const carousel = document.getElementById('carousel');

    console.log(carousel.classList.item(2));
  }
}

function moveCarouselLeft() {

}

