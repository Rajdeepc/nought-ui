;(function() {
  const N = window.Nought;
  const on = N._on, qs = N._qs, qsa = N._qsa;
  const d = document;

  N.dropdown = {
    init() {
      qsa('.n-dropdown').forEach(dd => {
        const trigger = qs('[data-toggle="dropdown"]', dd);
        const menu = qs('.n-dropdown-menu', dd);
        if (!trigger || !menu) return;
        on(trigger, 'click', e => {
          e.stopPropagation();
          const open = menu.classList.toggle('open');
          trigger.setAttribute('aria-expanded', String(open));
        });
        qsa('.n-dropdown-item', menu).forEach(item => {
          on(item, 'click', () => {
            menu.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          });
        });
      });
      on(d, 'click', () => {
        qsa('.n-dropdown-menu.open').forEach(m => {
          m.classList.remove('open');
          const t = qs('[data-toggle="dropdown"]', m.parentElement);
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      });
    }
  };
})();
