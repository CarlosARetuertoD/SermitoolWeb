
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.isotope-container');
  const filtrosContainer = document.querySelector('.portfolio-filters');

  const iso = new Isotope(container, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  const archivos = ['/assets/json/productos.json', '/assets/json/repuestos.json'];
  const nuevos = [];
  const categorias = new Set();

  Promise.all(archivos.map(file => fetch(file).then(r => r.json())))
    .then(([repuestos, productos]) => {
      const data = [...repuestos, ...productos];

      data.forEach(item => {
        const filtro = item.filter && typeof item.filter === 'string' ? item.filter : 'filter-otros';
        categorias.add(filtro);

        const imagenZoom = item.imagen_zoom || item.imagen;
        const descripcion = item.descripcion || item.nombre;
        const url = item.url || `/products/${filtro.includes('repuestos') ? 'repuesto' : 'producto'}.html?id=${item.id}`;

        const el = document.createElement('div');
        el.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${filtro}`;
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

      // Botones de filtro
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

      GLightbox({ selector: '.glightbox' });
      iso.appended(nuevos);

      imagesLoaded(container, () => {
        iso.arrange();
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

