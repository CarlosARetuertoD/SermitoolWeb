(function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) return;
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  window.addEventListener("load", aosInit);

  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  new PureCounter();
  
  //Fetch del footer
  document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      fetch("/partials/footer.html")
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((html) => (footerPlaceholder.outerHTML = html))
        .catch((err) => console.error("Error cargando footer:", err));
    }
  });

  // === Modal de Cotización Dinámico con EmailJS ===
  (function () {
    emailjs.init("qPGTUXDM_4qvuKAEx"); // tu public key
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
//BTN WHATSAPP
    document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("whatsapp-btn");
        if (btn) {
          btn.addEventListener("click", function (e) {
            e.preventDefault();

            const numero = "51940824283";
            const producto = btn.dataset.producto || "producto";
            const mensaje = `Hola, quisiera una cotización del producto ${producto}`;
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
          });
        }
      });
})();
