import { listProducts } from './products.js';
import { Cart } from './cart.js';

let products = [];
let currentPage = 1;
const productsPerPage = 12;

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

function renderProductsPage(page, customList = null) {
  const container = document.getElementById('home-container');
  const pagination = document.getElementById('pagination');
  if (!container || !pagination) return;

  const list = Array.isArray(customList) ? customList : products;
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = list.slice(start, end);

  container.innerHTML = '';
  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';

  const rowDiv = document.createElement('div');
  rowDiv.className = 'row';

  productsToShow.forEach((product) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-sm-6 col-md-3 mb-4';
    colDiv.innerHTML = createCardHTML(product);
    rowDiv.appendChild(colDiv);
  });

  containerDiv.appendChild(rowDiv);
  container.appendChild(containerDiv);

  setupCardClickListeners();
  renderPagination(list); // 👈 modificamos esto también
}


function renderPagination(filteredList = products) {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(filteredList.length / productsPerPage);
  pagination.innerHTML = '';

  if (totalPages <= 1) return;

  const createButton = (text, pageNum, disabled = false, active = false) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'btn btn-outline-light mx-1';
    if (disabled) btn.disabled = true;
    if (active) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = pageNum;
      renderProductsPage(currentPage, filteredList);
    });

    return btn;
  };

  pagination.appendChild(createButton('Anterior', currentPage - 1, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createButton(i, i, false, currentPage === i));
  }

  pagination.appendChild(createButton('Siguiente', currentPage + 1, currentPage === totalPages));
}

// function setupCardClickListeners() {
//   document.querySelectorAll('.card[data-id]').forEach(card => {
//     card.addEventListener('click', () => {
//       const id = parseInt(card.dataset.id);
//       const product = products.find(p => p.id === id);
//       if (!product) return;

//       // Rellenar el modal con los datos del producto
//       document.getElementById('modalTitle').textContent = product.title;
//       document.getElementById('modalPrice').textContent = `$ ${product.price}`;
//       document.getElementById('modalImage').src = product.image;
//       document.getElementById('modalImage').alt = product.title;
//       document.getElementById('modalDescription').textContent = product.description;
//       document.getElementById('modalAddToCart').dataset.id = product.id;

//       const modal = new bootstrap.Modal(document.getElementById('productModal'));
//       modal.show();
//     });
//   });
// }

// nueva version de setupCardListeners

function setupCardClickListeners() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;

      // Guardamos el producto en sessionStorage
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));

      // Mostramos el modal directamente sin cambiar la vista
      import('./productsModal.js').then(module => {
        module.init();
      });
    });
  });

}


export async function init() {
  try {
    products = await listProducts();
    renderProductsPage(currentPage);

    document.getElementById('search-input').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query)
      );
      renderProductsPage(currentPage, filtered);
    });
    const savedPos = sessionStorage.getItem('scrollPos');
    if (savedPos !== null) {
      window.scrollTo(0, parseInt(savedPos, 10));
      sessionStorage.removeItem('scrollPos');
    }

    const btnAdd = document.getElementById('modalAddToCart');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const id = parseInt(btnAdd.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) {
          Cart.addToCart(product);
          const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productModal'));
          modalInstance.hide();
        }
      });
    }
  } catch (err) {
    const container = document.getElementById('home-container');
    if (container) container.innerHTML = createCardError();
    console.error('Error al cargar productos:', err);
  }
}


