// <n-modal> — Overlay dialog element
// Server renders: hidden (no .open class). This element adds open/close behavior.
;(function() {
  const N = Nought, qs = N._qs, d = document;

  class NModal extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', this);
      this._esc = e => { if (e.key === 'Escape' && qs('.n-modal-overlay.open', this)) this.close() };
      d.addEventListener('keydown', this._esc);
    }
    disconnectedCallback() { d.removeEventListener('keydown', this._esc) }
    open() {
      const o = qs('.n-modal-overlay', this);
      if (!o) return; o.classList.add('open'); o.setAttribute('aria-hidden', 'false');
      this._prev = d.activeElement;
      const c = qs('.n-modal-close', this); if (c) c.focus();
      this.dispatchEvent(new Event('open'));
    }
    close() {
      const o = qs('.n-modal-overlay', this);
      if (!o) return; o.classList.remove('open'); o.setAttribute('aria-hidden', 'true');
      if (this._prev) this._prev.focus();
      this.dispatchEvent(new Event('close'));
    }
    handleEvent(e) {
      if (e.target.closest('.n-modal-close') || (e.target.classList && e.target.classList.contains('n-modal-overlay')))
        this.close();
    }
  }
  customElements.define('n-modal', NModal);
})();
