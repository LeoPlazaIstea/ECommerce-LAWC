
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
      li.classList.add("mt-3")
      li.classList.add("list-group-item")
      li.classList.add("d-flex")
      li.classList.add("justify-content-between")
      li.classList.add("align-items-center")
      li.innerHTML = `
          <div class="product-title">
            <span><b>${item.quantity}</b> x ${item.title} - $${item.unitPrice}</span>
          </div>
           Total: $${item.price}
          <button class="btn decrease-qty btn-outline-secondary btn-sm" data-id="${item.id}">-</button>
          <button class="btn mx-1 increase-qty btn-outline-secondary btn-sm" data-id="${item.id}">+</button>
          <button class="btn remove-item btn-outline-danger btn-sm" data-id="${item.id}">Quitar</button>
        `;
      itemsContainer.appendChild(li);
    });

    ///renderizo el monto total de todos los productos sumados
    totalEl.textContent = total.toFixed(2);
    updateCartIcon();
  };

  const addToCart = (product) => {
    //console.log(`producto ${JSON.stringify(product)}`)
    const index = cart.findIndex(item => item.id === product.id);
    //console.log(cart)
    /// si el index es 0 es porque ya hay  un producto
    if (index >= 0) {
      cart[index].quantity += 1;
      cart[index].price = cart[index].unitPrice * cart[index].quantity;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        unitPrice: product.price,
        price: product.price
      });
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
      item.price = item.unitPrice * item.quantity;
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
      if (e.target.closest('#toggle-cart')) {
        const cartEl = document.getElementById('cart');
        cartEl.classList.toggle('visible');
      }
      if (e.target.id === 'checkout-btn') {
        if (cart.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Tu carrito está vacío',
            text: 'Agregá productos antes de finalizar la compra.',
            confirmButtonColor: '#3085d6'
          });
        } else {
          const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
          const summary = cart.map(item => `${item.title} x${item.quantity}`).join('<br>');

          Swal.fire({
            title: '¿Confirmar compra?',
            html: `<strong>Productos:</strong><br>${summary}<hr><strong>Total:</strong> $${total}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra.',
                confirmButtonColor: '#198754'
              });

              // Limpiar carrito
              cart.length = 0;
              saveCart();
              renderCart();
            } else {
              Swal.fire({
                icon: 'info',
                title: 'Compra cancelada',
                text: 'No se realizó ningún cargo.',
                confirmButtonColor: '#6c757d'
              });
            }
          });
        }
      }
    });
  };

  const init = () => {
    const checkReady = setInterval(() => {
      const itemsContainer = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');

      if (itemsContainer && totalEl) {
        clearInterval(checkReady);
        setupListeners();
        renderCart();
      }
    }, 50);
  };


  // Obtenemos la cantidad de un producto segun si ID
  const getQuantity = (id) => {
    const item = cart.find(p => p.id === id);
    return item ? item.quantity : 0;
  };

  // Funcion para descontar un producto del cart y que tire la alerta con toastify
  const decreaseFromCart = (id) => {
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
      cart[index].quantity -= 1;

      if (cart[index].quantity <= 0) {
        const removedTitle = cart[index].title;
        cart.splice(index, 1); // lo elimino completamente
        Toastify({
          text: `Eliminaste ${removedTitle} del carrito`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: { background: "#dc3545" } // rojo
        }).showToast();
      } else {
        Toastify({
          text: `Quitaste un ${cart[index].title} del carrito`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: { background: "#ffc107" } // amarillo
        }).showToast();
      }

      saveCart();
      renderCart();
    }
  };
  const updateCartIcon = () => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    const emptyIcon = document.getElementById('cart-icon-empty');
    const fullIcon = document.getElementById('cart-icon-full');

    badge.textContent = totalCount;

    if (totalCount > 0) {
      fullIcon.classList.remove('d-none');
      emptyIcon.classList.add('d-none');
      badge.classList.remove('d-none');
    } else {
      fullIcon.classList.add('d-none');
      emptyIcon.classList.remove('d-none');
      badge.classList.add('d-none');
    }
  };

  return { init, addToCart, getQuantity, decreaseFromCart };
})();

// Hacemos accesible la función en el global scope para onclick en views
window.addToCart = Cart.addToCart;
