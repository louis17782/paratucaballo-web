const csvToJson = async () => {
  const csv = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSKKQUuh-hx-Z61WRabFmC0v97W89Ve-4c_9v7oRPSdN8nQt2Pg7Wv9snuQKuBaGeIvLXCvfdtrW2Lp/pub?gid=2147384810&single=true&output=csv')
    .then((response) => response.text())

  const rows = csv.split('\r\n');
  const headers = rows[11].split(',');
  const result = [];

  for (let i = 12; i < rows.length; i++) {
    const obj = {};
    const currentLine = rows[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    if (obj.descripcion) obj.descripcion = obj.descripcion.replace(/&com;/g, ',');

    if (obj['CÓDIGO'] && obj['pronto pago']) result.push(obj);
  }

  return result;
};

function checkCart(product) {
  console.log('Working!');
  const cart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

  return cart.some((cartProduct) => cartProduct['CÓDIGO'] === product['CÓDIGO'])
};

function generateCardHTML(product) {
  const anchor = document.createElement('a');
  anchor.classList.add('project-title');

  const card = document.createElement('div');
  card.classList.add('tarjeta');

  const image = document.createElement('img');
  image.src = `/Imagenes/productos/${product['CÓDIGO']}.jpg`;
  image.alt = 'Product Image';
  image.classList.add('project-image');

  const content = document.createElement('div');
  content.classList.add('content-order');
  
  const title = document.createElement('p');
  title.classList.add('titulo');

  const titleText = document.createTextNode(product['PRODUCTO']);

  const subtitle = document.createElement('p');
  subtitle.classList.add('subtitles');

  const subtitleText = document.createTextNode(product.descripcion);

  const price = document.createElement('p');
  price.classList.add('price');

  const priceText = document.createTextNode(`$${product['pronto pago']}`);

  const buyButton = document.createElement('button');
  buyButton.type = 'button';
  buyButton.classList.add('order');

  const buyButtonText = document.createTextNode('Agregar al Carrito');
  const addedToCart = document.createTextNode('Agregado 👍');

  buyButton.addEventListener('click', (event) => {
    const carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    if (!checkCart(product)) {
      carrito.push({ ...product, quantity: 1 });
      localStorage.setItem('carrito', JSON.stringify(carrito));
      event.target.innerText = 'Agregado 👍';
    };
  });

  title.appendChild(titleText);
  subtitle.appendChild(subtitleText);
  price.appendChild(priceText);
  checkCart(product) ? buyButton.appendChild(addedToCart) : buyButton.appendChild(buyButtonText);
  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(price);
  content.appendChild(buyButton);
  card.appendChild(image);
  card.appendChild(content);
  anchor.appendChild(card);

  return anchor;
}

function renderCards(category) {
  const container = document.getElementById('products-container');

  csvToJson().then((products) => {
    const filteredProducts = products.filter((product) => product.categoria === category);
  
    filteredProducts.forEach((product) => container.appendChild(generateCardHTML(product)));
    console.log(products);
    console.log(filteredProducts);
  });
};
