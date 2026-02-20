// <n-drawer> — Drawer overlay element
// Server renders: hidden (no .open class). This element adds open/close behavior.
;(function() {
  const N = Nought, qs = N._qs, d = document;

  class NDrawer extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', this);
      this._esc = e => { if (e.key === 'Escape' && qs('.n-drawer.open', this)) this.close() };
      d.addEventListener('keydown', this._esc);
    }
    disconnectedCallback() { d.removeEventListener('keydown', this._esc) }
    open() {
      const o = qs('.n-drawer-overlay', this), dr = qs('.n-drawer', this);
      if (o) o.classList.add('open'); if (dr) dr.classList.add('open');
      this._prev = d.activeElement;
      this.dispatchEvent(new Event('open'));
    }
    close() {
      const o = qs('.n-drawer-overlay', this), dr = qs('.n-drawer', this);
      if (o) o.classList.remove('open'); if (dr) dr.classList.remove('open');
      if (this._prev) this._prev.focus();
      this.dispatchEvent(new Event('close'));
    }
    handleEvent(e) {
      if (e.target.closest('[data-drawer-close]') || (e.target.classList && e.target.classList.contains('n-drawer-overlay')))
        this.close();
    }
  }
  customElements.define('n-drawer', NDrawer);
})();
