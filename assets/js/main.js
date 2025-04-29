(function() {
  "use strict";

  // ============ FUNCIONES PRINCIPALES ============
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }

  function toggleScrollTop() {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
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

  function setupModalCotizacion() {
    const openBtn = document.getElementById('openModal');
    if (openBtn) {
      openBtn.addEventListener('click', async () => {
        let modal = document.getElementById('quoteModal');
        const producto = openBtn.dataset.producto || 'Producto';

        if (!modal) {
          try {
            const res = await fetch('/partials/modal-cotizacion.html');
            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;
            document.body.appendChild(temp.firstElementChild);

            modal = document.getElementById('quoteModal');
            const textarea = modal.querySelector('textarea[name="message"]');
            if (textarea) textarea.value = `Quisiera cotización del producto ${producto}`;
            const subject = modal.querySelector('input[name="_subject"]');
            if (subject) subject.value = `Solicitud de Cotización - ${producto}`;

            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

          } catch (err) {
            console.error('Error al cargar el modal:', err);
          }
        }
      });
    }
  }

  function initScriptsAfterHeaderFooter() {
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }

    window.addEventListener('load', aosInit);
    window.addEventListener('load', initSwiper);

    GLightbox({ selector: '.glightbox' });

    new PureCounter();
    setupModalCotizacion();
  }

  // ============ FETCH HEADER Y FOOTER ============
  document.addEventListener('DOMContentLoaded', () => {
    const fetches = [];
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      const headerFetch = fetch('/partials/header.html')
        .then(res => res.ok ? res.text() : Promise.reject(res.status))
        .then(html => headerPlaceholder.outerHTML = html)
        .catch(err => console.error('Error cargando header:', err));
      fetches.push(headerFetch);
    }
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      const footerFetch = fetch('/partials/footer.html')
        .then(res => res.ok ? res.text() : Promise.reject(res.status))
        .then(html => footerPlaceholder.outerHTML = html)
        .catch(err => console.error('Error cargando footer:', err));
      fetches.push(footerFetch);
    }
    
    Promise.all(fetches).then(() => {
      initScriptsAfterHeaderFooter();
    });
  });

})();
