(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const selector = '.section-label, .programme-overview__item, .programme-outcome__headline, .programme-outcome__points, .about-egle__portrait, .about-egle__copy, .about-egle__stat, .investment > h2, .investment-card, .programme > h2, .programme__alignment, .programme__module, .practice > h2, .delivery > h2, .delivery__option, .testimonial, .faq__item, .closing-contact > *, .individuals-recognition h2, .individuals-recognition__copy, .individuals-offers > h2, .individuals-offers__grid > article, .individuals-volunteer';
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll(selector).forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) return;
    element.classList.add('scroll-reveal');
    if (element.matches('.programme-overview__item, .about-egle__stat, .investment-card, .programme__module, .delivery__option, .individuals-offers__grid > article')) {
      const siblings = [...element.parentElement.children].filter(sibling => sibling.matches(selector));
      element.style.setProperty('--reveal-delay', (siblings.indexOf(element) % 4) * 85 + 'ms');
    }
    observer.observe(element);
  });
  motion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.scroll-reveal').forEach(element => element.classList.add('is-visible'));
    }
  });
})();
