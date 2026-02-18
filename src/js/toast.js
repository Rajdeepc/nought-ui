;(function() {
  const N = window.Nought;
  const qs = N._qs;
  const d = document;

  N.toast = {
    _container: null,
    _ensure() {
      if (!this._container) {
        this._container = d.createElement('div');
        this._container.className = 'n-toast-container';
        this._container.setAttribute('aria-live', 'polite');
        d.body.appendChild(this._container);
      }
    },
    show(message, type, duration) {
      type = type || 'info';
      duration = duration !== undefined ? duration : 4000;
      this._ensure();
      const toast = d.createElement('div');
      toast.className = 'n-toast n-toast-' + type;
      toast.setAttribute('role', 'alert');
      toast.innerHTML = '<span>' + message + '</span><button class="n-toast-close" aria-label="Close">&times;</button>';
      this._container.appendChild(toast);
      qs('.n-toast-close', toast).onclick = () => this._dismiss(toast);
      if (duration) setTimeout(() => this._dismiss(toast), duration);
      return toast;
    },
    _dismiss(toast) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }
  };
})();
