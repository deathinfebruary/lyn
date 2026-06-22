
  // Floating SVG bow particles
  const container = document.getElementById('particles');

  function makeBowSVG(size, color) {
    return `<svg width="${size}" height="${size * 0.6}" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="20" rx="15" ry="10" fill="${color}" opacity="0.7"/>
      <ellipse cx="48" cy="20" rx="15" ry="10" fill="${color}" opacity="0.7"/>
      <circle cx="32" cy="20" r="5" fill="${color}" opacity="0.9"/>
    </svg>`;
  }

  function makeHeartSVG(size, color) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 27 C16 27 4 19 4 11 C4 7 7 4 11 4 C13.5 4 15.5 5.5 16 7 C16.5 5.5 18.5 4 21 4 C25 4 28 7 28 11 C28 19 16 27 16 27Z" fill="${color}" opacity="0.65"/>
    </svg>`;
  }

  const shapes = [
    () => makeBowSVG(32 + Math.random()*20, '#F08FAB'),
    () => makeBowSVG(24 + Math.random()*16, '#C9B1D9'),
    () => makeHeartSVG(20 + Math.random()*16, '#F08FAB'),
    () => makeHeartSVG(16 + Math.random()*12, '#C9B1D9'),
  ];

  function spawnParticle() {
    const el = document.createElement('div');
    el.className = 'particle';
    el.innerHTML = shapes[Math.floor(Math.random() * shapes.length)]();
    el.style.left = Math.random() * 100 + 'vw';
    const dur = 9 + Math.random() * 12;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
  }
  for (let i = 0; i < 16; i++) spawnParticle();
  setInterval(spawnParticle, 2000);

  // Photo drag-scroll
  const wrap = document.getElementById('photoScroll');
  let isDown = false, startX, scrollLeft;
  wrap.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; });
  wrap.addEventListener('mouseleave', () => isDown = false);
  wrap.addEventListener('mouseup', () => isDown = false);
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    wrap.scrollLeft = scrollLeft - (e.pageX - wrap.offsetLeft - startX);
  });

  // Dots
  const strip = document.getElementById('photoStrip');
  const cards = strip.querySelectorAll('.photo-card');
  const dotsEl = document.getElementById('dots');
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(d);
  });
  const dotEls = dotsEl.querySelectorAll('.dot');
  wrap.addEventListener('scroll', () => {
    const idx = Math.round(wrap.scrollLeft / (cards[0].offsetWidth + 19));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
  });

  // Buttons
  function sayYes() { document.getElementById('yes-overlay').classList.add('show'); }

  let noMoves = 0;
  function runAway() {
    noMoves++;
    const btn = document.getElementById('noBtn');
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top  = Math.random() * maxY + 'px';
    btn.style.zIndex = 200;
    if (noMoves > 4) btn.style.display = 'none';
  }
