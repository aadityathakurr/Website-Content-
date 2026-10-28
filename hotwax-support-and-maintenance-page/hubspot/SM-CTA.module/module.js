// HotWax Systems | Module: S&M CTA
// Scroll reveal for the card. Runs only when "Reveal on scroll" is on, and only when the card
// starts below the first screen. Form submission is handled by HubSpot, not by this file.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cards = document.querySelectorAll('.hwx-cta--reveal .hwx-cta__card');
  if (!cards.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-hidden');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  [].forEach.call(cards, function (card) {
    if (card.getBoundingClientRect().top < window.innerHeight) return;
    card.classList.add('is-hidden');
    requestAnimationFrame(function () { card.classList.add('is-ready'); });
    io.observe(card);
  });
})();
