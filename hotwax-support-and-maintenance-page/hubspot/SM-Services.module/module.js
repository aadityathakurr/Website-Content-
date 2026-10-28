// HotWax Systems | Module: S&M Services
// Phones: each description shows one line with a "Know more" link; tapping it shows the full text
// (the link turns into "Show less") and the icon pops. The link hides itself when a description
// already fits on one line. All sizes: optional scroll reveal. Works for several copies on one page.
(function () {
  var phone = window.matchMedia('(max-width:760px)');

  [].forEach.call(document.querySelectorAll('.hwx-svc--clamp'), function (section) {
    var more = section.getAttribute('data-more') || 'Know more';
    var less = section.getAttribute('data-less') || 'Show less';
    var items = [].slice.call(section.querySelectorAll('.hwx-svc__item'));

    items.forEach(function (item) {
      var text = item.querySelector('.hwx-svc__text');
      if (!text) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hwx-svc__more';
      b.textContent = more;
      b.setAttribute('aria-expanded', 'false');
      if (text.id) b.setAttribute('aria-controls', text.id);
      text.insertAdjacentElement('afterend', b);
      b.addEventListener('click', function () {
        var on = !item.classList.contains('is-open');
        item.classList.toggle('is-open', on);
        b.textContent = on ? less : more;
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    });

    function check() {
      items.forEach(function (item) {
        var text = item.querySelector('.hwx-svc__text'), b = item.querySelector('.hwx-svc__more');
        if (!text || !b || item.classList.contains('is-open')) return;
        b.hidden = phone.matches && text.scrollHeight <= text.clientHeight + 1;
      });
    }
    window.addEventListener('resize', check);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    check();
  });

  // Scroll reveal for the heading and each service, only when they start below the first screen
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-hidden');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  [].forEach.call(document.querySelectorAll('.hwx-svc--reveal .hwx-svc__head, .hwx-svc--reveal .hwx-svc__item'), function (el, i) {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    el.classList.add('is-hidden');
    requestAnimationFrame(function () { el.classList.add('is-ready'); });
    io.observe(el);
  });
})();
