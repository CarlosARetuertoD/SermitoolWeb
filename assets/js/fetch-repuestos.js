document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.isotope-container');
  const filtrosContainer = document.querySelector('.portfolio-filters');
  const isotopeLoader = document.querySelector('#isotope-loader');
  const categoriaImagen = document.getElementById('categoria-imagen');
  const hotspotsContainer = document.getElementById('hotspots-container');

  // Mapeo de categorías a imágenes
  const imagenesCategorias = {
    '.filter-trompa': '/assets/img/products/jackleg-s250/partes/trompa.webp',
    '.filter-cilindro': '/assets/img/products/jackleg-s250/partes/cilindro.webp',
    '.filter-cabezal': '/assets/img/products/jackleg-s250/partes/cabezal.webp',
    '.filter-maneral': '/assets/img/products/jackleg-s250/partes/maneral.webp',
    '.filter-barra': '/assets/img/products/jackleg-s250/partes/barra.webp',
    '.filter-lubricadora': '/assets/img/products/jackleg-s250/partes/lubricadora.webp'
  };

  // Definir puntos de interés (hotspots) para cada categoría
  // Formato: [x%, y%, número, código, nombre]
  const hotspotsPorCategoria = {
    ".filter-trompa": [
      [
      80,
      31,
      "1",
      "a2599",
      "Retenedor"
    ],
    [
      62,
      71,
      "2",
      "c6908",
      "Perno de retenedor"
    ]
    ],
    '.filter-cilindro': [
      [50, 30, "11", "e393x", "Cilindro estándar"],
      [70, 40, "16", "b2334", "Pistón"],
      [30, 60, "15", "c1517", "Buje del pistón"]
    ],
    '.filter-cabezal': [
      [45, 25, "27", "a660", "Cabezal"],
      [65, 40, "10", "c1512", "Tuerca chuck"],
      [25, 60, "8", "b1178", "Buje de rotación"]
    ],
    '.filter-maneral': [
      [40, 30, "69", "a697b", "Maneral"],
      [60, 50, "87", "a693a", "Horquilla"]
    ],
    '.filter-barra': [
      [50, 40, "22", "b5053", "Barra de rotación"],
      [25, 60, "26", "b1170", "Trinquete"]
    ],
    '.filter-lubricadora': [
      [40, 45, "49", "936658", "Válvula de control de agua"]
    ]
  };

  // Mostrar solo el loader local
  if (isotopeLoader) isotopeLoader.style.display = 'block';

  // Ocultar productos inicialmente
  container.style.visibility = 'hidden';

  const iso = new Isotope(container, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  // Función para crear y mostrar hotspots según la categoría seleccionada
  function mostrarHotspots(filtro) {
    if (!hotspotsContainer) return;
    
    // Limpiar hotspots anteriores de manera más eficiente
    while (hotspotsContainer.firstChild) {
      hotspotsContainer.removeChild(hotspotsContainer.firstChild);
    }
    
    const hotspots = hotspotsPorCategoria[filtro] || [];
    const fragment = document.createDocumentFragment();
    
    hotspots.forEach(([x, y, numero, codigo, nombre]) => {
      // Crear el punto interactivo
      const hotspot = document.createElement('div');
      hotspot.className = 'img-hotspot';
      hotspot.style.left = `${x}%`;
      hotspot.style.top = `${y}%`;
      hotspot.textContent = numero;
      
      // Crear el tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'img-tooltip';
      tooltip.style.left = `${x}%`;
      tooltip.style.top = `${y + 5}%`;
      tooltip.innerHTML = `
        <strong>${codigo.toUpperCase()}</strong>
        ${nombre}
      `;
      
      fragment.appendChild(hotspot);
      fragment.appendChild(tooltip);
    });
    
    hotspotsContainer.appendChild(fragment);
  }

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
      
      // Lista de categorías principales que queremos mostrar
      const categoriasPrincipales = ['filter-trompa', 'filter-cilindro', 'filter-cabezal', 'filter-maneral', 'filter-barra', 'filter-lubricadora'];
      
      // Define el primer filtro como activo inicialmente
      let primerFiltro = true;
      
      // Muestra sólo las categorías principales y en el orden deseado
      categoriasPrincipales.forEach(claseFiltro => {
        const li = document.createElement('li');
        li.setAttribute('data-filter', `.${claseFiltro}`);
        
        // El primer elemento será el activo por defecto
        if (primerFiltro) {
          li.className = 'filter-active';
          primerFiltro = false;
          
          // Establece la imagen inicial según el primer filtro
          if (categoriaImagen) {
            categoriaImagen.src = imagenesCategorias[`.${claseFiltro}`];
            const nombreParte = categoriaImagen.src.split('/').pop().replace('.webp', '');
            categoriaImagen.alt = `Parte ${nombreParte} de la perforadora`;
          }
          
          // Mostrar hotspots iniciales
          mostrarHotspots(`.${claseFiltro}`);
          
          // Aplicar el filtro inicial
          setTimeout(() => {
            iso.arrange({ filter: `.${claseFiltro}` });
          }, 100);
        }
        
        li.textContent = claseFiltro
          .replace('filter-', '')
          .replace(/-/g, ' ')
          .replace(/^./, l => l.toUpperCase());
        
        filtrosContainer.appendChild(li);
      });

      GLightbox({ selector: '.glightbox' });
      iso.appended(nuevos);

      // Esperar carga de imágenes
      imagesLoaded(container, () => {
        iso.arrange();
        container.style.visibility = 'visible';
        if (isotopeLoader) isotopeLoader.remove();
      });

      filtrosContainer.querySelectorAll('li').forEach(btn => {
        btn.addEventListener('click', () => {
          // Actualizar clase activa
          filtrosContainer.querySelectorAll('li').forEach(b => b.classList.remove('filter-active'));
          btn.classList.add('filter-active');
          
          // Aplicar filtro al isotope
          const filtro = btn.getAttribute('data-filter');
          iso.arrange({ filter: filtro });
          
          // Cambiar la imagen principal según el filtro seleccionado
          if (categoriaImagen) {
            const imagenRuta = imagenesCategorias[filtro] || imagenesCategorias['.filter-trompa'];
            categoriaImagen.src = imagenRuta;
            
            // Extraer el nombre de la parte desde la URL para el texto alt
            const nombreParte = imagenRuta.split('/').pop().replace('.webp', '');
            categoriaImagen.alt = `Parte ${nombreParte} de la perforadora`;
            
            // Actualizar hotspots según el filtro seleccionado
            mostrarHotspots(filtro);
          }
        });
      });
    });
});