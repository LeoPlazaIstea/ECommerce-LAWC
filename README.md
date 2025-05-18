# 📚 ECommerce-LAWC
Proyecto de Ecommerce para la materia laboratorio de Aplicaciones Web Cliente

## 🧑‍💻 Integrantes

- **Martín Ezequiel Lavaggi** - Tareas asignadas
- **Plaza Leonel Federico** - Tareas asignadas

## 🚀 Tecnologías utilizadas

- **HTML 5**
- **JavaScript (ES6+)**
- **Bootstrap**
- **Git & GitHub** para control de versiones y trabajo colaborativo

## 🌐 APIs y Servicios

- **Fake store rest API for your e-commerce or shopping website prototype** (https://fakestoreapi.com/))

## 📁 Estructura del proyecto

├── index.html - Pagina de inicio donde se Cargaran las cards (home).
├── main.js - Logica principal del index, todo lo que no sean servicios.
├── Assets - Ubicacion de los archivos de la pagina (documentos, imagenes locales, etc.).
├── Components - Componentes individuales que se cargan en el resto de la pagina.
│   ├── js - Todo lo que es la logica de cada componente.
│       ├──cart.js - Logica del carrito.
│       ├──home.js - Logica del home.
│       ├──main.js - Logica del main.
│       └──router.js - router deberia ir en services, despues lo cambio.
│   ├── styles - Estilos de cada componente.
│       ├──cart.css - Estilos del carrito.
│       └──styles.css - Estilos generales.
│   ├── views - Estilos de cada componente.
│       ├──cart.html - Template del carrito.
│       ├──home.html - Template del home.
│       └──productosModal.html - Template del modal de productos.
 └── Services - Servicios accesibles para todos los componentes.
   **└──router.js - HAY QUE MODIFICAR EL SCRIPT Y CAMBIAR LA UBICACION.** 




## 📌 Funcionalidades

- Interfaz responsive para móvil y escritorio.
- Visualización de productos desde archivo mock.
- Agregar y quitar productos del carrito.
- Ver total de la compra.
- Simulación de proceso de checkout.
- Funcionamiento tipo SPA.

##UX


## 🛠️ Cómo correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/ecommerce-project.git
   cd ecommerce-project