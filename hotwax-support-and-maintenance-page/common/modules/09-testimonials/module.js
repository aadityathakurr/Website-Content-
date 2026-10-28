// 09-testimonials: paste into this HubSpot module's module.js
(function(){
  // Testimonials on phones: one full card at a time, looping in one direction like the steps; swipe and auto-slide (pauses on touch)
  (function(){
    var box=document.getElementById('voices'); if(!box) return;
    var cards=[].slice.call(box.querySelectorAll('.voice')), n=cards.length, pos=1, tm=null, timer=null, phone=window.matchMedia('(max-width:760px)');
    var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function copy(el){ var c=el.cloneNode(true); c.classList.add('is-clone'); c.setAttribute('aria-hidden','true'); [].forEach.call(c.querySelectorAll('[id]'),function(x){x.removeAttribute('id')}); return c; }
    box.insertBefore(copy(cards[n-1]),box.firstChild); box.appendChild(copy(cards[0]));
    function place(dx,animate){
      if(!phone.matches){ box.style.transform=''; return; }
      box.classList.toggle('is-dragging',!animate);
      box.style.transform='translateX('+(-pos*(box.offsetWidth+(parseFloat(getComputedStyle(box).columnGap)||0))+(dx||0))+'px)';
    }
    function mark(){ var cur=((pos-1)%n+n)%n; cards.forEach(function(c,k){ if(phone.matches&&k!==cur) c.setAttribute('aria-hidden','true'); else c.removeAttribute('aria-hidden'); }); }
    function settle(){ if(pos===0){pos=n;place(0,false);} else if(pos===n+1){pos=1;place(0,false);} }
    function step(d){ clearTimeout(tm); settle(); void box.offsetWidth; pos+=d; place(0,true); mark(); tm=setTimeout(settle,520); }
    function stop(){ if(timer){clearInterval(timer);timer=null;} }
    function play(){ stop(); if(still||!phone.matches) return; timer=setInterval(function(){step(1)},5000); }
    var sx=0, sy=0, dx=0, t0=0, mode=null;
    box.addEventListener('touchstart',function(e){ if(!phone.matches) return; stop(); clearTimeout(tm); settle(); sx=e.touches[0].clientX; sy=e.touches[0].clientY; dx=0; mode=null; t0=Date.now(); },{passive:true});
    box.addEventListener('touchmove',function(e){
      if(!phone.matches) return;
      var mx=e.touches[0].clientX-sx, my=e.touches[0].clientY-sy;
      if(!mode&&(Math.abs(mx)>6||Math.abs(my)>6)) mode=Math.abs(mx)>Math.abs(my)?'x':'y';
      if(mode!=='x') return;
      dx=mx; place(dx,false);
    },{passive:true});
    function swipeEnd(){
      if(mode==='x'&&(Math.abs(dx)>40||(Math.abs(dx)>20&&Date.now()-t0<300))) step(dx<0?1:-1); else place(0,true);
      mode=null; dx=0; setTimeout(play,3000);
    }
    box.addEventListener('touchend',swipeEnd); box.addEventListener('touchcancel',swipeEnd);
    function reset(){ clearTimeout(tm); settle(); place(0,false); mark(); play(); }
    if(phone.addEventListener) phone.addEventListener('change',reset); else phone.addListener(reset);
    window.addEventListener('resize',function(){ place(0,false); });
    reset();
  })();
})();
