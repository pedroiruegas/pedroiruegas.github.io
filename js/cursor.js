document.addEventListener('DOMContentLoaded', function () {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!hasFinePointer) return;

  const LERP_GLOW = 0.35;

  // Glow canvas
  const glowCanvas = document.createElement('canvas');
  glowCanvas.id = 'cursorGlow';
  document.body.appendChild(glowCanvas);
  const gCtx = glowCanvas.getContext('2d');

  function resizeGlow() {
    glowCanvas.width = window.innerWidth;
    glowCanvas.height = window.innerHeight;
  }
  resizeGlow();
  window.addEventListener('resize', resizeGlow);

  let mx = -400, my = -400;
  let gx = -400, gy = -400;
  let hidden = true;
  let velocity = 0;
  let prevMx = 0, prevMy = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    velocity = Math.min(Math.hypot(mx - prevMx, my - prevMy), 80);
    prevMx = mx;
    prevMy = my;
    if (hidden) {
      hidden = false;
      glowCanvas.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', function () {
    hidden = true;
    glowCanvas.style.opacity = '0';
  });

  function tick() {
    gx += (mx - gx) * LERP_GLOW;
    gy += (my - gy) * LERP_GLOW;

    const w = glowCanvas.width;
    const h = glowCanvas.height;
    gCtx.clearRect(0, 0, w, h);

    if (!hidden) {
      const isLight = document.body.classList.contains('light');
      const baseAlpha = isLight ? 0.03 : 0.055;
      const velBoost = velocity * 0.0003;
      const alpha = Math.min(baseAlpha + velBoost, 0.09);
      const radius = 550;

      const g1 = gCtx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      g1.addColorStop(0, `rgba(124, 106, 255, ${alpha})`);
      g1.addColorStop(0.25, `rgba(124, 106, 255, ${alpha * 0.5})`);
      g1.addColorStop(0.5, `rgba(124, 106, 255, ${alpha * 0.2})`);
      g1.addColorStop(0.75, `rgba(124, 106, 255, ${alpha * 0.05})`);
      g1.addColorStop(1, 'transparent');
      gCtx.fillStyle = g1;
      gCtx.fillRect(0, 0, w, h);

      const g2 = gCtx.createRadialGradient(gx, gy, 0, gx, gy, 120);
      g2.addColorStop(0, `rgba(124, 106, 255, ${isLight ? 0.02 : 0.03})`);
      g2.addColorStop(0.5, `rgba(124, 106, 255, 0.01)`);
      g2.addColorStop(1, 'transparent');
      gCtx.fillStyle = g2;
      gCtx.fillRect(0, 0, w, h);
    }

    requestAnimationFrame(tick);
  }

  tick();
});
