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

  const stored = localStorage.getItem('theme');
  if (stored === 'day') {
    applyTheme(true, false);
  } else if (stored === 'night') {
    applyTheme(false, false);
  } else {
    applyTheme(prefersLight.matches, false);
    prefersLight.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) applyTheme(e.matches, false);
    });
  }

  setupThemeToggle(document.getElementById('themeToggle'));
  setupThemeToggle(document.getElementById('themeToggleMobile'));
})();
