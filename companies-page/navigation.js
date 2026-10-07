(() => {
  const nav = document.querySelector('.site-nav');
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

(() => {
  const cards = [...document.querySelectorAll('.investment-card')];
  function select(card) {
    const selected = card.getAttribute('aria-pressed') !== 'true';
    cards.forEach(item => {
      const active = item === card && selected;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }
  cards.forEach(card => {
    card.addEventListener('click', () => select(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(card);
      }
    });
  });
})();
