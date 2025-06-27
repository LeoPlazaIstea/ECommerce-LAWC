import { Cart } from './cart.js';
import { Router } from '../../Services/router.js';

/*
export async function init() {
  const stored = sessionStorage.getItem('selectedProduct');
  if (!stored) return;
  const product = JSON.parse(stored);

  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalPrice').textContent = `$ ${product.price}`;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.title;
  document.getElementById('modalDescription').textContent = product.description;

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();

  document.getElementById('productModal').addEventListener('hidden.bs.modal', () => {
    Router.navigateTo('/');
  });

  const btnAdd = document.getElementById('modalAddToCart');
  btnAdd.addEventListener('click', () => {
    Cart.addToCart(product);
    modal.hide();
  });
}
*/

/********Nueva version init() dinamica para mejorar UX**********/

export async function init() {
  const stored = sessionStorage.getItem('selectedProduct');
  if (!stored) return;

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  const product = JSON.parse(stored);
  renderModalContent(product, modal);

  modal.show();

  refreshModalContent(product, modal);
}

// Esta función renderiza todo el contenido del modal (título, imagen, etc.)
function renderModalContent(product, modal) {
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalPrice').textContent = `$ ${product.price}`;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.title;
  document.getElementById('modalDescription').textContent = product.description;

  refreshModalContent(product, modal);
}

// Esta función actualiza dinámicamente solo la parte del footer (botones + / -)
function refreshModalContent(product, modal) {
  const quantity = Cart.getQuantity(product.id);
  const container = document.querySelector('.modal-footer');
  container.innerHTML = '';

  if (quantity > 0) {
    // Si ya hay productos en el carrito
    const btnRemove = document.createElement('button');
    btnRemove.textContent = '-';
    btnRemove.className = 'btn btn-danger';
    btnRemove.onclick = () => {
      Cart.decreaseFromCart(product.id);
      if(quantity === 1){
        modal.hide();
        return;
      }
      refreshModalContent(product, modal);
    };

    const count = document.createElement('span');
    count.className = 'mx-3 fs-5 fw-bold';
    count.textContent = quantity;

    const btnAdd = document.createElement('button');
    btnAdd.textContent = '+';
    btnAdd.className = 'btn btn-success';
    btnAdd.onclick = () => {
      Cart.addToCart(product);
      Toastify({
        text: `${product.title} agregado al carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#28a745" }
      }).showToast();
      refreshModalContent(product, modal);
    };

    container.append(btnRemove, count, btnAdd);

  } else {
    // Si no hay, mostramos solo el botón "Agregar al carrito"
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'AGREGAR AL CARRITO';
    btnAdd.className = 'btn btn-primary';
    btnAdd.onclick = () => {
      Cart.addToCart(product);
      Toastify({
        text: `${product.title} agregado al carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#28a745" }
      }).showToast();
      // refreshModalContent(product);
      modal.hide();
    };

    container.appendChild(btnAdd);
  }
}
