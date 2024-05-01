const cart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : null;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-container');

  if (cart) {
    cart.forEach((cartItem) => {
      const cartItemCard = document.createElement('div');
      cartItemCard.innerText = `${cartItem.name} - ${cartItem.quantity} x ${cartItem.precioRef} : ${cartItem.precioRef * cartItem.quantity}`;
      cartItemCard.classList.add('cart-item');

      container.appendChild(cartItemCard);
    })
  } else {
    const para = document.createElement('p');
    para.classList.add('cart-item');
    const message = document.createTextNode('No hay productos en el carrito');

    para.appendChild(message);
    container.appendChild(para);
  }
});