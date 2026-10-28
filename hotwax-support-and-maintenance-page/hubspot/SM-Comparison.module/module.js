// HotWax Systems | Module: S&M Comparison
// Scroll reveal for the heading, the table and the phone cards (only when they start below the first screen).
// The phone view needs no script: every answer is visible. Works for several copies on one page.
(function () {
  // Scroll reveal, only for parts that start below the first screen
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-hidden');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  [].forEach.call(document.querySelectorAll('.hwx-cmp--reveal .hwx-cmp__head, .hwx-cmp--reveal .hwx-cmp__table-wrap, .hwx-cmp--reveal .hwx-cmp__mobile'), function (el) {
    if (el.offsetParent === null || el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('is-hidden');
    requestAnimationFrame(function () { el.classList.add('is-ready'); });
    io.observe(el);
  });
})();
