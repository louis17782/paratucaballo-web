// useCart es una función que busca al carrito en el almacén local, si no exite carrito en el almacén entonces devuelve un arreglo vacío.
const useCart = () => localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

// Facil, esta función acepta el ID del item del que queremos disminuir la cantidad, busca al carrito con useCart y find para encontrar el item a modificar.
// Una vez se verifica que la cantidad del item es mayor que 1 se modifica su cantidad, se actualiza el carrito y se refresca el DOM.
const decreaseCartItemQuantity = (cartItemId) => {
  const cart = useCart();

  const cartItem = cart.find((cartItem) => cartItem.id === cartItemId);
  if (cartItem.quantity > 1) cartItem.quantity -= 1;

  localStorage.setItem('carrito', JSON.stringify(cart));
  generateCart(true);
};

// Es lo mismo que el decrease pero se verifica que la cantidad del item sea menor a 100 y en vez de disminuir, aumenta la cantidad.
const increaseCartItemQuantity = (cartItemId) => {
  const cart = useCart();

  const cartItem = cart.find((cartItem) => cartItem.id === cartItemId);
  if (cartItem.quantity < 100) cartItem.quantity += 1;

  localStorage.setItem('carrito', JSON.stringify(cart));
  generateCart(true);
};


// Aquí hice algo bien chévere y es que filtro el carrito para remover únicamente el item cuyo ID es igual al del parámetro.
// El elemento filtrado es removido del arreglo y luego es subido nuevamente al almacenamiento local.
const removeCartItem = (cartItemId) => {
  const cart = useCart();

  const filteredCart = cart.filter((cartItem) => cartItem.id !== cartItemId);

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

  const titleText = document.createTextNode(cartItem.name);

  const code = document.createElement('p');
  code.classList.add('product-code');

  const codeText = document.createTextNode(cartItem.id);

  const cartItemAmounts = document.createElement('div');
  cartItemAmounts.classList.add('cart-item-amounts');

  const itemPrice = document.createElement('strong');
  itemPrice.classList.add('item-price');

  const itemPriceValue = document.createTextNode(`$${cartItem.precioRef * cartItem.quantity}`);
  
  const amounts = document.createElement('div');
  amounts.classList.add('amounts');

  const decreaseButton = document.createElement('button');
  decreaseButton.classList.add('cart-item-button');
  decreaseButton.addEventListener('click', () => decreaseCartItemQuantity(cartItem.id));

  const minusSign = document.createElement('i');
  minusSign.classList.add('fa-solid', 'fa-minus');

  const itemQuantity = document.createElement('span');
  
  const itemQuantityValue = document.createTextNode(cartItem.quantity);

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('cart-item-button');
  increaseButton.addEventListener('click', () => increaseCartItemQuantity(cartItem.id));

  const plusSign = document.createElement('i');
  plusSign.classList.add('fa-solid', 'fa-plus');

  const removeItemButton = document.createElement('button');
  removeItemButton.classList.add('remove-item');
  removeItemButton.addEventListener('click', () => removeCartItem(cartItem.id));

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
const generateCart = (refresh = false) => {
  const container = document.getElementById('cart-container');
  const cart = useCart();

  if (refresh) container.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach((cartItem) => container.appendChild(generateCartItemHTML(cartItem)));
  } else {
    const para = document.createElement('p');
    para.classList.add('cart-item');
    const message = document.createTextNode('No hay productos en el carrito');

    para.appendChild(message);
    container.appendChild(para);
  }
};

// Este es un escuchador que ejecuta la función `generateCart` cuando el DOM ha terminado de cargar.
document.addEventListener('DOMContentLoaded', generateCart);