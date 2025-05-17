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
      [80,31,"1","a2599","Retenedor"],
      [62,71,"2","c6908","Perno de retenedor"],
      [52,29,"3","128112uf-d1932","Tuerca de retenedor"],
      [55,37,"4","d6205","Buje del freno (hule)"],
      [49,61,"4","d6205","Buje del freno (hule)"],
      [45,38,"5","a2598a","Trompa"],
      [41,39,"6","snb500","Junta de cobre"],
      [65,39,"7","c1418a","Bocina hexagonal 7/8''"],
      [33,40,"8","b1178","Buje de rotacion"],
      [22,40,"9","c1516","Espaciador Tuerca"],
      [17,40,"10","c1512","Tuerca chuck"],
    ],
    ".filter-cilindro": [
      [67, 45, "11", "e393x", "Cilindro estandar"],
      [83, 48, "12", "c1523", "Buje de soporte"],
      [69, 67, "13", "d8345", "Tapon"],
      [63, 45, "14", "d1390", "Casquillo"],
      [56, 45, "15", "c1517", "Buje del piston"],
      [49, 45, "16", "b2334", "Piston"],
      [45, 45, "17", "c1508", "Tuerca de rifle"],
      [40, 45, "18", "a744", "Tapa de valvula"],
      [35, 45, "19", "c1648", "Valvula automatica"],
      [31, 64, "20", "a745", "Caja de valvula"],
      [30, 45, "21", "s2128", "Perno de caja de valvula"],
      [25, 61, "22", "b5053", "Barra de rotacion"],
      [12, 65, "23", "d6177", "Aleta reversible"],
      [19, 64, "24", "s2134", "Perno de aleta"],
      [18, 59, "25", "d1611c", "Resorte de aleta"],
      [63, 33, "87", "a693a", "Horquilla"],
      [66, 26, "88", "d1982", "Tuerca del pivote"],
      [78, 32, "89", "b1182a", "Pivote"],
      [80, 37, "90", "d1398", "Cono de pivote"],
      [70, 42, "91", "30066", "Pasador de pivote"],
      [82, 43, "92", "d1426", "Cuña"],
      [89, 67, "93", "d1392", "Arandela"],
      [90, 72, "94", "c1571", "Resorte"],
      [91, 76, "95", "c1519", "Arandela de seguridad pivote"],
      [93, 80, "96", "c1527", "Tuerca del pivote"],
      [88, 63, "55", "164231-16439003", "Anillo"],
      [72, 46, "92", "d1426", "Cuña"],
      [10, 46, "24", "s2134", "Perno de aleta"],
      [14, 42, "23", "d6177", "Aleta reversible"],
      [20, 50, "25", "d1611c", "Resorte de aleta"]
    ],
    ".filter-cabezal": [
      [48,41,"26","b1170","Trinquete"],
      [44,38,"27","a660","Cabezal"],
      [46,51,"28","b1176","Valvula de estrangulacion"],
      [48,28,"29","c1509","Palanca de valvula"],
      [42,30,"30","d1384","Cuña de valvula"],
      [42,25,"31","149163mt","Arandela"],
      [38,24,"32","d1385","Tuerca"],
      [43,69,"33","c1526","Tuerca de codo de aire"],
      [49,59,"34","d1601","Arandela"],
      [47,55,"35","164731-1648114","Oring"],
      [52,61,"36","c1525n","Codo de aire"],
      [55,62,"37","1356288a","Conector de entrada"],
      [58,62,"38","164999","Oring"],
      [57,73,"39","s355538a","Filtro de aire"],
      [62,62,"40","l05","Conexión de aire bushing"],
      [79,79,"41A","c1809","Codo de agua (roscado)"],
      [70,88,"42","s2141","Tuerca de codo entrada de agua"],
      [76,76,"43","s48f1w","Arandela"],
      [68,83,"44","164811-1646503","Oring"],
      [75,72,"45","s2487","Arandela"],
      [66,78,"46","d1402","Empaque de codo de agua"],
      [66,73,"47","c1272","Filtro"],
      [75,94,"48","d2441","Conector (adaptador)"],
      [40,58,"51","d1383","Perno de valvula de estrangulacion"],
      [34,53,"52","d1382","Resorte de perno"],
      [35,61,"53","2422p","Tapon de allen"],
      [46,44,"54","c1574a","Tubo de agua"],
      [35,45,"55","164231-16439003","Anillo"],
      [25,53,"56","d1675","Empaque del tubo de agua"],
      [24,42,"57","d1674","Espaciador"],
      [21,42,"58","c2144","Reten del asiento"],
      [21,53,"59","d1673","Empaque"],
      [15,42,"60","b11181pc4","Glandula de agua"],
      [14,53,"61","164301-1648102","Oring"],
      [11,42,"62","c1522pc1","Valvula de paso"],
      [8,42,"64","d1406","Resorte de valvula"],
      [5,42,"65","c1521pc1","Reten del resorte"],
      [3,53,"66","20029mn","Seguro"],
      [76,58,"67","c1572c","Tornillo lateral"],
      [87,72,"68","d1388","Tuerca de tornillo lateral"],
      [6,53,"55","164231-16439003","Anillo"],
      [79,23,"67","c1572c","Tornillo lateral"],
      [83,46,"68","d1388","Tuerca de tornillo lateral"],
      [44,80,"44","164811-1646503","Oring"],
      [18,42,"55","164231-16439003","Anillo (6)"],
      [10,53,"63","164999, 16452-1645704","Oring"]
    ],
    ".filter-maneral": [
      [43, 59, "69", "a697b", "Maneral"],
      [56, 28, "70", "d1454d", "Tuerca de maneral domo"],
      [46, 84, "72", "145m30", "Arandela de seguridad"],
      [46, 90, "73", "d8247", "Tuerca de cuerpo de valvula"],
      [56, 69, "74", "c1514-1515", "Válvula retráctil"],
      [66, 79, "76", "d1424", "Resorte interno de valvula"],
      [70, 82, "77", "d1425", "Resorte exterior de camisa"],
      [73, 85, "78", "d1427", "Tapon allen de valvula"],
      [44, 70, "79", "b1183b", "Valvula"],
      [43, 52, "80", "b1180b", "Cuerpo de la valvula"],
      [50, 35, "81", "164631", "Empaque de cuerpo de valvula"],
      [49, 27, "82", "c1518", "Manija giratoria"],
      [41, 27, "83", "30088", "Pasador de fijacion corto"],
      [41, 21, "84", "300822", "Pasador de fijacion largo"],
      [49, 22, "85", "149122mt", "Arandela de seguridad"],
      [44, 18, "86", "d1218uf-d1684", "Tuerca de valvula"],
      [63, 76, "44", "164811-1646503", "Oring"],
      [60, 73, "75", "c1514-1515", "Camisa de válvula retractil"],
      [45, 79, "44", "164811-1646503", "Oring"],
      [52, 20, "71", "71", "Desconocido"]
    ],
    '.filter-barra': [
      [92,28,"97","164531-1646014","Anillo"],
      [88,28,"98","b1851a","Feed piston 51"],
      [85,28,"99","c1520","Tuerca adaptadora"],
      [81,28,"100","1973854a","Empaque doble reborde"],
      [78,28,"101","d1069","Buje de la tapa superior"],
      [72,28,"102","b1287","Tapa superior"],
      [67,28,"103","1973854","Empaque"],
      [54,23,"104","b1308","Agarradera"],
      [56,44,"105","1026w12","Tornillo"],
      [48,30,"106","143m10","Arandela"],
      [50,25,"107","1216w","Tuerca"],
      [40,30,"108","sb1851rk1","Tubo de plastico con casquillos y oring"],
      [26,30,"109","c1788a","Cilindro 51"],
      [69,71,"110","5601773-p134bl","Porta empaque superior"],
      [65,71,"111","9002661","Porta empaque inferior"],
      [58,60,"112","1796740","Empaque"],
      [60,60,"113","c10119","Espaciador del vástago del pistón"],
      [55,60,"114","c10120","Espaciador"],
      [52,60,"115","d2038","Arandela"],
      [51,71,"116","d1073a","Tuerca de seguridad"],
      [43,75,"117","c1791","Apoyo"],
      [31,71,"118","c1672","Perno de apoyo"],
      [63,60,"112","1796740","Empaque"]
    ],
    '.filter-lubricadora': [
      [36,56,"49","936658","Válvula de control de agua"],
      [27,56,"50","76001","Conexión de agua"],
      [60,56,"121","L07","Lubricador"],
      [69,56,"123","L06","Adaptador de Lubricador"],
      [50,56,"124","L08","Conexión de salida de lubricador"],
      [75,56,"40","lub-adap","Reductor Adaptador de lubricador"]
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