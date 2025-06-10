import { listProducts } from './products.js';
import { Router } from '../../Services/router.js';

let products = [];

function createCardHTML(product) {
  return `<div class="card h-100 cursor-pointer" data-id="${product.id}">
            <img src="${product.image}" class="card-img-top img-fluid" style="max-height: 250px; object-fit: contain;" alt="${product.title}">
            <div class="card-body text-center">
              <h5 class="card-title">${product.title}</h5>
            </div>
          </div>`;
}

function createCardError() {
  return `<div class="card-error">
              <div class="error-title">
                  <h3>Se ha producido un error inesperado.</h3>
                  <div class="emoji-error">🔌</div>
                  <h4>Por favor, intenta acceder nuevamente en unos instantes.</h4>
                  <p>No estamos pudiendo cargar el listado de productos para tu compra.</p>
                  <div class="emoji-error">
                      <span>🛜</span>
                      <span>❌</span>
                  </div>
              </div>
          </div>`;
}

function loadProductsHTML(arrayProducts) {
  const container = document.getElementById('home-container');
  if (!container) return;

  if (arrayProducts.length > 0) {
    container.innerHTML = '';
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    arrayProducts.forEach((product) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-12 col-sm-6 col-md-4 mb-4';
      colDiv.innerHTML = createCardHTML(product);
      rowDiv.appendChild(colDiv);
    });

    containerDiv.appendChild(rowDiv);
    container.appendChild(containerDiv);

    setupCardClickListeners();
  } else {
    container.innerHTML = createCardError();
  }
}

function setupCardClickListeners() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));
      sessionStorage.setItem('scrollPos', window.scrollY);
      Router.navigateTo('/productos');
    });
  });
}

export async function init() {
  try {
    products = await listProducts();
    loadProductsHTML(products);
    const savedPos = sessionStorage.getItem('scrollPos');
    if (savedPos !== null) {
      window.scrollTo(0, parseInt(savedPos, 10));
      sessionStorage.removeItem('scrollPos');
    }
  } catch (err) {
    const container = document.getElementById('home-container');
    if (container) container.innerHTML = createCardError();
    console.error('Error al cargar productos:', err);
  }
}