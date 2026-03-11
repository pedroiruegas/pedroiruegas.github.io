(() => {
  let currentLang = localStorage.getItem('preferredLanguage') || 'es';
  let translations = {};

  async function loadTranslations(lang) {
    const res = await fetch(`i18n/${lang}.json`);
    translations = await res.json();
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] !== undefined) {
        el.innerHTML = translations[key];
      }
    });

    // Copyright
    const copy = document.querySelector('.copyright');
    if (copy) {
      copy.textContent = `© ${new Date().getFullYear()} Pedro Iruegas. ${translations['copyright']}`;
    }

    // Botones activos
    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    // Expand toggle text
    document.querySelectorAll('.expand-toggle span').forEach(span => {
      const btn = span.closest('.expand-toggle');
      if (btn && btn.classList.contains('active')) {
        span.textContent = translations['show_less'];
      } else {
        span.textContent = translations['show_more'];
      }
    });
  }

  async function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    await loadTranslations(lang);
    applyTranslations();
  }

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations(currentLang);
    applyTranslations();

    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchLang(btn.getAttribute('data-lang'));
      });
    });
  });
})();
