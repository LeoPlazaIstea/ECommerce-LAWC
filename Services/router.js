//Exporto las rutas para la navegacion.
export const Router = (() => {
    const routes = {
      '/': '../components/views/home.html',
      '/productos': '../components/views/productosModal.html',
    };
    //configuro la navegacion en base a la key elegida
    const navigateTo = url => {
      history.pushState(null, null, url);
      console.log("entra")
      renderRoute();
    };
  
    //enruto
    const renderRoute = () => {
      const path = window.location.pathname;
      console.log(path)
      //por defecto va al home, si no va en base al pathname
      const view = routes[path] || '../components/views/home.html';
      fetch(view)
        .then(res => res.text())
        .then(html => {
          document.getElementById('view').innerHTML = html;
        });
    };
  
    // seteo las rutas.
    const setupLinks = () => {
      document.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
          e.preventDefault();
          navigateTo(link.href);
        }
      });
    };
  
    
    const init = () => {
      window.addEventListener('popstate', renderRoute);
      setupLinks();
      renderRoute();
    };
  
    return { init };
  })();
  