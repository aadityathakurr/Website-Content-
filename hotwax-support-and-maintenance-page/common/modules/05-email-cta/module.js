// 05-email-cta: paste into this HubSpot module's module.js
(function(){
  // Mid-page email CTA (preview only; on HubSpot this is a HubSpot form)
  var cb=document.getElementById('ctaBarForm');
  if(cb){ cb.addEventListener('submit',function(e){ e.preventDefault();
    var em=document.getElementById('cta-email'), msg=document.getElementById('ctaBarMsg');
    if(!/^\S+@\S+\.\S+$/.test(em.value)){ msg.textContent='Enter a valid work email.'; em.focus(); return; }
    msg.textContent='Thanks. An Apache OFBiz expert will be in touch.'; em.value=''; }); }
})();
