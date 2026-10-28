// 11-mobile-sticky-cta: paste into this HubSpot module's module.js
(function(){
  // mobile bar
  var bar=document.getElementById('mbar'), hero=document.querySelector('.hero'), talk=document.getElementById('talk');
  function onScroll(){
    var h=hero.getBoundingClientRect().bottom, t=talk.getBoundingClientRect().top;
    bar.classList.toggle('show', h<0 && t>window.innerHeight*0.6);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
})();
