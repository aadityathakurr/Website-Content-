// 06-team: paste into this HubSpot module's module.js
(function(){
  // Team: a row of cards (3 on desktop, 2 on tablets, 1 on phones) that moves one card at a time in an endless loop, using copies of the cards before and after the real ones; arrows, auto-advance every 4s (pauses while the cursor is on a card), swipe
  (function(){
    var root=document.getElementById('teamCarousel'); if(!root) return;
    var stage=root.querySelector('.tc-stage'), track=root.querySelector('.tc-track');
    var real=[].slice.call(track.children), total=real.length, timer=null, hover=false, keyFocus=false, busy=false, moveTimer=null;
    var still=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function copy(c){ var k=c.cloneNode(true); k.setAttribute('aria-hidden','true'); [].forEach.call(k.querySelectorAll('a'),function(a){a.setAttribute('tabindex','-1')}); return k; }
    real.slice().reverse().forEach(function(c){ track.insertBefore(copy(c),track.firstChild); });
    real.forEach(function(c){ track.appendChild(copy(c)); });
    var pos=total;
    function step(){ var c=track.children; return c[1].getBoundingClientRect().left-c[0].getBoundingClientRect().left; }
    function place(animate){
      track.style.transition=animate&&!still?'':'none';
      track.style.transform='translateX('+(-pos*step())+'px)';
      if(!animate||still){ void track.offsetWidth; track.style.transition=''; }
    }
    // after a move ends on a copy, jump without animation to the same card in the real set (a timer, so it never gets stuck)
    function settle(){ busy=false; if(pos>=total*2){pos-=total;place(false)} else if(pos<total){pos+=total;place(false)} }
    function go(n){ if(busy) return; clearTimeout(moveTimer); pos=n; busy=true; place(true); moveTimer=setTimeout(settle,still?0:820); }
    function play(){ stop(); if(still||hover||keyFocus) return; timer=setInterval(function(){go(pos+1)},4000); }
    function stop(){ if(timer){clearInterval(timer);timer=null;} }
    document.getElementById('tcPrev').addEventListener('click',function(){go(pos-1);play()});
    document.getElementById('tcNext').addEventListener('click',function(){go(pos+1);play()});
    // pause only while the cursor is on a card (not the gaps or arrows); keyboard focus pauses too, a mouse click never does
    track.addEventListener('mouseover',function(e){ var on=!!e.target.closest('.tc-card'); if(on!==hover){hover=on; if(on) stop(); else play();} });
    track.addEventListener('mouseleave',function(){ if(hover){hover=false;play()} });
    root.addEventListener('focusin',function(e){ var kb=false; try{kb=e.target.matches(':focus-visible')}catch(err){} if(kb){keyFocus=true;stop()} });
    root.addEventListener('focusout',function(){ if(keyFocus){keyFocus=false;play()} });
    // swipe on touch screens: the row follows the finger; a quick flick or a 40px drag moves one card
    var sx=0, sy=0, dx=0, t0=0, mode=null, swiped=0;
    stage.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; sy=e.touches[0].clientY; dx=0; mode=null; t0=Date.now(); stop(); },{passive:true});
    stage.addEventListener('touchmove',function(e){
      var mx=e.touches[0].clientX-sx, my=e.touches[0].clientY-sy;
      if(!mode&&(Math.abs(mx)>6||Math.abs(my)>6)) mode=Math.abs(mx)>Math.abs(my)?'x':'y';
      if(mode!=='x'||busy) return;
      dx=mx; swiped=Date.now(); track.style.transition='none'; track.style.transform='translateX('+(-pos*step()+dx)+'px)';
    },{passive:true});
    function swipeEnd(){
      if(mode==='x'&&!busy){ if(Math.abs(dx)>40||(Math.abs(dx)>20&&Date.now()-t0<300)) go(dx<0?pos+1:pos-1); else place(true); }
      mode=null; dx=0; setTimeout(play,4000);
    }
    stage.addEventListener('touchend',swipeEnd); stage.addEventListener('touchcancel',swipeEnd);
    // phones and touch screens: a tap on a photo opens that person's LinkedIn (a swipe never does)
    var touch=window.matchMedia('(max-width:760px), (hover:none)');
    track.addEventListener('click',function(e){
      if(!touch.matches||!e.target.closest('.tc-photo')||Date.now()-swiped<500) return;
      var link=e.target.closest('.tc-card').querySelector('.tc-profile'); if(link) window.open(link.href,'_blank','noopener');
    });
    var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(function(){ clearTimeout(moveTimer); settle(); place(false); },120); });
    place(false); play();
  })();
})();
