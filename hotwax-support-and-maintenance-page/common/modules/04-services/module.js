// 04-services: paste into this HubSpot module's module.js
(function(){
  // Services on phones: each description shows one line with "Know more"; tapping it shows the full text
  (function(){
    var items=[].slice.call(document.querySelectorAll('.svc')); if(!items.length) return;
    var phone=window.matchMedia('(max-width:760px)');
    items.forEach(function(x,i){
      var p=x.querySelector('p'); if(!p) return;
      p.id=p.id||('svc-d'+(i+1));
      var b=document.createElement('button');
      b.type='button'; b.className='svc-more'; b.textContent='Know more';
      b.setAttribute('aria-expanded','false'); b.setAttribute('aria-controls',p.id);
      p.insertAdjacentElement('afterend',b);
      b.addEventListener('click',function(){
        var on=!x.classList.contains('is-open');
        x.classList.toggle('is-open',on);
        b.textContent=on?'Show less':'Know more';
        b.setAttribute('aria-expanded',on?'true':'false');
      });
    });
    // hide "Know more" when a description already fits on one line
    function check(){
      items.forEach(function(x){
        var p=x.querySelector('p'), b=x.querySelector('.svc-more'); if(!p||!b) return;
        if(x.classList.contains('is-open')) return;
        b.hidden=phone.matches && p.scrollHeight<=p.clientHeight+1;
      });
    }
    window.addEventListener('resize',check);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    check();
  })();
})();
