;(function(w, d) {
  'use strict';

  const N = {};
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const qs = (s, ctx) => (ctx || d).querySelector(s);
  const qsa = (s, ctx) => [...(ctx || d).querySelectorAll(s)];

  N.darkMode = {
    init(toggleSelector) {
      const stored = localStorage.getItem('n-theme');
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) d.documentElement.setAttribute('data-theme', 'dark');
      qsa(toggleSelector || '[data-toggle="theme"]').forEach(btn => {
        on(btn, 'click', () => {
          const isDark = d.documentElement.getAttribute('data-theme') === 'dark';
          d.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
          localStorage.setItem('n-theme', isDark ? 'light' : 'dark');
          btn.setAttribute('aria-pressed', String(!isDark));
        });
      });
    }
  };

  N.modal = {
    open(id) {
      const overlay = qs(`#${id}`);
      if (!overlay) return;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      const close = qs('.n-modal-close', overlay);
      if (close) close.focus();
      d._nLastFocus = d.activeElement;
    },
    close(id) {
      const overlay = qs(`#${id}`);
      if (!overlay) return;
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      if (d._nLastFocus) d._nLastFocus.focus();
    }
  };

  N.accordion = {
    init(container) {
      qsa(container || '.n-accordion').forEach(acc => {
        qsa('.n-accordion-trigger', acc).forEach(trigger => {
          on(trigger, 'click', () => {
            const content = trigger.nextElementSibling;
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            if (!acc.dataset.multiple) {
              qsa('.n-accordion-trigger', acc).forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                t.nextElementSibling.style.maxHeight = null;
              });
            }
            trigger.setAttribute('aria-expanded', String(!isOpen));
            content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
          });
        });
      });
    }
  };

  N.drawer = {
    open(id) {
      const overlay = qs(`#${id}-overlay`);
      const drawer = qs(`#${id}`);
      if (overlay) overlay.classList.add('open');
      if (drawer) drawer.classList.add('open');
      d._nLastFocus = d.activeElement;
    },
    close(id) {
      const overlay = qs(`#${id}-overlay`);
      const drawer = qs(`#${id}`);
      if (overlay) overlay.classList.remove('open');
      if (drawer) drawer.classList.remove('open');
      if (d._nLastFocus) d._nLastFocus.focus();
    }
  };

  N._on = on;
  N._qs = qs;
  N._qsa = qsa;
  w.Nought = N;
})(window, document);
