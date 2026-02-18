;(function() {
  const N = window.Nought;
  const on = N._on;
  const qs = N._qs;
  const d = document;

  N.init = function() {
    N.darkMode.init();
    N.tabs.init();
    N.accordion.init();
    N.dropdown.init();

    on(d, 'click', e => {
      const btn = e.target.closest('[data-modal]');
      if (btn) { N.modal.open(btn.dataset.modal); return; }
      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) { N.modal.close(closeBtn.dataset.modalClose); return; }
      const overlay = e.target.closest('.n-modal-overlay');
      if (overlay && e.target === overlay) { N.modal.close(overlay.id); return; }
      const drawerBtn = e.target.closest('[data-drawer]');
      if (drawerBtn) { N.drawer.open(drawerBtn.dataset.drawer); return; }
      const drawerClose = e.target.closest('[data-drawer-close]');
      if (drawerClose) { N.drawer.close(drawerClose.dataset.drawerClose); return; }
      const drawerOverlay = e.target.closest('.n-drawer-overlay');
      if (drawerOverlay && e.target === drawerOverlay) { N.drawer.close(drawerOverlay.id.replace('-overlay', '')); }
    });

    on(d, 'keydown', e => {
      if (e.key === 'Escape') {
        const modal = qs('.n-modal-overlay.open');
        if (modal) N.modal.close(modal.id);
        const drawer = qs('.n-drawer.open');
        if (drawer) N.drawer.close(drawer.id);
      }
    });
  };

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', N.init);
  else N.init();
})();
