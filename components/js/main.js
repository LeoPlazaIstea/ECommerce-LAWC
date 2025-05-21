import { listProducts } from './products.js';
import { Cart } from './cart.js';
import{ Router} from '../../Services/router.js';

const container = document.getElementById('container');

// Inicializa la lista de productos para acceder desde el DOM
let products = [];
async function initProducts() {
  try {
    products = await listProducts();
    loadProductsHTML(products);
  } catch (err) {
    console.error('Error al cargar productos:', err);
    container.innerHTML = createCardError();
  }
}
// Crea las cards donde se muestran los productos
function createCardHTML(product) {
    return `<div class="col-md-4 col-sm-6 mb-4">
                <div class="card h-100 cursor-pointer" data-id="${product.id}">
                    <img src="${product.image}" class="card-img-top img-fluid" style="max-height: 250px; object-fit: contain;" alt="${product.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.title}</h5>
                    </div>
                </div>
            </div>`;
}
// Crea una card por si hay un error con la carga del producto
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
            </div>`
}

function addOnClick() {
  const buttonsComprar = document.querySelectorAll('button#buttonComprar');
  if (buttonsComprar.length > 0) {
    buttonsComprar.forEach((button) => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.codigo);
        const chosenProduct = products.find(p => p.id === id);

        if (chosenProduct) {
          Cart.addToCart(chosenProduct);
        } else {
          alert('No se encontró el producto.');
        }
      });
    });
  }
}

// Cargo los productos obtenidos del array en las cards que creamos con CreateCardHTML()
function loadProductsHTML(arrayProducts) {
  if (arrayProducts.length > 0) {
    container.innerHTML = '<div class="container"><div class="row">';
    arrayProducts.forEach((product) => {
      container.innerHTML += createCardHTML(product);
    });
    container.innerHTML += '</div></div>';
    // LLamo los datos para cargar el modal
    setupCardClickListeners();
  } else {
    container.innerHTML = createCardError();
  }
}

// Cargo el modal con la info del producto
function setupCardClickListeners() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;

      // Llenamos el modal
      document.getElementById('modalTitle').textContent = product.title;
      document.getElementById('modalPrice').textContent = `$ ${product.price}`;
      document.getElementById('modalImage').src = product.image;
      document.getElementById('modalImage').alt = product.title;
      document.getElementById('modalDescription').textContent = product.description;

      // Guardamos el ID del producto para usarlo después
      document.getElementById('modalAddToCart').dataset.id = product.id;

      // Abrimos el modal
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    });
  });
}

//fetch del cart para que cargue async, de este modo no carga vacio.
async function loadCartHTML() {
  try {
    const res = await fetch('/components/views/cart.html');
    const html = await res.text();
    document.getElementById('cart').innerHTML = html;
  } catch (err) {
    console.error("Error al cargar el carrito:", err);
  }
}
//Llamadas en la carga del dom
document.addEventListener('DOMContentLoaded', async () => {
  await loadCartHTML();
  Cart.init();
  Router.init();
  initProducts(); 
  // Agrega producto desde el modal
  const btnAddToCart = document.getElementById('modalAddToCart');
  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', () => {
      const id = parseInt(btnAddToCart.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) {
        Cart.addToCart(product);
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modalInstance.hide();
      }
    });
  }
});

