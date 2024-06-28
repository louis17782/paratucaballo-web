// useCart es una función que busca al carrito en el almacén local, si no exite carrito en el almacén entonces devuelve un arreglo vacío.
const useCart = () => localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

// Facil, esta función acepta el ID del item del que queremos disminuir la cantidad, busca al carrito con useCart y find para encontrar el item a modificar.
// Una vez se verifica que la cantidad del item es mayor que 1 se modifica su cantidad, se actualiza el carrito y se refresca el DOM.
const decreaseCartItemQuantity = (cartItemId) => {
  const cart = useCart();

  const cartItem = cart.find((cartItem) => cartItem['CÓDIGO'] === cartItemId);
  if (cartItem.quantity > 1) cartItem.quantity -= 1;

  localStorage.setItem('carrito', JSON.stringify(cart));
  generateCart(true);
};

// Es lo mismo que el decrease pero se verifica que la cantidad del item sea menor a 100 y en vez de disminuir, aumenta la cantidad.
const increaseCartItemQuantity = (cartItemId) => {
  const cart = useCart();

  const cartItem = cart.find((cartItem) => cartItem['CÓDIGO'] === cartItemId);
  if (cartItem.quantity < 100) cartItem.quantity += 1;

  localStorage.setItem('carrito', JSON.stringify(cart));
  generateCart(true);
};


// Aquí hice algo bien chévere y es que filtro el carrito para remover únicamente el item cuyo ID es igual al del parámetro.
// El elemento filtrado es removido del arreglo y luego es subido nuevamente al almacenamiento local.
const removeCartItem = (cartItemId) => {
  const cart = useCart();

  const filteredCart = cart.filter((cartItem) => cartItem['CÓDIGO'] !== cartItemId);

  localStorage.setItem('carrito', JSON.stringify(filteredCart));
  generateCart(true);
};

// Esta función es medio tediosa, es generar un elemento en HTML para que muestre la información del artículo que se pasa en los parámetros.
// Se hace verboso porque todo se genera utilizando JS, pero a la vez es muy práctico abstraer esta mecánica en una función para luego usarla.
const generateCartItemHTML = (cartItem) => {
  const listItem = document.createElement('li');
  listItem.classList.add('cart-item');

  const cartItemInfo = document.createElement('div');
  cartItemInfo.classList.add('cart-item-info');

  const title = document.createElement('p');
  title.classList.add('product-title');

  const titleText = document.createTextNode(cartItem['PRODUCTO']);

  const code = document.createElement('p');
  code.classList.add('product-code');

  const codeText = document.createTextNode(cartItem['CÓDIGO']);

  const cartItemAmounts = document.createElement('div');
  cartItemAmounts.classList.add('cart-item-amounts');

  const itemPrice = document.createElement('strong');
  itemPrice.classList.add('item-price');

  const itemPriceValue = document.createTextNode(`$${cartItem['pronto pago'] * cartItem.quantity}`);
  
  const amounts = document.createElement('div');
  amounts.classList.add('amounts');

  const decreaseButton = document.createElement('button');
  decreaseButton.classList.add('cart-item-button');
  decreaseButton.addEventListener('click', () => decreaseCartItemQuantity(cartItem['CÓDIGO']));

  const minusSign = document.createElement('i');
  minusSign.classList.add('fa-solid', 'fa-minus');

  const itemQuantity = document.createElement('span');
  
  const itemQuantityValue = document.createTextNode(cartItem.quantity);

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('cart-item-button');
  increaseButton.addEventListener('click', () => increaseCartItemQuantity(cartItem['CÓDIGO']));

  const plusSign = document.createElement('i');
  plusSign.classList.add('fa-solid', 'fa-plus');

  const removeItemButton = document.createElement('button');
  removeItemButton.classList.add('remove-item');
  removeItemButton.addEventListener('click', () => removeCartItem(cartItem['CÓDIGO']));

  const removeItemButtonText = document.createTextNode('QUITAR');

  title.appendChild(titleText);
  code.appendChild(codeText);
  cartItemInfo.appendChild(title);
  cartItemInfo.appendChild(code);

  itemPrice.appendChild(itemPriceValue);
  decreaseButton.appendChild(minusSign);
  itemQuantity.appendChild(itemQuantityValue);
  increaseButton.appendChild(plusSign);
  amounts.appendChild(decreaseButton);
  amounts.appendChild(itemQuantity);
  amounts.appendChild(increaseButton);
  removeItemButton.appendChild(removeItemButtonText);
  cartItemAmounts.appendChild(itemPrice);
  cartItemAmounts.appendChild(amounts);
  cartItemAmounts.appendChild(removeItemButton);

  listItem.appendChild(cartItemInfo);
  listItem.appendChild(cartItemAmounts);

  return listItem;
};

// Esta función acepta un parámetro llamado `refresh` que por defecto es falso.
// Si `refresh` es falso entonces simplemente toma la información del carrito y genera el HTML para cada artículo.
// Si `refresh` es verdadero entonces primero borra todo el contenido del carrito en el DOM y vuelve a cargarlo con la info del carrito.
// Adicionalmente, va acumulando el total de todos los productos del carrito para mostrarlos en el elemento con el id `total`.
const generateCart = (refresh = false) => {
  const container = document.getElementById('cart-container');
  const cart = useCart();
  let total = 0;

  if (refresh) container.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach((cartItem) => {
      container.appendChild(generateCartItemHTML(cartItem))
      total += cartItem['pronto pago'] * cartItem.quantity;
    });
  } else {
    const para = document.createElement('p');
    para.classList.add('cart-item');
    const message = document.createTextNode('No hay productos en el carrito');

    para.appendChild(message);
    container.appendChild(para);
  }

  const totalDisplay = document.getElementById('total');
  totalDisplay.innerHTML = `Total: $${total}`;
};

// Este es un escuchador que ejecuta la función `generateCart` cuando el DOM ha terminado de cargar.
document.addEventListener('DOMContentLoaded', generateCart);

const postSubmission = async (submissionParams) => {
  return await fetch('http://localhost:3000/api/v1/projects/3/submissions/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionParams),
  })
};

const convertCartItemToString = (cartItem) => 
  `Código: ${cartItem['CÓDIGO']} - Producto: ${cartItem['PRODUCTO']} - Precio: ${cartItem['pronto pago']} - Cantidad: ${cartItem['quantity']} - Sub-total: ${cartItem['pronto pago'] * cartItem['quantity']}.`;

const convertCartToOrder = () => {
  const cart = useCart();

  const order = cart.map(convertCartItemToString);

  const total = document.getElementById('total').innerText;

  order.push(`TOTAL: ${total}`);
  
  return order
}

const submitOrder = (event) => {
  event.preventDefault();

  const submissionParams = {
    submission: {
      data: {
        nombre: document.getElementById('nombre').value,
        wa_number: document.getElementById('prefijo').value.concat(document.getElementById('telf').value),
        email: document.getElementById('email').value || null,
        orden: convertCartToOrder(),
      },
    },
  };

  postSubmission(submissionParams)
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) throw new Error('No pudimos procesar su orden, por favor inténtelo más tarde.');
      if (useCart().length < 1) throw new Error('El carrito esta vacío, añada un producto al carrito');

      const messageNotification = document.createElement('p');
      messageNotification.classList.add('cart-item');

      const message = document.createTextNode('Estamos procesando tu orden');
  
      messageNotification.appendChild(message);
      
      const form = document.getElementById('order-form');

      form.innerHTML = '';
      form.appendChild(message);

      localStorage.clear();
    }).catch((error) => alert(error));
}

const form = document.getElementById('order-form');
form.addEventListener('submit', (event) => submitOrder(event));