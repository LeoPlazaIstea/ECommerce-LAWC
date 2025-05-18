export const Router = (() => {
    const routes = {
      '/': '/components/views/home.html',
      '/productos': '/components/views/productosModal.html',
    //   '/contacto': '/views/contacto.html'
    };
  
    const navigateTo = url => {
      history.pushState(null, null, url);
      console.log("entra")
      renderRoute();
    };
  
    const renderRoute = () => {
      const path = window.location.pathname;
      console.log(path)
      const view = routes[path] || '/components/views/home.html';
      fetch(view)
        .then(res => res.text())
        .then(html => {
          document.getElementById('view').innerHTML = html;
        });
    };
  
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
  