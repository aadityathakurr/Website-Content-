// 07-how-it-works: paste into this HubSpot module's module.js
(function(){
  // How-it-works steps on phones: one full card at a time, looping in one direction (after the last step the first slides in from the right, before the first the last slides in from the left); swipe drags and snaps, auto-slide every 5s pauses while touched
  (function(){
    var list=document.querySelector('.flow-steps'); if(!list) return;
    var items=[].slice.call(list.children), n=items.length, pos=1, cur=0, tm=null, timer=null, phone=window.matchMedia('(max-width:760px)');
    var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function copy(el){ var c=el.cloneNode(true); c.classList.add('is-clone'); c.setAttribute('aria-hidden','true'); [].forEach.call(c.querySelectorAll('[id]'),function(x){x.removeAttribute('id')}); return c; }
    var head=copy(items[n-1]), tail=copy(items[0]); list.insertBefore(head,items[0]); list.appendChild(tail);
    function place(dx,animate){
      if(!phone.matches){ list.style.transform=''; return; }
      list.classList.toggle('is-dragging',!animate);
      list.style.transform='translateX('+(-pos*(list.offsetWidth+(parseFloat(getComputedStyle(list).columnGap)||0))+(dx||0))+'px)';
    }
    function mark(){
      cur=((pos-1)%n+n)%n;
      items.forEach(function(li,k){ var on=k===cur; li.classList.toggle('is-current',phone.matches&&on); if(phone.matches&&!on) li.setAttribute('aria-hidden','true'); else li.removeAttribute('aria-hidden'); });
      head.classList.toggle('is-current',phone.matches&&pos===0); tail.classList.toggle('is-current',phone.matches&&pos===n+1);
    }
    // landing on a copy: jump, without animation, to the real card it shows
    function settle(){ if(pos===0){pos=n;place(0,false);} else if(pos===n+1){pos=1;place(0,false);} }
    function step(d){ clearTimeout(tm); settle(); void list.offsetWidth; pos+=d; place(0,true); mark(); tm=setTimeout(settle,520); }
    function stop(){ if(timer){clearInterval(timer);timer=null;} }
    function play(){ stop(); if(still||!phone.matches) return; timer=setInterval(function(){step(1)},5000); }
    var sx=0, sy=0, dx=0, t0=0, mode=null;
    list.addEventListener('touchstart',function(e){ if(!phone.matches) return; stop(); clearTimeout(tm); settle(); sx=e.touches[0].clientX; sy=e.touches[0].clientY; dx=0; mode=null; t0=Date.now(); },{passive:true});
    list.addEventListener('touchmove',function(e){
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
    list.addEventListener('touchend',swipeEnd); list.addEventListener('touchcancel',swipeEnd);
    function reset(){ clearTimeout(tm); settle(); place(0,false); mark(); play(); }
    if(phone.addEventListener) phone.addEventListener('change',reset); else phone.addListener(reset);
    window.addEventListener('resize',function(){ place(0,false); });
    reset();
  })();
})();
