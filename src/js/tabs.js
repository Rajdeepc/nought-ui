;(function() {
  const N = window.Nought;
  const on = N._on, qs = N._qs, qsa = N._qsa;

  N.tabs = {
    init(container) {
      qsa(container || '.n-tabs').forEach(tabBar => {
        const tabs = qsa('.n-tab', tabBar);
        const parent = tabBar.parentElement;
        tabs.forEach(tab => {
          on(tab, 'click', () => {
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false') });
            qsa('.n-tab-panel', parent).forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = qs(`#${tab.getAttribute('aria-controls')}`, parent);
            if (panel) panel.classList.add('active');
          });
          on(tab, 'keydown', e => {
            const idx = tabs.indexOf(tab);
            let next;
            if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
            else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
            if (next) { next.focus(); next.click(); }
          });
        });
      });
    }
  };
})();
