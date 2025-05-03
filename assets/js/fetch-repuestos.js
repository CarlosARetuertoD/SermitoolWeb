document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.isotope-container');
  const filtrosContainer = document.querySelector('.portfolio-filters');

  const iso = new Isotope(container, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  fetch('repuestos.json')
    .then(res => res.json())
    .then(data => {
      const nuevos = [];
      const categorias = new Set();

      data.forEach(rep => {
        const filtro = rep.filter && typeof rep.filter === 'string' ? rep.filter : 'filter-otros';
        categorias.add(filtro);

        const imagenZoom = rep.imagen_zoom || rep.imagen;
        const descripcion = rep.descripcion || rep.nombre;
        const url = rep.url || `/products/repuesto.html?id=${rep.id}`;

        const el = document.createElement('div');
        el.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${filtro}`;
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

      // Generar botones de filtro dinámicos
      filtrosContainer.innerHTML = '';
      const btnTodos = document.createElement('li');
      btnTodos.className = 'filter-active';
      btnTodos.setAttribute('data-filter', '*');
      btnTodos.textContent = 'Todos';
      filtrosContainer.appendChild(btnTodos);

      categorias.forEach(filtro => {
        const li = document.createElement('li');
        li.setAttribute('data-filter', `.${filtro}`);
        li.textContent = filtro.replace('filter-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        filtrosContainer.appendChild(li);
      });

      // Re-inicializar Glightbox
      GLightbox({ selector: '.glightbox' });

      // Agregar nuevos ítems a Isotope
      iso.appended(nuevos);

      // Esperar a que carguen las imágenes
      imagesLoaded(container, () => {
        iso.arrange();
      });

      // Activar filtros
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
