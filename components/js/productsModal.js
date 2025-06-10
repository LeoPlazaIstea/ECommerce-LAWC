import { Cart } from './cart.js';

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

  const btnAdd = document.getElementById('modalAddToCart');
  btnAdd.addEventListener('click', () => {
    Cart.addToCart(product);
    modal.hide();
  });
}