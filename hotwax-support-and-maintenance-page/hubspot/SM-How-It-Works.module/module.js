// HotWax Systems | Module: S&M How It Works
// Phones: one full step card at a time, looping in one direction (after the last step the first one slides in
// from the right; before the first, the last one slides in from the left). Swipe drags the card with the finger
// and snaps; optional auto-slide pauses while the visitor touches the cards. The card in view gets the full red line.
// All sizes: optional scroll reveal for the heading and the steps. Works for several copies on one page.
(function () {
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = window.matchMedia('(max-width:760px)');

  [].forEach.call(document.querySelectorAll('.hwx-how--carousel'), function (section) {
    var list = section.querySelector('.hwx-how__steps');
    if (!list) return;
    var items = [].slice.call(list.children), n = items.length;
    var autoplay = section.getAttribute('data-autoplay') === 'true';
    var interval = Math.max(2, parseFloat(section.getAttribute('data-interval')) || 5) * 1000;
    var timer = null;

    // Copies of the last and first card sit at the two ends of the track. Stepping past the last card slides
    // forward onto the copy of the first, then jumps (without animation) to the real first card, so the
    // carousel always moves in the direction of the swipe and never rewinds across every card.
    function copy(el) {
      var c = el.cloneNode(true);
      c.classList.add('is-clone');
      c.setAttribute('aria-hidden', 'true');
      [].forEach.call(c.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
      return c;
    }
    var head = copy(items[n - 1]), tail = copy(items[0]);
    list.insertBefore(head, list.firstChild);
    list.appendChild(tail);
    var pos = 1, tm = null;

    function place(dx, animate) {
      if (!phone.matches) { list.style.transform = ''; return; }
      list.classList.toggle('is-dragging', !animate);
      var gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      list.style.transform = 'translateX(' + (-pos * (list.offsetWidth + gap) + (dx || 0)) + 'px)';
    }
    function settle() {
      if (pos === 0) { pos = n; place(0, false); }
      else if (pos === n + 1) { pos = 1; place(0, false); }
    }
    function step(d) {
      clearTimeout(tm);
      settle();
      void list.offsetWidth; // apply the jump before the next slide starts
      pos += d;
      place(0, true);
      mark();
      tm = setTimeout(settle, 520);
    }

    // the step in view gets the full red line; the others are hidden from screen readers
    function mark() {
      var cur = ((pos - 1) % n + n) % n;
      items.forEach(function (li, k) {
        var on = k === cur;
        li.classList.toggle('is-current', phone.matches && on);
        if (phone.matches && !on) li.setAttribute('aria-hidden', 'true');
        else li.removeAttribute('aria-hidden');
      });
      head.classList.toggle('is-current', phone.matches && pos === 0);
      tail.classList.toggle('is-current', phone.matches && pos === n + 1);
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function play() {
      stop();
      if (!autoplay || still || !phone.matches) return;
      timer = setInterval(function () { step(1); }, interval);
    }

    // swipe: follow the finger, then snap; a quick flick (20px) or a 40px drag moves one card;
    // vertical moves are left to the page scroll
    var sx = 0, sy = 0, dx = 0, t0 = 0, mode = null;
    list.addEventListener('touchstart', function (e) {
      if (!phone.matches) return;
      stop(); clearTimeout(tm); settle();
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = 0; mode = null; t0 = Date.now();
    }, { passive: true });
    list.addEventListener('touchmove', function (e) {
      if (!phone.matches) return;
      var mx = e.touches[0].clientX - sx, my = e.touches[0].clientY - sy;
      if (!mode && (Math.abs(mx) > 6 || Math.abs(my) > 6)) mode = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
      if (mode !== 'x') return;
      dx = mx;
      place(dx, false);
    }, { passive: true });
    var swipeEnd = function () {
      if (mode === 'x' && (Math.abs(dx) > 40 || (Math.abs(dx) > 20 && Date.now() - t0 < 300))) step(dx < 0 ? 1 : -1);
      else place(0, true);
      mode = null; dx = 0;
      setTimeout(play, 3000);
    };
    list.addEventListener('touchend', swipeEnd);
    list.addEventListener('touchcancel', swipeEnd);

    var reset = function () { clearTimeout(tm); settle(); place(0, false); mark(); play(); };
    if (phone.addEventListener) phone.addEventListener('change', reset); else phone.addListener(reset);
    window.addEventListener('resize', function () { place(0, false); });
    reset();
  });

  // Scroll reveal, only for parts that start below the first screen.
  if (still || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-hidden');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  [].forEach.call(document.querySelectorAll('.hwx-how--reveal .hwx-how__head, .hwx-how--reveal .hwx-how__viewport'), function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('is-hidden');
    requestAnimationFrame(function () { el.classList.add('is-ready'); });
    io.observe(el);
  });
})();
