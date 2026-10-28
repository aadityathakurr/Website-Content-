// 10-contact-form-and-faq: paste into this HubSpot module's module.js
(function(){
  // FAQ: one open at a time; opens on hover where a mouse is available, on tap elsewhere
  var faqItems=[].slice.call(document.querySelectorAll('[data-faq] .faq__item'));
  var canHover=window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  function openFaq(it){faqItems.forEach(function(o){var on=o===it;o.classList.toggle('is-open',on);o.querySelector('.faq__q').setAttribute('aria-expanded',on?'true':'false')})}
  faqItems.forEach(function(it){
    var q=it.querySelector('.faq__q');
    q.addEventListener('click',function(){ openFaq(it.classList.contains('is-open')&&!canHover?null:it) });
    if(canHover) it.addEventListener('mouseenter',function(){openFaq(it)});
  });
  if(faqItems[0]) openFaq(faqItems[0]);

  // form (preview only: on HubSpot this is the HubSpot form module)
  var form=document.getElementById('leadForm');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    ['f-name','f-email','f-company'].forEach(function(id){
      var el=document.getElementById(id), bad=!el.value.trim() || (el.type==='email' && !/^\S+@\S+\.\S+$/.test(el.value));
      el.style.borderColor=bad?'#E70000':''; el.setAttribute('aria-invalid',bad?'true':'false');
      if(bad && ok){ el.focus(); ok=false; }
    });
    if(!ok) return;
    form.innerHTML='<div class="form-done"><h3>Thanks, we have your request.</h3><p>An Apache OFBiz engineer at HotWax Systems will reply to the email you shared.</p></div>';
  });
})();
