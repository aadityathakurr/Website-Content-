// Global script: scroll reveal for sections. Load once, at the end of the page.
(function(){
  // Scroll reveal: only for content below the first screen, so the page is complete at rest
  (function(){
    if(!('IntersectionObserver' in window)) return;
    if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var sel='.section .head,.problem-head,.signs li,.svc,.cta-bar,.team-copy,.tc,.voices-viewport,.flow-viewport,.switch-cta,.cmp,.cmpm,.cta-card,.closing__faq';
    var els=[].slice.call(document.querySelectorAll(sel)), vh=window.innerHeight;
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){
      if(el.getBoundingClientRect().top < vh) return;
      var sib=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;
      el.style.transitionDelay=(Math.min(sib,5)%4*70)+'ms';
      el.classList.add('rv'); io.observe(el);
    });
  })();
})();
