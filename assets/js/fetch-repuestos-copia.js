document.addEventListener('DOMContentLoaded', () => {
  const categoriaImagen = document.getElementById('categoria-imagen');
  const hotspotsContainer = document.getElementById('hotspots-container');
  const repuestoContainer = document.getElementById('repuesto-container');
  const mainContent = document.querySelector('.main-content');
  const imgTooltipContainer = document.querySelector('.img-tooltip-container');
  const botonesContainer = document.querySelector('.portfolio-filters');
  let repuestosData = null;

  console.log('Contenedores encontrados:', {
    categoriaImagen: !!categoriaImagen,
    hotspotsContainer: !!hotspotsContainer,
    repuestoContainer: !!repuestoContainer
  });

  // Función para mostrar todos los elementos
  function mostrarElementos() {
    // Esperar un poco más antes de mostrar los elementos
    setTimeout(() => {
      if (botonesContainer) botonesContainer.classList.add('visible');
      if (imgTooltipContainer) imgTooltipContainer.classList.add('visible');
    }, 300);
  }

  // Mapeo de categorías a imágenes
  const imagenesCategorias = {
    'trompa': '/assets/img/products/jackleg-s250/partes/trompa.webp',
    'cilindro': '/assets/img/products/jackleg-s250/partes/cilindro.webp',
    'cabezal': '/assets/img/products/jackleg-s250/partes/cabezal.webp',
    'maneral': '/assets/img/products/jackleg-s250/partes/maneral.webp',
    'barra': '/assets/img/products/jackleg-s250/partes/barra.webp',
    'lubricadora': '/assets/img/products/jackleg-s250/partes/lubricadora.webp'
  };

  // Definir puntos de interés (hotspots) para cada categoría
  const hotspotsPorCategoria = {
    "trompa": [
      [80, 31, "1", "a2599", "Retenedor"],
      [62, 71, "2", "c6908", "Perno de retenedor"]
    ],
    'cilindro': [
      [50, 30, "11", "e393x", "Cilindro estándar"],
      [70, 40, "16", "b2334", "Pistón"],
      [30, 60, "15", "c1517", "Buje del pistón"]
    ],
    'cabezal': [
      [45, 25, "27", "a660", "Cabezal"],
      [65, 40, "10", "c1512", "Tuerca chuck"],
      [25, 60, "8", "b1178", "Buje de rotación"]
    ],
    'maneral': [
      [40, 30, "69", "a697b", "Maneral"],
      [60, 50, "87", "a693a", "Horquilla"]
    ],
    'barra': [
      [50, 40, "22", "b5053", "Barra de rotación"],
      [25, 60, "26", "b1170", "Trinquete"]
    ],
    'lubricadora': [
      [40, 45, "49", "936658", "Válvula de control de agua"]
    ]
  };

  // Cargar datos de repuestos
  fetch('/assets/json/partes-jackleg-s250.json')
    .then(res => res.json())
    .then(data => {
      console.log('Datos cargados:', data);
      repuestosData = data;
      // Mostrar elementos después de cargar los datos
      mostrarElementos();
    })
    .catch(error => {
      console.error('Error cargando repuestos:', error);
    });

  // Función para crear y mostrar hotspots según la categoría seleccionada
  function mostrarHotspots(categoria) {
    if (!hotspotsContainer) {
      console.error('No se encontró el contenedor de hotspots');
      return;
    }
    
    // Limpiar hotspots anteriores
    while (hotspotsContainer.firstChild) {
      hotspotsContainer.removeChild(hotspotsContainer.firstChild);
    }
    
    const hotspots = hotspotsPorCategoria[categoria] || [];
    console.log('Mostrando hotspots para categoría:', categoria, hotspots);
    const fragment = document.createDocumentFragment();
    
    hotspots.forEach(([x, y, numero, codigo, nombre]) => {
      const hotspot = document.createElement('div');
      hotspot.className = 'img-hotspot';
      hotspot.style.left = `${x}%`;
      hotspot.style.top = `${y}%`;
      hotspot.textContent = numero;
      hotspot.setAttribute('data-codigo', codigo);
      hotspot.setAttribute('title', `${codigo.toUpperCase()} - ${nombre}`);
      
      const tooltip = document.createElement('div');
      tooltip.className = 'img-tooltip';
      tooltip.style.left = `${x}%`;
      tooltip.style.top = `${y + 5}%`;
      tooltip.innerHTML = `
        <strong>${codigo.toUpperCase()}</strong>
        ${nombre}
      `;
      
      // Agregar eventos al hotspot
      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hotspot clickeado:', codigo);
        mostrarRepuesto(codigo);
      };

      // Usar tanto click como touchstart para mejor compatibilidad
      hotspot.addEventListener('click', handleClick);
      hotspot.addEventListener('touchstart', handleClick, { passive: false });
      
      // Agregar efecto hover con delay para evitar clicks accidentales
      let clickTimeout;
      hotspot.addEventListener('mouseenter', () => {
        clickTimeout = setTimeout(() => {
          hotspot.style.transform = 'translate(-50%, -50%) scale(1.2)';
        }, 100);
      });
      
      hotspot.addEventListener('mouseleave', () => {
        clearTimeout(clickTimeout);
        hotspot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
      
      fragment.appendChild(hotspot);
      fragment.appendChild(tooltip);
    });
    
    hotspotsContainer.appendChild(fragment);
  }

  // Función para mostrar el mensaje por defecto
  function mostrarMensajePorDefecto() {
    if (!repuestoContainer) {
      console.error('No se encontró el contenedor de repuestos');
      return;
    }
    repuestoContainer.innerHTML = `
      <div class="default-message">
        Selecciona una parte para ver más información
      </div>
    `;
    if (mainContent) {
      mainContent.classList.add('initial-state');
    }
  }

  // Función para mostrar el repuesto seleccionado
  function mostrarRepuesto(codigo) {
    if (!repuestoContainer) {
      console.error('No se encontró el contenedor de repuestos');
      return;
    }
    if (!repuestosData) {
      console.error('Los datos de repuestos no están cargados');
      return;
    }

    console.log('Buscando repuesto con código:', codigo);
    const repuesto = repuestosData.find(r => r.id.toLowerCase() === codigo.toLowerCase());
    console.log('Repuesto encontrado:', repuesto);
    
    if (repuesto) {
      const imagen = repuesto.imagen_zoom || repuesto.imagen;
      
      repuestoContainer.innerHTML = `
        <div class="repuesto-info">
          <h3>${repuesto.id.toUpperCase()}</h3>
          <h4>${repuesto.nombre}</h4>
          ${imagen ? 
            `<img src="${imagen}" alt="${repuesto.nombre}" class="img-fluid">` : 
            `<div class="no-image">Imagen no disponible</div>`
          }
        </div>
      `;

      // Remover estado inicial y agregar clase visible
      if (mainContent) {
        mainContent.classList.remove('initial-state');
      }
      setTimeout(() => {
        const repuestoInfo = repuestoContainer.querySelector('.repuesto-info');
        if (repuestoInfo) {
          repuestoInfo.classList.add('visible');
        }
      }, 50);
    } else {
      console.log('No se encontró el repuesto');
      mostrarMensajePorDefecto();
    }
  }

  // Crear botones para cada categoría
  if (botonesContainer) {
    botonesContainer.innerHTML = '';
    
    Object.keys(imagenesCategorias).forEach(categoria => {
      const li = document.createElement('li');
      li.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      
      li.addEventListener('click', () => {
        // Actualizar clase activa
        botonesContainer.querySelectorAll('li').forEach(b => b.classList.remove('filter-active'));
        li.classList.add('filter-active');
        
        // Cambiar imagen
        if (categoriaImagen) {
          categoriaImagen.src = imagenesCategorias[categoria];
          categoriaImagen.alt = `Parte ${categoria} de la perforadora`;
        }
        
        // Mostrar hotspots
        mostrarHotspots(categoria);
        
        // Mostrar mensaje por defecto
        mostrarMensajePorDefecto();
      });
      
      botonesContainer.appendChild(li);
    });

    // Activar el primer botón por defecto
    const primerBoton = botonesContainer.querySelector('li');
    if (primerBoton) {
      primerBoton.click();
    }
  } else {
    console.error('No se encontró el contenedor de botones');
  }

  // Mostrar mensaje por defecto al cargar la página
  mostrarMensajePorDefecto();
});