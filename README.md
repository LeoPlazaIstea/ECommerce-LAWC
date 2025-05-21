# 📚 ECommerce-LAWC
Proyecto de Ecommerce para la materia laboratorio de Aplicaciones Web Cliente

## 🧑‍💻 Integrantes

- **Martín Ezequiel Lavaggi** - Tareas asignadas
- **Plaza Leonel Federico** - Tareas asignadas

## 🚀 Tecnologías utilizadas

- **HTML 5**
- **JavaScript (ES6+)**
- **NodeJs** Para gestión de librerias.
- **Bootstrap** Para estilos generales
- **Git & GitHub** para control de versiones y trabajo colaborativo.

## 🌐 APIs y Servicios

- **Fake store rest API for your e-commerce or shopping website prototype** (https://fakestoreapi.com/))

## 📁 Estructura del proyecto

├── index.html - Pagina de inicio donde se Cargaran las cards (home).  
├── Assets - Ubicacion de los archivos de la pagina (documentos, imagenes locales, etc.).  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── logos - Todas las imagenes que sean de logos o nombre de la marca con tipografia especifica.  
├── Components - Componentes individuales que se cargan en el resto de la pagina.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── js - Todo lo que es la logica de cada componente.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──cart.js - Logica del carrito.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──home.js - Logica del home.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──main.js - Logica del main.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──router.js - router deberia ir en services, despues lo cambio.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── styles - Estilos de cada componente.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──cart.css - Estilos del carrito.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──styles.css - Estilos generales.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── views - Estilos de cada componente.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──cart.html - Template del carrito.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──home.html - Template del home.  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──productosModal.html - Template del modal de productos.  
 └── Services - Servicios accesibles para todos los componentes.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──router.js - Servicio que permite el enrutamiento desde index. 




## 📌 Funcionalidades

- Interfaz responsive para móvil y escritorio.
- Visualización de productos desde archivo mock.
- Agregar y quitar productos del carrito.
- Ver total de la compra.
- Simulación de proceso de checkout.
- Funcionamiento tipo SPA.

## 📐 UX


## 🛠️ Cómo correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/ecommerce-project.git
   cd ecommerce-project