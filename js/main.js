/**
 * Vanguard Digital Solutions - Professional Interaction Controller
 */

class App {
  constructor() {
    this.initNavbar();
    this.initRevealObserver();
    this.initMagneticEffects();
  }

  /* --- Navbar Scroll Interaction --- */
  initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 100);
    }, { passive: true });
  }

  /* --- Cinematic Reveal Logic --- */
  initRevealObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class with a slight random delay for more "natural" feel
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('reveal-active');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* --- Premium Micro-interactions (Magnetic Buttons) --- */
  initMagneticEffects() {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer || window.innerWidth < 1024) return;

    const magneticBtns = document.querySelectorAll('.hero-actions .btn-primary');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  /* --- Form Integration & Validation --- */
  initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const phoneInput = form.querySelector('#phone');

    const validatePhone = (rawPhone) => {
      const cleaned = rawPhone.replace(/[\s\-()+]/g, '');
      return /^(\+?61|0)[2-478]\d{8}$/.test(cleaned) || /^(\+?61|0)4\d{8}$/.test(cleaned);
    };

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const sanitized = phoneInput.value.replace(/[^\d+\s()-]/g, '').slice(0, 16);
        phoneInput.value = sanitized;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fields = form.querySelectorAll('[required]');

      fields.forEach(field => {
        const group = field.closest('.form-group');
        const value = field.value.trim();
        const errorMsg = group?.querySelector('.form-error-msg');

        if (!value) {
          if (field.name === 'phone' && errorMsg) {
            errorMsg.textContent = 'Phone number is required';
          }
          group.classList.add('error');
          isValid = false;
        } else if (field.name === 'phone' && !validatePhone(value)) {
          if (errorMsg) {
            errorMsg.textContent = 'Enter a valid Australian phone number';
          }
          group.classList.add('error');
          isValid = false;
        } else {
          group.classList.remove('error');
        }
      });

      if (isValid) {
        const formData = new FormData(form);
        const name = formData.get('full_name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        const serviceSelect = form.querySelector('#service');
        const serviceLabel = serviceSelect?.options[serviceSelect.selectedIndex]?.text || service;
        const projectMessage = message || 'Not provided';

        const subject = encodeURIComponent(`Project Brief - ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceLabel}\n\nProject details:\n${projectMessage}`);

        window.location.href = `mailto:hello@vanguarddigital.com.au?subject=${subject}&body=${body}`;

        const successMsg = document.getElementById('formSuccess');
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
      }
    });

    // Remove error class on input
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.addEventListener('input', () => {
        const group = el.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  }
}

// Kickstart modern runtime
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.initContactForm();
});
