//Exporto las rutas para la navegacion.
export const Router = (() => {
    const routes = {
    '/': { view: '../components/views/home.html', script: '../components/js/home.js' },
    //'/productos': { view: '../components/views/productsModal.html', script: '../components/js/productsModal.js' },
  };

  const navigateTo = url => {
    history.pushState(null, null, url);
    renderRoute();
  };

  const renderRoute = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    const res = await fetch(route.view);
    const html = await res.text();
    document.getElementById('view').innerHTML = html;
    if (route.script) {
      const module = await import(route.script);
      if (module.init) module.init();
    }
  };

  const setupLinks = () => {
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
      }
    });
  };

  const init = () => {
    window.addEventListener('popstate', renderRoute);
    setupLinks();
    renderRoute();
  };

  return { init, navigateTo };
})();
  