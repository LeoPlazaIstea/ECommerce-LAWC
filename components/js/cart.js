export const Cart = (() => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const saveCart = () => {
    //Almaceno el carrito en el LS
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCart = () => {
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    itemsContainer.innerHTML = '';
    let total = 0;

    // calculo los montos
    cart.forEach(item => {
      total += item.price * item.quantity;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button class="decrease-qty" data-id="${item.id}">-</button>
        <button class="increase-qty" data-id="${item.id}">+</button>
        <button class="remove-item" data-id="${item.id}">Quitar</button>
      `;
      itemsContainer.appendChild(li);
    });
    ///renderizo el monto total de todos los productos sumados
    totalEl.textContent = total.toFixed(2);
  };

  const addToCart = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    /// si el index es 0 es porque ya hay  un producto
    if (index >= 0) {
      cart[index].quantity += 1;
      console.log(cart[index].quantity)
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
  };

  const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
  };

  const changeQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    //early return para cortar la ejecucion si no hay producto
    if (!item) return;


    item.quantity += delta;
    if (item.quantity <= 0) {
      // si no hay lo saco del carrito
      removeFromCart(id);
    } else {
      saveCart();
      renderCart();
    }
  };

  //configuro los botones para la funcionalidad.
  const setupListeners = () => {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.increase-qty')) {
        const id = parseInt(e.target.dataset.id);
        changeQuantity(id, 1);
      }
      if (e.target.matches('.decrease-qty')) {
        const id = parseInt(e.target.dataset.id);
        changeQuantity(id, -1);
      }
      if (e.target.matches('.remove-item')) {
        const id = parseInt(e.target.dataset.id);
        removeFromCart(id);
      }
      if (e.target.id === 'toggle-cart') {
        document.getElementById('cart').classList.toggle('hidden');
      }
    });
  };

  const init = () => {
    setupListeners();
    renderCart();
  };

  return { init, addToCart };
})();

// Hacemos accesible la función en el global scope para onclick en views
window.addToCart = Cart.addToCart;
    