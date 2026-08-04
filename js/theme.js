(() => {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

  function syncThemeIcons(isLight) {
    document.querySelectorAll('.theme-btn i').forEach((icon) => {
      if (isLight) {
        icon.classList.replace('fa-sun', 'fa-moon');
      } else {
        icon.classList.replace('fa-moon', 'fa-sun');
      }
    });
  }

  function applyTheme(isLight, persist) {
    document.body.classList.toggle('light', isLight);
    syncThemeIcons(isLight);
    if (persist) localStorage.setItem('theme', isLight ? 'day' : 'night');
  }

  function setupThemeToggle(el) {
    if (!el) return;
    el.addEventListener('click', () => {
      const isLight = !document.body.classList.contains('light');
      applyTheme(isLight, true);
    });
  }

  // 'day' = fósforo verde, 'night' (default) = fósforo ámbar
  const stored = localStorage.getItem('theme');
  applyTheme(stored === 'day', false);

  setupThemeToggle(document.getElementById('themeToggle'));
  setupThemeToggle(document.getElementById('themeToggleMobile'));
})();
