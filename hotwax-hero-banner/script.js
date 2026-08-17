/* Hero carousel: auto-advances through the six modules, driving the
   progress line between tabs, the 3D card stack, and the floating
   side cards. Clicking a tab (or a mobile dot) jumps straight to it. */

(function () {
  const SLIDES = ['order', 'warehouse', 'manufacturing', 'procurement'];
  const DURATION = 5000;   // ms each module stays on screen (pauses on hover)
  const TICK = 50;         // progress-bar refresh interval

  const showcase = document.querySelector('.cards-showcase');
  const tabs     = Array.from(document.querySelectorAll('.nav-tab'));
  const lines    = Array.from(document.querySelectorAll('.connection-line'));
  const dots     = Array.from(document.querySelectorAll('.nav-dot-track'));
  const cards    = Array.from(document.querySelectorAll('.card-wrapper'));
  const groups   = Array.from(document.querySelectorAll('.side-image-group'));

  if (!showcase) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let elapsed = 0;
  let timer = null;

  function progressEls(index) {
    const line = lines[index];
    return [
      line ? line.querySelector('.line-progress') : null,
      dots[index] ? dots[index].querySelector('.nav-dot-progress') : null
    ].filter(Boolean);
  }

  function resetProgress() {
    document.querySelectorAll('.line-progress, .nav-dot-progress')
      .forEach(el => { el.style.width = '0%'; });
    lines.forEach(l => l.classList.remove('completed'));
    dots.forEach(d => d.classList.remove('completed'));
  }

  function render(next, previous) {
    const name = SLIDES[next];

    showcase.className = 'cards-showcase ' + name;

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i <= next);
      tab.classList.toggle('current', i === next);
    });

    lines.forEach((line, i) => {
      line.classList.toggle('active', i === next);
      line.classList.toggle('completed', i < next);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === next);
      dot.classList.toggle('completed', i < next);
      const bar = dot.querySelector('.nav-dot-progress');
      if (bar && i > next) bar.style.width = '0%';
    });

    cards.forEach((card, i) => {
      card.classList.remove('is-leaving');
      card.classList.toggle('is-active', i === next);
    });

    // outgoing card slides down out of frame, in front, over 1s
    if (typeof previous === 'number' && previous !== next && cards[previous]) {
      const leaving = cards[previous];
      leaving.classList.add('is-leaving');
      setTimeout(() => leaving.classList.remove('is-leaving'), 1000);
    }

    // two groups per slide index: one in .side-left, one in .side-right
    groups.forEach(group => {
      group.classList.toggle('is-active', group.classList.contains(name));
    });
  }

  function goTo(index, { restart = true } = {}) {
    const previous = current;
    current = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
    if (current === 0) resetProgress();
    render(current, previous);
    if (restart) {
      elapsed = 0;
      progressEls(current).forEach(el => { el.style.width = '0%'; });
    }
  }

  function tick() {
    elapsed += TICK;
    const pct = Math.min(100, (elapsed / DURATION) * 100);
    progressEls(current).forEach(el => { el.style.width = pct + '%'; });
    if (elapsed >= DURATION) goTo(current + 1);
  }

  function start() {
    if (reduced || timer) return;
    timer = setInterval(tick, TICK);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }

  tabs.forEach(tab => tab.addEventListener('click', () => goTo(Number(tab.dataset.index))));
  dots.forEach(dot => {
    const btn = dot.querySelector('.nav-dot');
    if (btn) btn.addEventListener('click', () => goTo(Number(dot.dataset.index)));
  });

  // pause while the tab is hidden or the pointer is over the showcase
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  showcase.addEventListener('mouseenter', stop);
  showcase.addEventListener('mouseleave', start);

  render(0);
  start();
})();
