// script.js - Lightbox, Swiper, smooth scroll, nav toggle, year
document.addEventListener('DOMContentLoaded', function () {

  /* ====== year ====== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== NAV toggle for small screens ====== */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  /* ====== Smooth scroll for anchors ====== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target && target.startsWith('#')) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth <= 900 && navList) navList.style.display = 'none';
        }
      }
    });
  });

  /* ====== GALLERY LIGHTBOX (safe init) ====== */
  const galleryImgs = Array.from(document.querySelectorAll('.gallery .card img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('prev');
  const lbNext = document.getElementById('next');

  if (lb && lbImg && lbCaption) {
    let index = 0;

    function openAt(i) {
      const img = galleryImgs[i];
      if (!img) return;
      index = i;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      const card = img.closest('.card');
      const caption = card ? (card.getAttribute('data-caption') || img.alt || '') : '';
      lbCaption.textContent = caption;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function prev() {
      openAt((index - 1 + galleryImgs.length) % galleryImgs.length);
    }
    function next() {
      openAt((index + 1) % galleryImgs.length);
    }

    galleryImgs.forEach((img, i) => img.addEventListener('click', (e) => {
      e.preventDefault();
      openAt(i);
    }));

    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLb();
    });

    window.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  /* ====== Initialize Swiper sliders ====== */
  try {
    document.querySelectorAll('.kitchen-slider').forEach(sliderEl => {
      const paginationEl = sliderEl.querySelector('.swiper-pagination');
      const nextEl = sliderEl.querySelector('.slider-controls .swiper-button-next') || sliderEl.querySelector('.swiper-button-next');
      const prevEl = sliderEl.querySelector('.slider-controls .swiper-button-prev') || sliderEl.querySelector('.swiper-button-prev');

      if (sliderEl && (nextEl || prevEl)) {
        new Swiper(sliderEl, {
          loop: true,
          autoplay: { delay: 3500, disableOnInteraction: false },
          pagination: paginationEl ? { el: paginationEl, clickable: true } : undefined,
          navigation: {
            nextEl: nextEl || undefined,
            prevEl: prevEl || undefined
          },
          effect: 'slide',
        });
      }
    });
  } catch (err) {
    console.warn('Swiper init failed', err);
  }

  /* ====== Contact form progressive enhancement ====== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      setTimeout(() => alert('سيتم فتح تطبيق البريد لإرسال رسالتك — إذا لم يُفتح، يمكنك استخدام واتساب.'), 500);
    });
  }

}); // end DOMContentLoaded
