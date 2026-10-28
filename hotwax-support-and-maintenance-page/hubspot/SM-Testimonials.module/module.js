// HotWax Systems | Module: S&M Testimonials
// Phones: one full card at a time, looping in one direction like the steps (no rewind from the last card to
// the first). Swipe drags the card with the finger and snaps; optional auto-slide pauses
// while the visitor touches the cards.
// Desktop: beside the featured card, testimonials rotate two at a time (paused while the cursor is over them).
// All sizes: optional scroll reveal for the heading and the cards. Works for several copies on one page.
(function () {
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = window.matchMedia('(max-width:760px)');

  [].forEach.call(document.querySelectorAll('.hwx-voices--carousel'), function (section) {
    var list = section.querySelector('.hwx-voices__list');
    if (!list) return;
    var items = [].slice.call(list.querySelectorAll('.hwx-voices__card')), n = items.length;
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

    function mark() {
      var cur = ((pos - 1) % n + n) % n;
      items.forEach(function (c, k) {
        if (phone.matches && k !== cur) c.setAttribute('aria-hidden', 'true');
        else c.removeAttribute('aria-hidden');
      });
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

  // Desktop: the testimonials beside the featured card rotate two at a time. The cursor on a card (or keyboard
  // focus in the section) pauses the rotation; it resumes as soon as the cursor leaves the card.
  var desktop = window.matchMedia('(min-width:761px)');
  [].forEach.call(document.querySelectorAll('.hwx-voices__stack.is-rotating'), function (stack) {
    var section = stack.closest('.hwx-voices');
    var cards = [].slice.call(stack.children).filter(function (c) { return c.classList.contains('hwx-voices__card'); });
    var n = cards.length, start = 0, timer = null, resume = null, overCard = false, keyFocus = false;
    var interval = Math.max(3, parseFloat(stack.getAttribute('data-interval')) || 6) * 1000;

    function show() {
      cards.forEach(function (c, k) {
        var on = k === start % n || k === (start + 1) % n;
        c.classList.toggle('is-shown', on);
        if (desktop.matches && !on) c.setAttribute('aria-hidden', 'true');
        else if (desktop.matches) c.removeAttribute('aria-hidden');
      });
    }
    // every slot as tall as the tallest testimonial, so the featured card and the page never jump
    function measure() {
      if (!desktop.matches) { stack.style.removeProperty('--hwx-voices-slot-h'); return; }
      var max = 0;
      cards.forEach(function (c) {
        var was = c.classList.contains('is-shown');
        c.classList.add('is-shown'); c.style.animation = 'none'; c.style.minHeight = '0';
        max = Math.max(max, c.offsetHeight);
        c.style.animation = ''; c.style.minHeight = '';
        if (!was) c.classList.remove('is-shown');
      });
      stack.style.setProperty('--hwx-voices-slot-h', max + 'px');
    }
    function next() { start = (start + 2) % n; show(); }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (resume) { clearTimeout(resume); resume = null; }
    }
    // soon = true after the visitor stops reading: the next pair comes after ~2s instead of a full cycle
    function play(soon) {
      stop();
      if (still || overCard || keyFocus || !desktop.matches) return;
      var first = soon ? Math.min(2000, interval) : interval;
      resume = setTimeout(function () { resume = null; next(); timer = setInterval(next, interval); }, first);
    }

    // pause only while the cursor is ON a testimonial card (the featured one or the two beside it);
    // moving into the gap next to a card, or anywhere else, resumes it straight away
    var list = section.querySelector('.hwx-voices__list');
    list.addEventListener('mouseover', function (e) {
      var on = !!(e.target.closest && e.target.closest('.hwx-voices__card'));
      if (on === overCard) return;
      overCard = on;
      if (on) stop(); else play(true);
    });
    list.addEventListener('mouseleave', function () { if (overCard) { overCard = false; play(true); } });
    // keyboard users (Tab) also pause it; a mouse click never does
    section.addEventListener('focusin', function (e) {
      var kb = false;
      try { kb = e.target.matches(':focus-visible'); } catch (err) { kb = false; }
      if (kb) { keyFocus = true; stop(); }
    });
    section.addEventListener('focusout', function () { if (keyFocus) { keyFocus = false; play(true); } });
    var onChange = function () { measure(); show(); play(); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange); else desktop.addListener(onChange);
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    show(); measure(); play();
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
  [].forEach.call(document.querySelectorAll('.hwx-voices--reveal .hwx-voices__head, .hwx-voices--reveal .hwx-voices__viewport'), function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('is-hidden');
    requestAnimationFrame(function () { el.classList.add('is-ready'); });
    io.observe(el);
  });
})();
