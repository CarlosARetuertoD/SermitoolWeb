// === Modal de Cotización Dinámico con EmailJS ===
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("qPGTUXDM_4qvuKAEx"); // tu public key
  } else {
    console.warn("EmailJS no está cargado. Asegúrate de incluir email.min.js en el HTML.");
  }
})();

window.abrirCotizacion = async function (productoNombre) {
  let modal = document.getElementById("quoteModal");

  if (!modal) {
    try {
      const res = await fetch("/partials/modal-cotizacion.html");
      const html = await res.text();
      const temp = document.createElement("div");
      temp.innerHTML = html;
      document.body.appendChild(temp.firstElementChild);

      modal = document.getElementById("quoteModal");

      const closeBtn = modal.querySelector(".close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.remove());
      }

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });

      const form = modal.querySelector("#cotizacion-form");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const statusDiv = document.getElementById("form-status");
          if (statusDiv) {
            statusDiv.style.display = "none";
            statusDiv.innerHTML = "";
          }

          if (typeof emailjs === "undefined") {
            alert("EmailJS no está disponible. Verifica configuración.");
            return;
          }

          emailjs.sendForm("service_0d5vqz9", "template_rs7c5pi", this)
            .then(() => {
              form.reset();
              if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.innerHTML = "¡Solicitud de Cotización enviada con éxito!";
                statusDiv.style.color = "#155724";
                statusDiv.style.backgroundColor = "#d4edda";
                statusDiv.style.border = "1px solid #c3e6cb";
                statusDiv.style.padding = "10px";
                statusDiv.style.borderRadius = "4px";
                statusDiv.style.marginTop = "1rem";
              }
              cerrarModal();
            })
            .catch((error) => {
              if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.innerHTML = "❌ Hubo un error al enviar. Intenta nuevamente.";
                statusDiv.style.color = "#721c24";
                statusDiv.style.backgroundColor = "#f8d7da";
                statusDiv.style.border = "1px solid #f5c6cb";
                statusDiv.style.padding = "10px";
                statusDiv.style.borderRadius = "4px";
                statusDiv.style.marginTop = "1rem";
              }
            });
        });
      }
    } catch (err) {
      console.error("Error al cargar el modal:", err);
      return;
    }
  }

  const inputProducto = document.getElementById("product-input");
  if (inputProducto) inputProducto.value = productoNombre;

  modal.classList.add("show");
  document.body.classList.add("modal-open");
};

window.cerrarModal = function () {
  const modal = document.getElementById("quoteModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
};
