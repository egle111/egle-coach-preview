(() => {
  const nav = document.querySelector('.site-nav');
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

