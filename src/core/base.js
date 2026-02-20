/*
 * Nought v1.0 — Custom Elements
 * Light DOM only. No Shadow DOM. SSR + RSC compatible.
 * Elements enhance server-rendered HTML via connectedCallback.
 */
;(function(w, d) {
  'use strict';

  const N = {};
  const qs = (s, c) => (c || d).querySelector(s);
  const qsa = (s, c) => [...(c || d).querySelectorAll(s)];

  // --- <n-theme-toggle> ---
  class NThemeToggle extends HTMLElement {
    connectedCallback() {
      const stored = localStorage.getItem('n-theme');
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark))
        d.documentElement.setAttribute('data-theme', 'dark');
      this.addEventListener('click', this);
    }
    handleEvent(e) {
      if (e.type === 'click') {
        const isDark = d.documentElement.getAttribute('data-theme') === 'dark';
        d.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('n-theme', isDark ? 'light' : 'dark');
        this.setAttribute('aria-pressed', String(!isDark));
      }
    }
  }
  customElements.define('n-theme-toggle', NThemeToggle);

  N.darkMode = { init() {
    const stored = localStorage.getItem('n-theme');
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark))
      d.documentElement.setAttribute('data-theme', 'dark');
  }};

  N.modal = {
    open(id) {
      const o = qs('#' + id); if (!o) return;
      o.classList.add('open'); o.setAttribute('aria-hidden', 'false');
      d._nLF = d.activeElement;
      const c = qs('.n-modal-close', o); if (c) c.focus();
    },
    close(id) {
      const o = qs('#' + id); if (!o) return;
      o.classList.remove('open'); o.setAttribute('aria-hidden', 'true');
      if (d._nLF) d._nLF.focus();
    }
  };

  N.drawer = {
    open(id) {
      const o = qs('#' + id + '-overlay'), dr = qs('#' + id);
      if (o) o.classList.add('open'); if (dr) dr.classList.add('open');
      d._nLF = d.activeElement;
    },
    close(id) {
      const o = qs('#' + id + '-overlay'), dr = qs('#' + id);
      if (o) o.classList.remove('open'); if (dr) dr.classList.remove('open');
      if (d._nLF) d._nLF.focus();
    }
  };

  N._qs = qs; N._qsa = qsa;
  w.Nought = N;
})(window, document);
