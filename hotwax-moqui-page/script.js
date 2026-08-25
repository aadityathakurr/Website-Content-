/* =========================================================
   HotWax Systems - Moqui solutions page
   Motion layer. No dependencies. Everything transform/opacity
   based, rAF-batched, and disabled under prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  /* ---------------------------------------------------------
     1. Seamless marquees - duplicate the track so the
        -50% translate loops without a visible seam.
     --------------------------------------------------------- */
  ['.marquee__track', '.logos__track'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (track) {
      track.innerHTML += track.innerHTML;
    });
  });

  /* ---------------------------------------------------------
     2. Scroll reveal + headline line-mask
     --------------------------------------------------------- */
  var revealables = [].slice.call(document.querySelectorAll('.reveal, .hero__title'));

  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealObserver.observe(el); });

    // Hero is above the fold - fire immediately rather than waiting a frame.
    raf(function () {
      document.querySelectorAll('.hero .reveal, .hero__title').forEach(function (el) {
        el.classList.add('is-in');
      });
    });

    // Safety net: an observer that never fires would leave content invisible
    // (very tall viewports, restored scroll positions, print). Sweep anything
    // already at or above the fold on every scroll tick and on load.
    window.__revealSweep = function () {
      for (var i = revealables.length - 1; i >= 0; i--) {
        var el = revealables[i];
        if (el.classList.contains('is-in')) { revealables.splice(i, 1); continue; }
        if (el.getBoundingClientRect().top < window.innerHeight * 0.96) {
          el.classList.add('is-in');
          revealables.splice(i, 1);
        }
      }
    };
    window.addEventListener('load', window.__revealSweep);
    // Landing directly on an anchor (/page#faq) jumps without firing scroll.
    window.addEventListener('hashchange', window.__revealSweep);
    setTimeout(window.__revealSweep, 400);
  }

  /* ---------------------------------------------------------
     3. Count-up statistics
     --------------------------------------------------------- */
  function render(el, value) {
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var body = value.toLocaleString('en-US');
    el.innerHTML =
      (prefix ? '<span class="u">' + prefix + '</span>' : '') +
      body +
      (suffix ? '<span class="u">' + suffix + '</span>' : '');
  }

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce || target === 0) { render(el, target); return; }

    var duration = 1500;
    var start = null;

    (function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      // easeOutExpo - fast start, long settle
      var eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      render(el, Math.round(target * eased));
      if (t < 1) raf(step);
    })(performance.now());
  }

  var counters = [].slice.call(document.querySelectorAll('[data-count]'));

  if (!('IntersectionObserver' in window)) {
    counters.forEach(countUp);
  } else {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     4. Live order ticker in the hero visualisation
     --------------------------------------------------------- */
  var ticker = document.querySelector('[data-ticker]');
  if (ticker && !reduce) {
    var count = parseInt(ticker.getAttribute('data-ticker'), 10) || 0;
    var tickerVisible = true;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        tickerVisible = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(ticker);
    }

    setInterval(function () {
      if (!tickerVisible || document.hidden) return;
      count += 1 + Math.floor(Math.random() * 3);
      ticker.textContent = count.toLocaleString('en-US');
    }, 1800);
  }

  /* ---------------------------------------------------------
     5. Grid parallax + reveal sweep (one rAF loop)
     --------------------------------------------------------- */
  var parallaxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var queued = false;

  function onScroll() {
    if (queued) return;
    queued = true;
    raf(function () {
      queued = false;
      if (window.__revealSweep) window.__revealSweep();

      if (!reduce) {
        parallaxEls.forEach(function (el) {
          var rect = el.parentElement.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
          var rate = parseFloat(el.getAttribute('data-parallax')) || 0.1;
          el.style.transform = 'translate3d(0,' + (-rect.top * rate) + 'px,0)';
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     6. Cursor spotlight on cards
     --------------------------------------------------------- */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.spotlight').forEach(function (card) {
      var pending = false, px = 0, py = 0;

      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        px = e.clientX - rect.left;
        py = e.clientY - rect.top;
        if (pending) return;
        pending = true;
        raf(function () {
          pending = false;
          card.style.setProperty('--mx', px + 'px');
          card.style.setProperty('--my', py + 'px');
        });
      });
    });
  }

  /* ---------------------------------------------------------
     7. FAQ - one answer open at a time
     --------------------------------------------------------- */
  var faqItems = [].slice.call(document.querySelectorAll('.faq__item'));
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

})();
