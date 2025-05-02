// FETCH DE REPUESTOS
document.addEventListener('DOMContentLoaded', () => {
  const isotopeInstance = new Isotope('.isotope-container', {
    itemSelector: '.portfolio-item',
    layoutMode: 'masonry'
  });

  fetch('/repuestos.json')
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById('contenedor-repuestos');
      
      if (!contenedor) {
        console.warn("⚠ No se encontró el elemento con id 'contenedor-repuestos'. Verifica que exista en tu HTML.");
        return;
      }

      const nuevosItems = [];

      data.forEach(repuesto => {
        const temp = document.createElement('div');
        temp.innerHTML = `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-repuestos">
            <div class="portfolio-content h-100">
              <img src="${repuesto.imagen}" class="img-fluid" alt="${repuesto.nombre}">
              <div class="portfolio-info">
                <h4>${repuesto.id.toUpperCase()}</h4>
                <p>${repuesto.nombre}</p>
                <a href="${repuesto.imagen}" class="glightbox preview-link" title="Vista rápida">
                  <i class="bi bi-zoom-in"></i>
                </a>
                <a href="repuesto.html?id=${repuesto.id}" class="details-link" title="Ver más">
                  <i class="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
          </div>
        `;
        const elemento = temp.firstElementChild;
        contenedor.appendChild(elemento);
        nuevosItems.push(elemento);
      });

      // Re-inicializar Glightbox
      GLightbox({ selector: '.glightbox' });

      // Registrar nuevos ítems en Isotope
      isotopeInstance.insert(nuevosItems);
    })
    .catch(error => console.error("❌ Error cargando repuestos:", error));
});