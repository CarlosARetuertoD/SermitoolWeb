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
    
    // Para páginas normales
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
    
    // Para la página de manual de partes (replacements-page)
    if (selectBody.classList.contains("replacements-page")) {
      window.scrollY > 50
        ? selectHeader.classList.add("scrolled")
        : selectHeader.classList.remove("scrolled");
    }
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

  // Función para forzar la activación de AOS en elementos específicos
  function forceAOSRefresh() {
    // Buscar elementos con AOS que puedan estar fuera del viewport
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
      // Forzar el refresh de AOS para este elemento
      AOS.refresh();
    });
  }

  // Función específica para activar la sección del catálogo
  function activateCatalogSection() {
    const catalogSection = document.querySelector('.catalogo');
    if (catalogSection) {
      // Remover clases AOS existentes y volver a agregarlas
      const aosElements = catalogSection.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        element.classList.remove('aos-animate');
        // Forzar la activación inmediata
        setTimeout(() => {
          element.classList.add('aos-animate');
        }, 50);
      });
    }
  }

  window.addEventListener("load", aosInit);

  // Listener adicional para asegurar que el catálogo se active
  window.addEventListener("resize", () => {
    setTimeout(() => {
      activateCatalogSection();
    }, 200);
  });

  // Listener para scroll que active el catálogo si está visible
  window.addEventListener("scroll", () => {
    const catalogSection = document.querySelector('.catalogo');
    if (catalogSection) {
      const rect = catalogSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        activateCatalogSection();
      }
    }
  });

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
            // Forzar refresh de AOS después de cambiar filtros
            setTimeout(() => {
              forceAOSRefresh();
              activateCatalogSection();
            }, 100);
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
        .then((html) => {
          // Detectar si estamos en la carpeta products/
          const isInProductsFolder = window.location.pathname.includes('/products/');
          
          if (isInProductsFolder) {
            // Ajustar las rutas relativas agregando ../
            html = html
              .replace(/href="index\.html"/g, 'href="../index.html"')
              .replace(/src="assets\//g, 'src="../assets/')
              .replace(/href="politica-privacidad\.html"/g, 'href="../politica-privacidad.html"');
          }
          
          footerPlaceholder.outerHTML = html;
        })
        .catch((err) => console.error("Error cargando footer:", err));
    }
  });

// BTN WHATSAPP
document.addEventListener('DOMContentLoaded', function () {
  const botonWhatsapp = document.getElementById('boton-flotante-whatsapp');
  const botonCta = document.getElementById('boton-cta-whatsapp');
  const botonHero = document.getElementById('boton-hero-whatsapp');
  function configurarBotonWhatsApp(boton, producto) {
    if (boton) {
      boton.addEventListener('click', function (e) {
        e.preventDefault(); 

        const numero = '51942057470';
        const mensaje = producto
          ? `Hola, quisiera cotizar el ${producto}.`
          : `Hola, estoy interesado en obtener más información sobre sus productos.`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
      });
    }
  }
  // Configurar botón del Hero
  configurarBotonWhatsApp(botonHero, null);
  
  // Configurar botón del Flotante
  configurarBotonWhatsApp(botonWhatsapp, botonWhatsapp?.getAttribute('data-producto'));
  
  // Configurar botón del CTA
  configurarBotonWhatsApp(botonCta, null);
});

// SCRIPT PARA OCULTAR BOTONES DE NAVEGACION EN GOOGLE
  const observer = new MutationObserver(() => {
    const nextBtn = document.querySelector('.gnext');
    const prevBtn = document.querySelector('.gprev');

    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();