document.addEventListener('DOMContentLoaded', () => {
  // Asegurar que la página comience desde arriba
  window.scrollTo(0, 0);
  
  const categoriaImagen = document.getElementById('categoria-imagen');
  const hotspotsContainer = document.getElementById('hotspots-container');
  const repuestoContainer = document.getElementById('repuesto-container');
  const mainContent = document.querySelector('.main-content');
  const imgTooltipContainer = document.querySelector('.img-tooltip-container');
  const botonesContainer = document.querySelector('.portfolio-filters');
  const logo = document.querySelector('.logo');
  const sectionTitle = document.querySelector('.section-title');
  let repuestosData = null;

  console.log('Contenedores encontrados:', {
    categoriaImagen: !!categoriaImagen,
    hotspotsContainer: !!hotspotsContainer,
    repuestoContainer: !!repuestoContainer
  });

  // Función para mostrar todos los elementos
  function mostrarElementos() {
    // Asegurar que la página esté en la parte superior
    window.scrollTo(0, 0);
    
    // Esperar un poco más antes de mostrar los elementos
    setTimeout(() => {
      if (botonesContainer) botonesContainer.classList.add('visible');
      if (imgTooltipContainer) imgTooltipContainer.classList.add('visible');
      if (logo) logo.classList.add('visible');
      if (sectionTitle) sectionTitle.classList.add('visible');
      
      // Inicializar AOS para los elementos con data-aos
      AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        once: true
      });
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
    "cilindro": [
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
    "cabezal": [
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
    "maneral": [
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
    'barra': [
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
    'lubricadora': [
      [36,56,"49","936658","Válvula de control de agua"],
      [27,56,"50","76001","Conexión de agua"],
      [60,56,"121","L07","Lubricador"],
      [69,56,"123","L06","Adaptador de Lubricador"],
      [50,56,"124","L08","Conexión de salida de lubricador"],
      [75,56,"40","lub-adap","Reductor Adaptador de lubricador"]
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
          <h3>${repuesto.id.toUpperCase()} #${repuesto.numero_repuesto}</h3>
          <h4>${repuesto.nombre}</h4>
          ${imagen ? 
            `<img src="${imagen}" alt="${repuesto.nombre}" class="img-fluid" loading="lazy" decoding="async">` : 
            `<div class="no-image">Imagen no disponible</div>`
          }
          <a href="#" id="boton-flotante-whatsapp" class="btn btn-whatsapp" data-producto="${repuesto.id}-${repuesto.nombre}" onclick="event.preventDefault(); window.open(this.href, '_blank');">
            <i class="bi bi-whatsapp"></i> ¡Cotiza ahora!
          </a>
        </div>
      `;

      // Configurar el botón de WhatsApp
      const wsBtn = document.getElementById('boton-flotante-whatsapp');
      if (wsBtn) {
        const nombreEncoded = encodeURIComponent(`Hola, quiero cotizar el Repuesto Numero ${repuesto.numero_repuesto} - ${repuesto.id.toUpperCase()}, ${repuesto.nombre}`);
        wsBtn.href = `https://wa.me/51959301020?text=${nombreEncoded}`;
      }

      // Remover estado inicial y agregar clase visible
      if (mainContent) {
        mainContent.classList.remove('initial-state');
      }
      setTimeout(() => {
        const repuestoInfo = repuestoContainer.querySelector('.repuesto-info');
        if (repuestoInfo) {
          repuestoInfo.classList.add('visible');
          
          // Scroll automático solo cuando la información está debajo
          const infoSection = document.querySelector('.info-section');
          if (infoSection) {
            // Esperar a que el contenido se renderice
            setTimeout(() => {
              const infoRect = infoSection.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              const isInfoVisible = infoRect.top >= 0 && infoRect.bottom <= viewportHeight;
              
              // Solo hacer scroll si la información está debajo y no es completamente visible
              if (!isInfoVisible && infoRect.top > 0 && window.innerWidth <= 992) {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                });
              }
            }, 100);
          }
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
        
        // Mostrar loader
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.style.display = 'block';
          preloader.style.opacity = '1';
        }
        
        // Cambiar imagen
        if (categoriaImagen) {
          // Crear una nueva imagen para precargar
          const tempImg = new Image();
          tempImg.src = imagenesCategorias[categoria];
          
          tempImg.onload = () => {
            // Una vez que la imagen está cargada, actualizar la imagen principal
            categoriaImagen.src = imagenesCategorias[categoria];
            categoriaImagen.alt = `Parte ${categoria} de la perforadora`;
            categoriaImagen.loading = 'lazy';
            categoriaImagen.decoding = 'async';
            
            // Mostrar hotspots después de que la imagen esté cargada
            mostrarHotspots(categoria);
            
            // Ocultar loader
            if (preloader) {
              preloader.style.opacity = '0';
              setTimeout(() => {
                preloader.style.display = 'none';
              }, 600);
            }
          };
          
          tempImg.onerror = () => {
            console.error('Error al cargar la imagen:', imagenesCategorias[categoria]);
            if (preloader) {
              preloader.style.opacity = '0';
              setTimeout(() => {
                preloader.style.display = 'none';
              }, 600);
            }
          };
        }
        
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