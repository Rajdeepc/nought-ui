// <n-accordion> — Collapsible sections
// Server renders: first item expanded (aria-expanded="true", max-height set).
;(function() {
  const qsa = Nought._qsa;

  class NAccordion extends HTMLElement {
    connectedCallback() { this.addEventListener('click', this) }
    disconnectedCallback() { this.removeEventListener('click', this) }
    handleEvent(e) {
      const trigger = e.target.closest('.n-accordion-trigger');
      if (!trigger || !this.contains(trigger)) return;
      const content = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (!this.hasAttribute('multiple')) {
        qsa('.n-accordion-trigger', this).forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = null;
        });
      }
      trigger.setAttribute('aria-expanded', String(!isOpen));
      content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
    }
  }
  customElements.define('n-accordion', NAccordion);
})();
