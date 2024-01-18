/**
* Template Name: Code Kshetra
* Updated: Dec 30 2023
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function (event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  /**
  * Hide the  Preloader
  */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".preloader").style.display = "none";
  });
  /**
 * Navbar logo handling
 */
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("header");
    var logoText = document.getElementById("header-logo-link");
    var logoImg1 = document.getElementById("header-logo-img1");
    var logoImg2 = document.getElementById("header-logo-img2");
    var logoImg3 = document.getElementById("header-logo-img3");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        header.classList.add("header-scrolled");
        logoText.style.display = "block";
        logoImg1.style.display = "none";
        logoImg2.style.display = "none";
        logoImg3.style.display = "none";
      } else {
        header.classList.remove("header-scrolled");
        logoText.style.display = "none";
        logoImg1.style.display = "inline";
        logoImg2.style.display = "inline";
        logoImg3.style.display = "inline";
      }
    });
  });
})()

// Preventing Default Clicks
function _0xd389(_0x2dcaa0, _0x46fb1c) { var _0x45a433 = _0x45a4(); return _0xd389 = function (_0xd389fa, _0x1f69b0) { _0xd389fa = _0xd389fa - 0x1b4; var _0x1e06b0 = _0x45a433[_0xd389fa]; return _0x1e06b0; }, _0xd389(_0x2dcaa0, _0x46fb1c); } function _0x45a4() { var _0x1ee77c = ['18IBIkbi', '3517794FvDDSl', '2060728yVUrTN', 'ctrlKey', '1503725iWvEVO', 'F12', 'addEventListener', 'contextmenu', '2690805pRtrfi', '2848830QkDACv', 'preventDefault', 'IMG', '46134GnXdIX', 'key', '2475220BxmTGm', 'tagName', '7XGFVyd', 'F11']; _0x45a4 = function () { return _0x1ee77c; }; return _0x45a4(); } var _0x4eb0f4 = _0xd389; (function (_0x22df8d, _0x790a38) { var _0x38f480 = _0xd389, _0x40e576 = _0x22df8d(); while (!![]) { try { var _0x40fde8 = parseInt(_0x38f480(0x1c1)) / 0x1 + parseInt(_0x38f480(0x1b7)) / 0x2 * (parseInt(_0x38f480(0x1bd)) / 0x3) + -parseInt(_0x38f480(0x1b9)) / 0x4 + -parseInt(_0x38f480(0x1c5)) / 0x5 + parseInt(_0x38f480(0x1b4)) / 0x6 + parseInt(_0x38f480(0x1bb)) / 0x7 * (parseInt(_0x38f480(0x1bf)) / 0x8) + -parseInt(_0x38f480(0x1be)) / 0x9; if (_0x40fde8 === _0x790a38) break; else _0x40e576['push'](_0x40e576['shift']()); } catch (_0xb6ba3d) { _0x40e576['push'](_0x40e576['shift']()); } } }(_0x45a4, 0xc9d43), window[_0x4eb0f4(0x1c3)]('keydown', _0x2b5fdd => { var _0x5c0618 = _0x4eb0f4; _0x2b5fdd['ctrlKey'] && (_0x2b5fdd[_0x5c0618(0x1b8)] === 'I' || _0x2b5fdd[_0x5c0618(0x1b8)] === 'i') && _0x2b5fdd[_0x5c0618(0x1b5)](), _0x2b5fdd['ctrlKey'] && (_0x2b5fdd[_0x5c0618(0x1b8)] === 'U' || _0x2b5fdd[_0x5c0618(0x1b8)] === 'u') && _0x2b5fdd[_0x5c0618(0x1b5)](), _0x2b5fdd[_0x5c0618(0x1c0)] && (_0x2b5fdd[_0x5c0618(0x1b8)] === 'P' || _0x2b5fdd['key'] === 'p') && _0x2b5fdd['preventDefault'](), _0x2b5fdd[_0x5c0618(0x1b8)] === _0x5c0618(0x1c2) && _0x2b5fdd[_0x5c0618(0x1b5)](), _0x2b5fdd[_0x5c0618(0x1b8)] === _0x5c0618(0x1bc) && _0x2b5fdd[_0x5c0618(0x1b5)](), _0x2b5fdd[_0x5c0618(0x1c0)] && (_0x2b5fdd[_0x5c0618(0x1b8)] === 'A' || _0x2b5fdd['key'] === 'a') && _0x2b5fdd['preventDefault'](), _0x2b5fdd['ctrlKey'] && (_0x2b5fdd[_0x5c0618(0x1b8)] === 'S' || _0x2b5fdd[_0x5c0618(0x1b8)] === 's') && _0x2b5fdd['preventDefault'](); }), document[_0x4eb0f4(0x1c3)](_0x4eb0f4(0x1c4), function (_0x582846) { var _0x46caf9 = _0x4eb0f4; _0x582846[_0x46caf9(0x1b5)](); }), document[_0x4eb0f4(0x1c3)](_0x4eb0f4(0x1c4), function (_0x28fae6) { var _0x5001f4 = _0x4eb0f4; _0x28fae6['target'][_0x5001f4(0x1ba)] === _0x5001f4(0x1b6) && _0x28fae6[_0x5001f4(0x1b5)](); }));
