/* ==========================================================
   HotWax Hero Banner — carousel controller

   Reads its slides from the DOM, so adding or removing a card
   in the HubSpot sidebar needs no change here. Supports several
   instances of the module on one page.
   ========================================================== */

(function () {
  "use strict";

  var TICK = 50; // ms between progress-bar updates

  function initHero(root) {
    if (root.hasAttribute("data-hws-ready")) return;
    root.setAttribute("data-hws-ready", "");

    var stage = root.querySelector(".hws-stage");
    if (!stage) return;

    var cards  = Array.prototype.slice.call(stage.querySelectorAll(".hws-card"));
    var groups = Array.prototype.slice.call(stage.querySelectorAll(".hws-chipgroup"));
    var tabs   = Array.prototype.slice.call(root.querySelectorAll(".hws-tab"));
    var lines  = Array.prototype.slice.call(root.querySelectorAll(".hws-line"));
    var dots   = Array.prototype.slice.call(root.querySelectorAll(".hws-dot-track"));

    var count = cards.length;
    if (!count) return;

    var duration = parseInt(root.getAttribute("data-duration"), 10);
    if (!duration || duration < 500) duration = 5000;

    var pauseOnHover = root.getAttribute("data-pause-on-hover") !== "false";
    var reduced = window.matchMedia &&
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var current = 0;
    var elapsed = 0;
    var timer = null;

    function bars(i) {
      var out = [];
      if (lines[i]) out.push(lines[i].querySelector(".hws-line__progress"));
      if (dots[i])  out.push(dots[i].querySelector(".hws-dot-progress"));
      return out.filter(Boolean);
    }

    function clearProgress() {
      lines.forEach(function (l) {
        l.classList.remove("is-done");
        var p = l.querySelector(".hws-line__progress");
        if (p) p.style.width = "0%";
      });
      dots.forEach(function (d) {
        d.classList.remove("is-done");
        var p = d.querySelector(".hws-dot-progress");
        if (p) p.style.width = "0%";
      });
    }

    function render(next, prev) {
      // tilt alternates direction each slide
      stage.setAttribute("data-active", String(next));
      stage.setAttribute("data-tilt", next % 2 === 0 ? "a" : "b");

      cards.forEach(function (c, i) {
        c.classList.remove("is-leaving");
        c.classList.toggle("is-active", i === next);
      });

      // outgoing card slides down out of frame, in front, over 1s
      if (typeof prev === "number" && prev !== next && cards[prev]) {
        var leaving = cards[prev];
        leaving.classList.add("is-leaving");
        setTimeout(function () { leaving.classList.remove("is-leaving"); }, 1000);
      }

      groups.forEach(function (g) {
        var i = parseInt(g.getAttribute("data-index"), 10);
        g.classList.toggle("is-active", i === next);
      });

      tabs.forEach(function (t, i) {
        t.classList.toggle("is-active", i <= next);
        t.classList.toggle("is-current", i === next);
        t.setAttribute("aria-selected", i === next ? "true" : "false");
      });

      lines.forEach(function (l, i) {
        l.classList.toggle("is-active", i === next);
        l.classList.toggle("is-done", i < next);
      });

      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === next);
        d.classList.toggle("is-done", i < next);
        if (i > next) {
          var p = d.querySelector(".hws-dot-progress");
          if (p) p.style.width = "0%";
        }
      });
    }

    function goTo(index) {
      var prev = current;
      current = ((index % count) + count) % count;
      if (current === 0) clearProgress();
      render(current, prev);
      elapsed = 0;
      bars(current).forEach(function (b) { b.style.width = "0%"; });
    }

    function tick() {
      elapsed += TICK;
      var pct = Math.min(100, (elapsed / duration) * 100);
      bars(current).forEach(function (b) { b.style.width = pct + "%"; });
      if (elapsed >= duration) goTo(current + 1);
    }

    function start() {
      if (reduced || timer || count < 2) return;
      timer = setInterval(tick, TICK);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        goTo(parseInt(tab.getAttribute("data-index"), 10));
      });
    });
    dots.forEach(function (track) {
      var btn = track.querySelector(".hws-dot");
      if (!btn) return;
      btn.addEventListener("click", function () {
        goTo(parseInt(track.getAttribute("data-index"), 10));
      });
    });

    if (pauseOnHover) {
      stage.addEventListener("mouseenter", stop);
      stage.addEventListener("mouseleave", start);
      stage.addEventListener("focusin", stop);
      stage.addEventListener("focusout", start);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    // don't animate off-screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.15 }).observe(stage);
    }

    render(0);
    start();
  }

  /* Feed the true content width to CSS for the full-bleed panel.
     100vw includes the scrollbar, which would push the page sideways. */
  function syncViewportWidth() {
    var w = document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--hws-vw", w + "px");
  }

  function initAll() {
    syncViewportWidth();
    var roots = document.querySelectorAll("[data-hws-hero]");
    Array.prototype.forEach.call(roots, initHero);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncViewportWidth, 120);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // HubSpot's page editor swaps markup in without a page reload, and
  // themes sometimes inject modules late. Watch for new instances
  // instead of relying on a single load event.
  if ("MutationObserver" in window) {
    var mo = new MutationObserver(function () {
      if (document.querySelector("[data-hws-hero]:not([data-hws-ready])")) initAll();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // belt and braces for slow/late renders
  window.addEventListener("load", initAll);
})();
