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
  ['.marquee__track'].forEach(function (sel) {
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
    }, { rootMargin: '350px 0px 50px 0px', threshold: 0.01 });

    revealables.forEach(function (el) { revealObserver.observe(el); });

    // Hero is above the fold - fire immediately rather than waiting a frame.
    raf(function () {
      document.querySelectorAll('.hero .reveal, .hero__title').forEach(function (el) {
        el.classList.add('is-in');
      });
    });

    // Safety net sweep for initial load and navigation
    window.__revealSweep = function () {
      for (var i = revealables.length - 1; i >= 0; i--) {
        var el = revealables[i];
        if (el.classList.contains('is-in')) { revealables.splice(i, 1); continue; }
        if (el.getBoundingClientRect().top < window.innerHeight * 1.3) {
          el.classList.add('is-in');
          revealables.splice(i, 1);
        }
      }
    };
    window.addEventListener('load', window.__revealSweep);
    window.addEventListener('hashchange', window.__revealSweep);
    setTimeout(window.__revealSweep, 50);
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
     7. FAQ - Hover to open, remains open within section,
        automatically closes when cursor leaves the section
     --------------------------------------------------------- */
  var faqItems = [].slice.call(document.querySelectorAll('.faq__item'));
  var faqSection = document.getElementById('faq') || document.querySelector('.closing');

  function closeAllFaq() {
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq__q');
      item.classList.remove('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function openFaq(targetItem) {
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq__q');
      if (item === targetItem) {
        item.classList.add('is-open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('is-open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeFaq(targetItem) {
    var btn = targetItem.querySelector('.faq__q');
    targetItem.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleFaq(targetItem) {
    var isOpen = targetItem.classList.contains('is-open');
    if (isOpen) {
      closeFaq(targetItem);
    } else {
      openFaq(targetItem);
    }
  }

  function isDesktopMouse() {
    return window.innerWidth > 900 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  var lastHoverTime = 0;

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__q');

    // Desktop hover: only on large desktop screens with a physical mouse pointer
    item.addEventListener('mouseenter', function () {
      if (isDesktopMouse()) {
        lastHoverTime = Date.now();
        openFaq(item);
      }
    });

    // Single-tap / click handler for mobile and pointer devices: opens reliably on 1 click
    function handleFaqClick(e) {
      if (e.target.closest('a')) return;
      if (e.target.closest('.faq__content') && item.classList.contains('is-open')) return;

      if (Date.now() - lastHoverTime < 350 && item.classList.contains('is-open')) {
        return;
      }

      if (e.cancelable) e.preventDefault();
      toggleFaq(item);
    }

    if (btn) {
      btn.addEventListener('click', handleFaqClick);
    }
  });

  // Automatically close when moving cursor to other sections on desktop mouse
  if (faqSection) {
    faqSection.addEventListener('mouseleave', function () {
      if (isDesktopMouse()) {
        closeAllFaq();
      }
    });
  }

  /* ---------------------------------------------------------
     Logo wall
     Four slots and eight clients, so the wall is two pages.
     On a swap each logo goes out of focus and loses its color
     where it stands, the next one takes the slot, and it comes
     back into focus. Slots go one after another, so the row
     turns over left to right rather than all at once.
     Hovering holds the cycle.
     --------------------------------------------------------- */
  (function () {
    var root = document.querySelector('[data-logo-cycle]');
    if (!root) return;

    var slots = [].slice.call(root.querySelectorAll('.logo-cycle__slot'));
    // Read the pool off the live img tags rather than a data attribute, so it
    // picks up whatever the build turned the sources into. In the inlined
    // standalone file these are data URIs.
    var pool = [].slice.call(root.querySelectorAll('img')).map(function (im) {
      return { src: im.getAttribute('src'), alt: im.getAttribute('alt') || '', cls: im.className || '' };
    });
    if (!slots.length || pool.length <= slots.length) return;

    var pages = Math.floor(pool.length / slots.length);
    if (pages < 2) return;

    var page = 0;
    var paused = false;
    var HOLD = 5400;
    var FADE = 700;
    var STEP = 200;   // delay from one slot to the next

    function step() {
      if (paused) return;
      page = (page + 1) % pages;

      slots.forEach(function (slot, i) {
        setTimeout(function () { slot.classList.add('is-swapping'); }, i * STEP);

        setTimeout(function () {
          var entry = pool[page * slots.length + i];
          if (entry) {
            var img = slot.querySelector('img');
            img.src = entry.src;
            img.alt = entry.alt;
            img.className = entry.cls || '';
          }
          slot.classList.remove('is-swapping');
        }, i * STEP + FADE);
      });
    }

    if (!reduce) setInterval(step, HOLD);

    root.addEventListener('pointerenter', function () { paused = true; });
    root.addEventListener('pointerleave', function () { paused = false; });
  })();




})();



