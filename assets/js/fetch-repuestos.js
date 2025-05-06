document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.isotope-container');
  const filtrosContainer = document.querySelector('.portfolio-filters');
  const preloader = document.querySelector('#preloader');
  const isotopeLoader = document.querySelector('#isotope-loader');

  // Mostrar preloaders
  if (preloader) {
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';
    preloader.style.transition = 'opacity 0.5s ease';
  }
  if (isotopeLoader) isotopeLoader.style.display = 'block';

  // Ocultar productos inicialmente
  container.style.visibility = 'hidden';

  const iso = new Isotope(container, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  fetch('/assets/json/repuestos.json')
    .then(res => res.json())
    .then(data => {
      const nuevos = [];
      const categorias = new Set();

      data.forEach(rep => {
        const categoria = (rep.categoria || 'otros').toLowerCase().trim();
        const claseFiltro = `filter-${categoria.replace(/\s+/g, '-')}`;
        categorias.add(claseFiltro);

        const imagenZoom = rep.imagen_zoom || rep.imagen;
        const descripcion = rep.descripcion || rep.nombre;
        const url = rep.url || `/products/repuesto.html?id=${rep.id}`;

        const el = document.createElement('div');
        el.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${claseFiltro}`;
        el.innerHTML = `
          <div class="portfolio-content h-100">
            <img src="${rep.imagen}" class="img-fluid" alt="${rep.nombre}">
            <div class="portfolio-info">
              <h4>${rep.id.toUpperCase()}</h4>
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

      // Botones de filtro
      filtrosContainer.innerHTML = '';
      const btnTodos = document.createElement('li');
      btnTodos.className = 'filter-active';
      btnTodos.setAttribute('data-filter', '*');
      btnTodos.textContent = 'Todos';
      filtrosContainer.appendChild(btnTodos);

      categorias.forEach(claseFiltro => {
        const li = document.createElement('li');
        li.setAttribute('data-filter', `.${claseFiltro}`);
        li.textContent = claseFiltro
          .replace('filter-', '')
          .replace(/-/g, ' ')
          .replace(/^./, l => l.toUpperCase());
        filtrosContainer.appendChild(li);
      });

      GLightbox({ selector: '.glightbox' });
      iso.appended(nuevos);

      // Esperar carga completa de imágenes
      imagesLoaded(container, () => {
        iso.arrange();
        container.style.visibility = 'visible'; // Mostrar los productos

        // Ocultar preloaders con transición
        if (preloader) {
          preloader.style.opacity = '0';
          setTimeout(() => preloader.remove(), 500);
        }
        if (isotopeLoader) isotopeLoader.remove();
      });

      filtrosContainer.querySelectorAll('li').forEach(btn => {
        btn.addEventListener('click', () => {
          filtrosContainer.querySelectorAll('li').forEach(b => b.classList.remove('filter-active'));
          btn.classList.add('filter-active');
          const filtro = btn.getAttribute('data-filter');
          iso.arrange({ filter: filtro });
        });
      });
    });
});
