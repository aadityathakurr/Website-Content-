// HotWax Systems | Module: S&M Team
// A row of person cards (3 at a time by default, 2 on tablets, 1 on phones) that moves one card at a time in an
// endless loop: arrows, auto-advance (pauses while the cursor is on a card or for keyboard focus), swipe.
// The loop works with copies of the cards placed before and after the real ones; copies are hidden from screen readers.
// On phones and touch screens a tap on the photo opens the person's LinkedIn profile.
// Settings come from data attributes the module writes from its fields. Works for several copies on one page.
(function () {
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  [].forEach.call(document.querySelectorAll('.hwx-team'), function (section) {
    var root = section.querySelector('.hwx-team__carousel');
    if (!root) return;
    var stage = root.querySelector('.hwx-team__stage');
    var track = root.querySelector('.hwx-team__track');
    var real = [].slice.call(track.children);
    var total = real.length;

    var autoplay = section.getAttribute('data-autoplay') === 'true';
    var interval = Math.max(2, parseFloat(section.getAttribute('data-interval')) || 4) * 1000;
    var swipe = section.getAttribute('data-swipe') === 'true';
    var timer = null, hover = false, keyFocus = false, busy = false;

    // how many cards fit in the row right now (CSS decides: the field value, at most 2 on tablets, 1 on phones)
    function perView() {
      var w = real[0].getBoundingClientRect().width;
      return w ? Math.max(1, Math.round(stage.clientWidth / w)) : 1;
    }
    // with no more people than fit in the row there is nothing to move
    if (total <= perView()) { root.classList.add('is-static'); return; }

    // copies of every card before and after the real ones, so the row can keep moving in either direction
    function copy(card) {
      var c = card.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.classList.add('is-clone');
      [].forEach.call(c.querySelectorAll('a, button'), function (el) { el.setAttribute('tabindex', '-1'); });
      return c;
    }
    real.slice().reverse().forEach(function (card) { track.insertBefore(copy(card), track.firstChild); });
    real.forEach(function (card) { track.appendChild(copy(card)); });

    var pos = total; // index of the first visible card among all cards (copies included)

    function step() {
      var cards = track.children;
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    }
    function place(animate) {
      track.style.transition = animate && !still ? '' : 'none';
      track.style.transform = 'translateX(' + (-pos * step()) + 'px)';
      if (!animate || still) { void track.offsetWidth; track.style.transition = ''; }
    }
    // after a move ends on a copy, jump without animation to the same card in the real set
    // (a timer, not 'transitionend', so the loop can never get stuck when the browser skips that event)
    var moveTimer = null;
    function settle() {
      busy = false;
      if (pos >= total * 2) { pos -= total; place(false); }
      else if (pos < total) { pos += total; place(false); }
    }
    function go(n, force) {
      if (busy && !force) return;
      clearTimeout(moveTimer);
      pos = n;
      busy = true;
      place(true);
      moveTimer = setTimeout(settle, still ? 0 : 820);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function play() {
      stop();
      if (!autoplay || still || hover || keyFocus) return;
      timer = setInterval(function () { go(pos + 1); }, interval);
    }

    var prevBtn = root.querySelector('.hwx-team__arrow--prev');
    var nextBtn = root.querySelector('.hwx-team__arrow--next');
    if (prevBtn) prevBtn.addEventListener('click', function () { go(pos - 1); play(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(pos + 1); play(); });

    // pause only while the cursor is ON a person card (not the gaps or arrows); resume when it leaves
    track.addEventListener('mouseover', function (e) {
      var on = !!e.target.closest('.hwx-team__card');
      if (on !== hover) { hover = on; if (on) stop(); else play(); }
    });
    track.addEventListener('mouseleave', function () { if (hover) { hover = false; play(); } });
    // keyboard users (Tab) also pause it; clicking an arrow with the mouse never leaves it paused
    root.addEventListener('focusin', function (e) {
      var kb = false;
      try { kb = e.target.matches(':focus-visible'); } catch (err) { kb = false; }
      if (kb) {
        keyFocus = true; stop();
        // bring a focused card into view
        var card = e.target.closest('.hwx-team__card');
        var i = card ? [].indexOf.call(track.children, card) : -1;
        if (i >= 0 && (i < pos || i >= pos + perView())) go(i, true);
      }
    });
    root.addEventListener('focusout', function () { if (keyFocus) { keyFocus = false; play(); } });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(pos - 1); }
      if (e.key === 'ArrowRight') { go(pos + 1); }
    });

    // swipe: the row follows the finger; a quick flick or a 40px drag moves one card; vertical moves scroll the page
    var swiped = 0;
    if (swipe) {
      var sx = 0, sy = 0, dx = 0, t0 = 0, mode = null;
      stage.addEventListener('touchstart', function (e) {
        sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = 0; mode = null; t0 = Date.now(); stop();
      }, { passive: true });
      stage.addEventListener('touchmove', function (e) {
        var mx = e.touches[0].clientX - sx, my = e.touches[0].clientY - sy;
        if (!mode && (Math.abs(mx) > 6 || Math.abs(my) > 6)) mode = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
        if (mode !== 'x' || busy) return;
        dx = mx;
        swiped = Date.now();
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-pos * step() + dx) + 'px)';
      }, { passive: true });
      var swipeEnd = function () {
        if (mode === 'x' && !busy) {
          if (Math.abs(dx) > 40 || (Math.abs(dx) > 20 && Date.now() - t0 < 300)) go(dx < 0 ? pos + 1 : pos - 1);
          else place(true);
        }
        mode = null; dx = 0;
        setTimeout(play, 4000);
      };
      stage.addEventListener('touchend', swipeEnd);
      stage.addEventListener('touchcancel', swipeEnd);
    }

    // phones and touch screens: a tap on a photo opens that person's LinkedIn (a swipe never does)
    var touch = window.matchMedia('(max-width:760px), (hover:none)');
    track.addEventListener('click', function (e) {
      if (!touch.matches || !e.target.closest('.hwx-team__photo')) return;
      if (Date.now() - swiped < 500) return;
      var link = e.target.closest('.hwx-team__card').querySelector('.hwx-team__profile');
      if (link) window.open(link.href, '_blank', 'noopener');
    });

    // keep the right card in place when the window is resized (the number of visible cards can change)
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { clearTimeout(moveTimer); settle(); place(false); }, 120); });

    place(false);
    play();
  });

  // Scroll reveal for the top text and the card row, only when they start below the first screen
  if (still || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-hidden');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  [].forEach.call(document.querySelectorAll('.hwx-team--reveal .hwx-team__copy, .hwx-team--reveal .hwx-team__carousel'), function (el, i) {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.style.transitionDelay = (i % 2) * 70 + 'ms';
    el.classList.add('is-hidden');
    requestAnimationFrame(function () { el.classList.add('is-ready'); });
    io.observe(el);
  });
})();
