(() => {
  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          let current = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 30));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current;
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  const revealItems = document.querySelectorAll(
    '.experience-card, .project-card, .skills-group, .education-card, ' +
    '.cert-card, .client-chip, .content-text, .stats-row, ' +
    '.section-heading, .subsection-heading, .contact-links, .contact-form'
  );

  revealItems.forEach((el) => el.classList.add('reveal-item'));

  if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((el) => revealObserver.observe(el));
  }

  // ============================================
  // EXPERIENCE EXPAND/COLLAPSE
  // ============================================
  document.querySelectorAll('.expand-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.closest('.exp-content');
      const details = content.querySelector('.exp-details');
      const isExpanded = details.classList.toggle('expanded');
      btn.classList.toggle('active', isExpanded);
      btn.querySelector('span').textContent = isExpanded ? 'Ver menos' : 'Ver más';
    });
  });

  // ============================================
  // CONTACT FORM FEEDBACK
  // ============================================
  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', async (e) => {
      const btn = form.querySelector('.btn-submit span');
      const original = btn.textContent;
      btn.textContent = 'Enviando...';
      setTimeout(() => { btn.textContent = original; }, 3000);
    });
  }
})();
