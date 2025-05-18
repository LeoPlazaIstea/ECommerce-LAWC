import { Cart } from './cart.js';
import { Router } from './router.js';

//Llamadas en la carga del dom
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  Router.init();
});