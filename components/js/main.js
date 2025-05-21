import { Cart } from './cart.js';
import{ Router} from '../../Services/router.js'

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
});