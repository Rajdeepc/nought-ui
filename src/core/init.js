// Backward-compat: data-attribute delegation for non-custom-element usage
;(function() {
  const N = Nought, qs = N._qs, d = document;

  N.darkMode.init();

  d.addEventListener('click', e => {
    const btn = e.target.closest('[data-modal]');
    if (btn) { const m = e.target.closest('n-modal') || d.querySelector('n-modal'); if (m && m.open) m.open(); else N.modal.open(btn.dataset.modal); return; }
    const cl = e.target.closest('[data-modal-close]');
    if (cl) { const m = e.target.closest('n-modal'); if (m && m.close) m.close(); else N.modal.close(cl.dataset.modalClose); return; }
    const db = e.target.closest('[data-drawer]');
    if (db) { const dr = e.target.closest('n-drawer'); if (dr && dr.open) dr.open(); else N.drawer.open(db.dataset.drawer); return; }
    const dc = e.target.closest('[data-drawer-close]');
    if (dc) { const dr = e.target.closest('n-drawer'); if (dr && dr.close) dr.close(); else N.drawer.close(dc.dataset.drawerClose); }
  });
})();
