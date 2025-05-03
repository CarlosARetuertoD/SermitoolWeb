document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  fetch('/repuestos.json')
    .then(res => res.json())
    .then(data => {
      const rep = data.find(item => item.id === id);

      if (!rep) {
        document.getElementById('nombre-repuesto').textContent = 'Repuesto no encontrado';
        document.getElementById('descripcion-repuesto').textContent = 'Este repuesto no está disponible en el catálogo.';
        document.getElementById('imagen-repuesto').src = '/assets/img/default.jpg';
        return;
      }

      document.getElementById('nombre-repuesto').textContent = rep.nombre;
      document.getElementById('descripcion-repuesto').textContent = rep.descripcion || rep.nombre;
      document.getElementById('imagen-repuesto').src = rep.imagen;
      document.getElementById('imagen-repuesto').alt = rep.nombre;

      // Enlace de WhatsApp flotante con nombre del repuesto
      const nombreEncoded = encodeURIComponent(`Hola, quiero cotizar el repuesto ${rep.nombre}`);
      const whatsappBtn = document.getElementById('boton-flotante-whatsapp');
      whatsappBtn.href = `https://wa.me/51987654321?text=${nombreEncoded}`;
      whatsappBtn.setAttribute('data-producto', rep.nombre);
    });
});

