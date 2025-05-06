document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.isotope-container');
  const filtrosContainer = document.querySelector('.portfolio-filters');
  const preloader = document.getElementById('preloader');

  if (preloader) preloader.style.display = 'block'; // Mostrar preloader al inicio

  const iso = new Isotope(container, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  const nuevos = [];
  const categorias = new Set();

  fetch('/assets/json/productos.json')
    .then(r => r.json())
    .then(data => {
      data.forEach(item => {
        const filtroBase = (item.filter || 'otros').toLowerCase().trim().replace(/\s+/g, '-');
        const filtroClase = `filter-${filtroBase}`;
        categorias.add(filtroClase);

        const imagenZoom = item.imagen_zoom || item.imagen;
        const descripcion = item.descripcion || item.nombre;

        let url = item.url;
        if (!url) {
          if (filtroBase === 'suministros-mineros') {
            url = `/products/suministro_info.html?id=${item.id}`;
          } else {
            url = `/products/producto.html?id=${item.id}`;
          }
        }

        const el = document.createElement('div');
        el.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${filtroClase}`;
        el.innerHTML = `
          <div class="portfolio-content h-100">
            <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
            <div class="portfolio-info">
              <h4>${item.id.toUpperCase()}</h4>
              <p>${descripcion}</p>
              <a href="${imagenZoom}" class="glightbox preview-link" title="Vista rápida">
                <i class="bi bi-zoom-in"></i>
              </a>
              <a href="${url}" class="details-link" title="Ver más">
                <i class="bi bi-link-45deg"></i>
              </a>
            </div>
          </div>
        `;
        container.appendChild(el);
        nuevos.push(el);
      });

      // Crear botones de filtro
      filtrosContainer.innerHTML = '';
      const btnTodos = document.createElement('li');
      btnTodos.className = 'filter-active';
      btnTodos.setAttribute('data-filter', '*');
      btnTodos.textContent = 'Todos';
      filtrosContainer.appendChild(btnTodos);

      categorias.forEach(filtroClase => {
        const li = document.createElement('li');
        li.setAttribute('data-filter', `.${filtroClase}`);
        li.textContent = filtroClase.replace('filter-', '').replace(/-/g, ' ').replace(/^./, l => l.toUpperCase());
        filtrosContainer.appendChild(li);
      });

      GLightbox({ selector: '.glightbox' });
      iso.appended(nuevos);

      imagesLoaded(container, () => {
        iso.arrange();
        if (preloader) preloader.style.display = 'none';
      });

      filtrosContainer.querySelectorAll('li').forEach(btn => {
        btn.addEventListener('click', () => {
          filtrosContainer.querySelectorAll('li').forEach(b => b.classList.remove('filter-active'));
          btn.classList.add('filter-active');
          const filtro = btn.getAttribute('data-filter');
          iso.arrange({ filter: filtro });
        });
      });
    })
    .catch(err => {
      console.error('Error cargando productos.json:', err);
      if (preloader) preloader.style.display = 'none';
    });
});
