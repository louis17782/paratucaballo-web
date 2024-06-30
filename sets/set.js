
function displayImage(imageSrc) {
    document.getElementById('mainImg').src = imageSrc;
  }

window.onload = function() {
    displayImage('/Imagenes/SETS/set1.JPG');
  }