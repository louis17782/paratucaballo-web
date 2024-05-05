const cart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : null;

const generateCartItemHTML = (cartItem) => {
  /*
  <li class="cart-item">
    <div class="cart-item-info">
      <p class="product-title">Desodorante para caballos</p>
      <p class="product-code">M0001</p>
    </div>
    <div class="cart-item-amounts">
      <strong class="item-price">$500</strong>
      <div class="amounts">
        <button type="button" onclick="console.log('increase!')" class="cart-item-button">
          <i class="fa-solid fa-plus"></i>
        </button>
        <span>5</span>
        <button type="button" onclick="console.log('decrease!')" class="cart-item-button">
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>
      <button type="button" onclick="console.log('quitar!')" class="remove-item">
        QUITAR
      </button>
    </div>
  </li>
  */

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
  decreaseButton.addEventListener('click', () => console.log('decrease!'))

  const minusSign = document.createElement('i');
  minusSign.classList.add('fa-solid', 'fa-minus');

  const itemQuantity = document.createElement('span');
  
  const itemQuantityValue = document.createTextNode(cartItem.quantity);

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('cart-item-button');
  increaseButton.addEventListener('click', () => console.log('increase!'));

  const plusSign = document.createElement('i');
  plusSign.classList.add('fa-solid', 'fa-plus');

  const removeItemButton = document.createElement('button');
  removeItemButton.classList.add('remove-item');
  removeItemButton.addEventListener('click', () => console.log('remove!'));

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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-container');

  if (cart) {
    cart.forEach((cartItem) => container.appendChild(generateCartItemHTML(cartItem)));
  } else {
    const para = document.createElement('p');
    para.classList.add('cart-item');
    const message = document.createTextNode('No hay productos en el carrito');

    para.appendChild(message);
    container.appendChild(para);
  }
});