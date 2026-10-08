(() => {
  const nav = document.querySelector('.site-nav');
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


(() => {
 const nav = document.querySelector('.site-nav');
 const toggle = nav.querySelector('.site-nav__toggle');
 const links = nav.querySelector('.site-nav__links');
 const mobile = window.matchMedia('(max-width: 800px)');
 const setOpen = open => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  links.inert = mobile.matches && !open;
 };
 toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
 links.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
 document.addEventListener('click', event => { if (!nav.contains(event.target)) setOpen(false); });
 document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
 mobile.addEventListener('change', () => setOpen(false));
 setOpen(false);
})();
