// <n-dropdown> — Click-toggled dropdown menu
// Server renders: menu hidden. This element toggles visibility.
;(function() {
  const qs = Nought._qs, qsa = Nought._qsa;
  const d = document;

  class NDropdown extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', this);
      this._close = () => {
        const m = qs('.n-dropdown-menu', this);
        if (m) { m.classList.remove('open'); const t = qs('[aria-haspopup]', this); if (t) t.setAttribute('aria-expanded', 'false'); }
      };
      d.addEventListener('click', this._close);
    }
    disconnectedCallback() { d.removeEventListener('click', this._close) }
    handleEvent(e) {
      const trigger = qs('[aria-haspopup]', this) || qs('[data-toggle="dropdown"]', this);
      const menu = qs('.n-dropdown-menu', this);
      if (!trigger || !menu) return;
      if (trigger.contains(e.target)) {
        e.stopPropagation();
        const open = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        return;
      }
      if (e.target.closest('.n-dropdown-item')) {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }
  }
  customElements.define('n-dropdown', NDropdown);
})();
