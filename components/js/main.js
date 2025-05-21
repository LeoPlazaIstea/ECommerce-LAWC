//LEO
/*
- No estoy seguro si mezcle un poco la lógica y no hice el encapsulamiento necesario, pero lo podríamos rever juntos y si es necesario hago las modificaciones.
- Tengo que corregir el estilo para que me cargue 3 cards por fila
- Agregar un hover o un puntero diferente para mostrar que las cards son botones
- Determinar cómo queremos que se vea la página, si un Home con alguna data y después la pestaña de productos por otro lado o si se carga todo directamente al cargar la página. Por el momento lo hice de la segunda manera, pero lo puedo adaptar.
- Pude agregar el botón del carrito en el modal y que funcione, pero cuando lo testee vi que los productos que agrega no son los correctos.
*/


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
    return  `<div class="card h-100 cursor-pointer" data-id="${product.id}">
              <img src="${product.image}" class="card-img-top img-fluid" style="max-height: 250px; object-fit: contain;" alt="${product.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${product.title}</h5>
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
        // Limpio el container actual  
        container.innerHTML = '';

        // Crear la estructura de Bootstrap
        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        // Crear cada producto como columna
        arrayProducts.forEach((product) => {
          const colDiv = document.createElement('div');
          colDiv.className = 'col-12 col-sm-6 col-md-4 mb-4';
          colDiv.innerHTML = createCardHTML(product); // insertar la tarjeta dentro de la columna
          rowDiv.appendChild(colDiv);
        });

        containerDiv.appendChild(rowDiv);
        container.appendChild(containerDiv);


        // LLamo los datos para cargar el modal
        setupCardClickListeners();
    } else {container.innerHTML = createCardError();}
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
  // Agrega producto al carrito desde el modal
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
