/* =========================================================
   ERP Architecture Graphic
   One flat illustration cut into three transparent slices,
   stacked as independent elements and moved by different
   amounts so the stack reads as having depth.

   No dependencies. Include after the markup, or anywhere
   with defer. Every [data-arch3d] on the page is wired up.

   Manual init:  ErpGraphic.init(element)
   ========================================================= */
(function (global) {
  'use strict';

  var reduce = global.matchMedia
    ? global.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  var raf = global.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  function init(root) {
    if (!root || root.__archInit) return;
    root.__archInit = true;

    var scene = root.querySelector('.arch3d__scene');
    var stage = root.querySelector('.arch3d__stage');
    var zones = [].slice.call(root.querySelectorAll('.arch3d__zone'));
    var plates = {};
    [].slice.call(root.querySelectorAll('.arch3d__plate')).forEach(function (p) {
      plates[p.getAttribute('data-layer')] = p;
    });

    var DEPTH = { apps: 1, service: 0.55, data: 0.22 };
    var ZPUSH = { apps: 13, service: 6, data: 0 };
    var IDLE_PHASE = { apps: 0, service: 2.1, data: 4.2 };

    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var pinned = null;
    var hovered = null;
    var tx = 0, ty = 0;        // pointer target, normalized to -1..1
    var cx = 0, cy = 0;        // current, eased toward the target
    var engaged = 0, engagedTarget = 0;
    var running = false;
    var t0 = null;

    function amplitude() {
      var w = stage.offsetWidth || 580;
      var scale = window.innerWidth <= 1024 ? 0.5 : 1;
      return w * 0.009 * scale;
    }

    function apply(now) {
      // Reduced motion: park every layer flat and stop the loop. The active
      // state still reads, because emphasis is carried by color and opacity
      // rather than by movement.
      if (reduce) {
        scene.style.setProperty('--rx', '0deg');
        scene.style.setProperty('--ry', '0deg');
        for (var flat in DEPTH) {
          if (!Object.prototype.hasOwnProperty.call(DEPTH, flat)) continue;
          root.style.setProperty('--p-' + flat + '-x', '0px');
          root.style.setProperty('--p-' + flat + '-y', '0px');
          root.style.setProperty('--p-' + flat + '-z', '0px');
        }
        running = false;
        return;
      }

      var amp = amplitude();
      if (t0 === null) t0 = now;
      var idle = (now - t0) / 1000;
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      engaged += (engagedTarget - engaged) * 0.09;

      scene.style.setProperty('--ry', (cx * 2.2).toFixed(3) + 'deg');
      scene.style.setProperty('--rx', (-cy * 1.6).toFixed(3) + 'deg');

      for (var name in DEPTH) {
        if (!Object.prototype.hasOwnProperty.call(DEPTH, name)) continue;
        var d = DEPTH[name];
        var float = Math.sin(idle * 0.5 + IDLE_PHASE[name]) * 1.0 * d * (1 - engaged);
        root.style.setProperty('--p-' + name + '-x', (cx * amp * d).toFixed(2) + 'px');
        root.style.setProperty('--p-' + name + '-y', (cy * amp * 0.7 * d + float).toFixed(2) + 'px');
        root.style.setProperty('--p-' + name + '-z', (ZPUSH[name] * (0.35 + 0.65 * engaged)).toFixed(2) + 'px');
      }

      raf(apply);
    }

    function start() {
      if (running) return;
      running = true;
      raf(apply);
    }

    function setActive(name) {
      var active = name || pinned;
      root.classList.toggle('is-engaged', !!active);
      engagedTarget = active ? 1 : 0;
      zones.forEach(function (z) {
        var on = z.getAttribute('data-layer') === active;
        z.classList.toggle('is-active', on);
        z.setAttribute('aria-pressed', z.getAttribute('data-layer') === pinned ? 'true' : 'false');
        plates[z.getAttribute('data-layer')].classList.toggle('is-active', on);
      });
      start();
    }

    if (fine && !reduce) {
      stage.addEventListener('pointermove', function (e) {
        var r = stage.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;

        // Ask the browser what is under the pointer rather than relying on
        // enter and leave events. The zones are clipped to the shape of their
        // artwork, so there is empty space between them, and an enter/leave
        // pair never fires when the pointer crosses that gap. elementFromPoint
        // respects the clip, so the highlight clears the moment the pointer is
        // no longer over a layer.
        var el = document.elementFromPoint(e.clientX, e.clientY);
        var zone = el && el.closest ? el.closest('.arch3d__zone') : null;
        var name = zone ? zone.getAttribute('data-layer') : null;
        if (name !== hovered) {
          hovered = name;
          setActive(name || pinned);
        }
        start();
      });
      stage.addEventListener('pointerleave', function () {
        tx = 0; ty = 0;
        hovered = null;
        setActive(null);
      });
    }

    zones.forEach(function (zone) {
      var name = zone.getAttribute('data-layer');

      zone.addEventListener('click', function () {
        pinned = pinned === name ? null : name;
        setActive(pinned || hovered);
      });

      zone.addEventListener('focus', function () {
        hovered = name;
        setActive(name);
      });

      zone.addEventListener('blur', function () {
        hovered = null;
        setActive(pinned);
      });
    });


    start();
  }

  function initAll(ctx) {
    var nodes = (ctx || document).querySelectorAll('[data-arch3d]');
    [].slice.call(nodes).forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(); });
  } else {
    initAll();
  }

  global.ErpGraphic = { init: init, initAll: initAll };
})(window);
