/**
 * Vanguard Digital Solutions
 */
(function () {
  'use strict';

  /* ──────────────────────────────────────────
     Configure your n8n webhook URL here.
     Leave empty to fall back to mailto.
     ────────────────────────────────────────── */
  var WEBHOOK_URL = '';

  /* ── Navbar scroll state ── */
  function initNavbar() {
    var nav = document.getElementById('navbar');
    if (!nav) return;

    function update() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── Mobile navigation ── */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    function setNav(open) {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setNav(!links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 640) setNav(false);
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ── */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('active'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── FAQ accordion (single open) ── */
  function initFaq() {
    var items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ── Contact form validation + submission ── */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var submitBtn = document.getElementById('submitBtn');
    var successEl = document.getElementById('formSuccess');
    var errorBanner = document.getElementById('formError');
    var phoneInput = form.querySelector('#phone');

    /* Phone input: allow only digits and formatting chars */
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        phoneInput.value = phoneInput.value.replace(/[^\d+\s()\-]/g, '').slice(0, 16);
      });
    }

    /* Australian phone validation */
    function isValidPhone(raw) {
      var cleaned = raw.replace(/[\s\-()+]/g, '');
      return /^(\+?61|0)[2-478]\d{8}$/.test(cleaned) ||
             /^(\+?61|0)4\d{8}$/.test(cleaned);
    }

    /* Clear field errors on input */
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = field.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot check */
      var honey = form.querySelector('input[name="website"]');
      if (honey && honey.value) return;

      /* Validate required fields */
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var group = field.closest('.form-group');
        if (!group) return;
        var value = field.value.trim();

        if (!value) {
          group.classList.add('error');
          valid = false;
          return;
        }

        if (field.name === 'phone' && !isValidPhone(value)) {
          group.classList.add('error');
          valid = false;
          return;
        }

        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          group.classList.add('error');
          valid = false;
          return;
        }

        group.classList.remove('error');
      });

      if (!valid) return;

      /* Gather form data */
      var data = {};
      new FormData(form).forEach(function (val, key) { data[key] = val; });
      delete data.website;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';
      if (errorBanner) errorBanner.classList.remove('show');

      /* Submit via webhook or mailto fallback */
      if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(function (res) {
          if (!res.ok) throw new Error('Submission failed');
          showSuccess();
        })
        .catch(function () {
          if (errorBanner) errorBanner.classList.add('show');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Enquiry';
        });
      } else {
        /* Mailto fallback */
        var subject = encodeURIComponent('Website Enquiry - ' + data.full_name);
        var body = encodeURIComponent(
          'Name: ' + data.full_name +
          '\nEmail: ' + data.email +
          '\nPhone: ' + data.phone +
          '\nService: ' + data.service +
          '\n\nMessage:\n' + (data.message || 'Not provided')
        );
        window.location.href = 'mailto:hello@vanguarddigital.com.au?subject=' + subject + '&body=' + body;
        showSuccess();
      }

      function showSuccess() {
        form.reset();
        /* Hide form fields, show success message */
        Array.from(form.children).forEach(function (child) {
          if (child.id !== 'formSuccess') child.style.display = 'none';
        });
        if (successEl) successEl.classList.add('show');
      }
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileNav();
    initReveals();
    initFaq();
    initSmoothScroll();
    initContactForm();
  });
})();
