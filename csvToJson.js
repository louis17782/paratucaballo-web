// Esta función hace una petición al servidor y entrega la información de los productos que haya en la base de datos (hoja de cálculo en Google Sheets).
// Es una función asíncrona, así que esta tiene el parámetro `async`, lo que hace que se ejecute fuera del flujo normal de JavaScript.
// Está un poco difícil de explicarla toda en una sola línea, así que voy por parte.
const csvToJson = async () => {
  // Aquí hago la solicitud al servidor utilizando la API de fetch. Viene por defecto con JavaScript así que se puede usar así no más.
  // `fetch` devuelve una promesa, así que tenemos que manejarla con el método `then` para utilizar la información del servidor.
  // También debemos utilizar el método `await` para indicarle a JavaScript que necesitamos ese resultado antes de continuar.
  const csv = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSKKQUuh-hx-Z61WRabFmC0v97W89Ve-4c_9v7oRPSdN8nQt2Pg7Wv9snuQKuBaGeIvLXCvfdtrW2Lp/pub?gid=2147384810&single=true&output=csv')
    .then((response) => response.text())

  // Una vez obtenemos la información del servidor, queremos ponerla en el formato correcto, para ellos identificamos las claves y valores de los objetos que vamos a crear.
  // Primero separamos las filas del CSV con el método `split`. Se utiliza el separador `\r\n` para que cree un nuevo elemento con cada nueva línea de texto.
  const rows = csv.split('\r\n');
  // Obtemos las claves de los objetos de la fila #12 del documento. Para ello específicamos con `rows[11]` (11 porque los arreglos en JS empiezan en 0... entonces el 11 en realidad es el 12!).
  const headers = rows[11].split(',');
  // Inicializamos la variable del resultado en un arreglo vacío.
  const result = [];

  // Este bucle itera a través de todas las filas en `rows` empezando desde la fila con el índice #12.
  for (let i = 12; i < rows.length; i++) {
    // Para cada fila inicializa la variable `obj` en un objeto vacío.
    const obj = {};
    // Separa cada fila con sus comas.
    const currentLine = rows[i].split(',');

    // Se inicia otro bucle que itera a través de las claves de los objetos obtenidas en `headers`.
    for (let j = 0; j < headers.length; j++) {
      // Las claves de los objetos deberían compartir el índice con sus respectivos valores en cada fila, por eso usamos `j` tanto en `header`, como en `currentLine`.
      obj[headers[j]] = currentLine[j];
    }

    // Como evitamos usar las comas para no interferir con el formato CSV utilizamos la expresión `&com;` que luego debemos intercambiar por "," utilizando el método `replace` y una regex sencilla.
    if (obj.descripcion) obj.descripcion = obj.descripcion.replace(/&com;/g, ',');

    // También hacemos una pequeña validación antes de incluir el objeto en el arreglo `result`, asegurándonos que cada objeto posee los atributos `CÓDIGO` y `pronto pago`.
    if (obj['CÓDIGO'] && obj['pronto pago']) result.push(obj);
  }

  // Finalmente returnamos el objeto results, que para este punto, es un arreglo con los objetos sacados de la información del servidor.
  return result;
};

// Esta función revisa que un producto esté en el carrito. Retorna `true` si está y `false` si no.
function checkCart(product) {
  const cart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

  return cart.some((cartProduct) => cartProduct['CÓDIGO'] === product['CÓDIGO'])
};

// Esta función, aunque un poco verbosa, genera el HTML para una tarjeta de producto.
function generateCardHTML(product) {
  const anchor = document.createElement('a');
  anchor.classList.add('project-title');

  const card = document.createElement('div');
  card.classList.add('tarjeta');

  const image = document.createElement('img');
  image.src = `../Imagenes/productos/${product['CÓDIGO'].toLowerCase()}.jpg`;
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
};

// Por último, esta función filtra los productos obtenidos de la base de datos por categoría.
// Acepta `category` como único parámetro y filtra los productos que no sea de la categoría especificada en `category`.
function renderCards(category) {
  const container = document.getElementById('products-container');

  csvToJson().then((products) => {
    const filteredProducts = products.filter((product) => product.categoria === category);
  
    filteredProducts.forEach((product) => container.appendChild(generateCardHTML(product)));
    console.log(products);
    console.log(filteredProducts);
  });
};


// PS: Luis, si lees esto, no te abrumes! Yo sé que son bastantes cosas nuevas y todo, pero dale chance a que lleges al módulo de JavaScript.
// Yo estoy seguro que luego de ese módulo vas a volver a leer esto y vas a entender todo clarito. 👍
// De igual forma, por aquí ando yo para que me preguntes vainas. No te de pena preguntarme y pedirme reuniones para explicar. 😅
