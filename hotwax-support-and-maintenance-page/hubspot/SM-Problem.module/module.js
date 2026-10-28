// HotWax Systems | Module: S&M Problem
// Scroll reveal for the headline block and each list item. Runs only when "Reveal on scroll"
// is on, and only for items that start below the first screen, so the page is complete at rest.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sections = document.querySelectorAll('.hwx-problem--reveal');
  [].forEach.call(sections, function (section) {
    var items = section.querySelectorAll('.hwx-problem__head, .hwx-problem__sign');
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('is-hidden');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    [].forEach.call(items, function (el, i) {
      if (el.getBoundingClientRect().top < vh) return;
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      el.classList.add('is-hidden');
      // add the transition a frame later so the hidden state applies without animating
      requestAnimationFrame(function () { el.classList.add('is-ready'); });
      io.observe(el);
    });
  });
})();
