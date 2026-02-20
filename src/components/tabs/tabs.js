// <n-tabs> — Progressively enhanced tabbed interface
// Server renders: active tab + visible panel. This element adds switching.
;(function() {
  const qsa = Nought._qsa, qs = Nought._qs;

  class NTabs extends HTMLElement {
    connectedCallback() {
      this._tabs = qsa('.n-tab', this);
      this.addEventListener('click', this);
      this.addEventListener('keydown', this);
    }
    disconnectedCallback() {
      this.removeEventListener('click', this);
      this.removeEventListener('keydown', this);
    }
    handleEvent(e) {
      const tab = e.target.closest('.n-tab');
      if (!tab || !this.contains(tab)) return;
      if (e.type === 'click') {
        this._tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false') });
        qsa('.n-tab-panel', this).forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = qs('#' + tab.getAttribute('aria-controls'), this);
        if (panel) panel.classList.add('active');
      }
      if (e.type === 'keydown') {
        const idx = this._tabs.indexOf(tab);
        let next;
        if (e.key === 'ArrowRight') next = this._tabs[(idx + 1) % this._tabs.length];
        else if (e.key === 'ArrowLeft') next = this._tabs[(idx - 1 + this._tabs.length) % this._tabs.length];
        if (next) { next.focus(); next.click(); }
      }
    }
  }
  customElements.define('n-tabs', NTabs);
})();
