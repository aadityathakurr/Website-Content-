/* =========================================================
   HotWax Systems - Moqui conversion landing page
   Additive behaviour layer. Loads AFTER script.js, which
   already handles scroll reveal, count-up statistics, the
   logo marquee, the FAQ accordion and the live ticker.

   Only two things are left for this file:
     1. revealing the money shot frame
     2. the sticky call to action bar

   Same policy as script.js: transform and opacity only,
   rAF-batched, and disabled under prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  /* ---------------------------------------------------------
     1. Money shot frame
        Its own reveal rather than the shared .reveal class,
        because it rises further and settles slower than the
        text around it.
     --------------------------------------------------------- */
  var frame = document.querySelector('.money__frame');

  if (frame) {
    if (reduce || !('IntersectionObserver' in window)) {
      frame.classList.add('is-in');
    } else {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.06 }).observe(frame);

      // The frame sits just below the fold on most viewports and
      // above it on tall ones. If the observer has not fired by
      // the time the page settles, show it anyway rather than
      // leaving the money shot invisible.
      setTimeout(function () {
        if (frame.getBoundingClientRect().top < window.innerHeight) {
          frame.classList.add('is-in');
        }
      }, 500);
    }
  }

  /* ---------------------------------------------------------
     2. Sticky call to action
        On once the visitor is past the hero, off again once the
        closing call to action is on screen, since showing a
        button on top of the same button is noise. Dismissal is
        remembered for the session only.
     --------------------------------------------------------- */
  var bar = document.getElementById('stickycta');
  if (!bar) return;

  var closer = bar.querySelector('.stickycta__close');
  var dismissed = false;

  try {
    dismissed = window.sessionStorage.getItem('lp-cta-dismissed') === '1';
  } catch (e) {
    // Private browsing can throw on sessionStorage access.
    dismissed = false;
  }

  if (closer) {
    closer.addEventListener('click', function () {
      dismissed = true;
      bar.classList.remove('is-on');
      try {
        window.sessionStorage.setItem('lp-cta-dismissed', '1');
      } catch (e) { /* nothing to do, it just will not persist */ }
    });
  }

  // The closing band is the last .ctaband on the page.
  var bands = document.querySelectorAll('.ctaband');
  var closingBand = bands.length ? bands[bands.length - 1] : null;
  var hero = document.querySelector('.lp-hero');
  var queued = false;

  function update() {
    if (queued) return;
    queued = true;
    raf(function () {
      queued = false;
      if (dismissed) return;

      var pastHero = hero
        ? hero.getBoundingClientRect().bottom < 0
        : window.pageYOffset > window.innerHeight;

      var atClosing = closingBand
        ? closingBand.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;

      bar.classList.toggle('is-on', pastHero && !atClosing);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

})();
