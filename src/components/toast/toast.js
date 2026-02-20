// <n-toast-area> — Toast notification container
// Place once in your HTML. Server can pre-render; toasts are added dynamically.
;(function() {
  const d = document;

  class NToastArea extends HTMLElement {
    connectedCallback() {
      if (!this.getAttribute('aria-live')) this.setAttribute('aria-live', 'polite');
      if (!this.getAttribute('role')) this.setAttribute('role', 'status');
    }
    show(message, type, duration) {
      type = type || 'info';
      duration = duration !== undefined ? duration : 4000;
      const t = d.createElement('div');
      t.className = 'n-toast n-toast-' + type;
      t.setAttribute('role', 'alert');
      const span = d.createElement('span');
      span.textContent = message;
      const btn = d.createElement('button');
      btn.className = 'n-toast-close';
      btn.setAttribute('aria-label', 'Close');
      btn.textContent = '\u00d7';
      btn.onclick = () => this._dismiss(t);
      t.append(span, btn);
      this.appendChild(t);
      if (duration) setTimeout(() => this._dismiss(t), duration);
      return t;
    }
    _dismiss(t) {
      t.style.opacity = '0';
      t.style.transform = 'translateX(100%)';
      t.style.transition = 'all 300ms ease';
      setTimeout(() => t.remove(), 300);
    }
  }
  customElements.define('n-toast-area', NToastArea);

  Nought.toast = {
    show(msg, type, dur) {
      let area = d.querySelector('n-toast-area');
      if (!area) { area = d.createElement('n-toast-area'); d.body.appendChild(area); }
      return area.show(msg, type, dur);
    }
  };
})();
