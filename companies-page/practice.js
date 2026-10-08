(() => {
  const buttons = [...document.querySelectorAll('.practice__tab')];
  function select(index, focus = false) {
    if (window.matchMedia('(max-width: 700px)').matches) {
      const button = buttons[index];
      const expanded = focus || button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
      if (focus) button.focus({ preventScroll: true });
      return;
    }
    buttons.forEach((button, i) => {
      button.setAttribute('aria-expanded', String(i === index));
      document.getElementById(button.getAttribute('aria-controls')).hidden = i !== index;
    });
    if (focus) buttons[index].focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let next;
      if (event.key in offsets) next = (index + offsets[event.key] + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });
})();
