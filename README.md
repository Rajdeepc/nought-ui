# Nought

> Semantic, minimal, zero dependencies. ~8KB CSS and JS.

Nought is an ultra-lightweight HTML + CSS, semantic UI component library with zero dependencies. No framework, build, or dev complexity. Just include the tiny CSS and JS files and you are good to go building decent looking web applications with most commonly needed components and elements.

I built this after getting sick of the ridiculous bloat, dependencies, and rug-pulls in JavaScript UI/component libraries.

See live demo and docs at [**nought-ui.dev**](https://nought-ui.dev)

---

### Install

**Plain HTML (recommended)**
```html
<link rel="stylesheet" href="nought.min.css">
<script src="nought.min.js"></script>
```

**NPM**
```
npm install nought-ui
```

**CDN**
```html
<link rel="stylesheet" href="https://unpkg.com/nought-ui/nought.min.css">
<script src="https://unpkg.com/nought-ui/nought.min.js"></script>
```

### What's included

- **~5KB CSS** (minified + gzipped) — 25+ components
- **~2KB JS** (minified + gzipped) — Tabs, accordion, modal, dropdown, toast, drawer, dark mode
- Built-in dark mode with system preference detection
- ARIA-first accessibility
- CSS custom properties for theming
- Zero external dependencies

### Individual components

Don't need the full bundle? Import only what you use. The source is organized by component:

```
src/
  core/           ← always include these
    theme.css
    base.css
    base.js
    init.js
    utilities.css
  components/     ← pick what you need
    button/button.css
    card/card.css
    tabs/tabs.css + tabs.js
    toast/toast.css + toast.js
    ...
```

**Core** (`src/core/`) provides the theme, resets, and JS runtime — include it first. Then add any component folder's CSS (and JS if it has one).

For example, to use only buttons and tabs:

```html
<!-- Core (required) -->
<link rel="stylesheet" href="core/theme.css">
<link rel="stylesheet" href="core/base.css">
<script src="core/base.js"></script>

<!-- Components (pick what you need) -->
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/tabs/tabs.css">
<script src="components/tabs/tabs.js"></script>

<!-- Init (load last — wires up data-attribute delegation) -->
<script src="core/init.js"></script>
```

Via npm, the same applies:

```html
<link rel="stylesheet" href="node_modules/nought-ui/core/theme.css">
<link rel="stylesheet" href="node_modules/nought-ui/core/base.css">
<link rel="stylesheet" href="node_modules/nought-ui/components/button/button.css">
```

Components with JS: `accordion`, `dialog`, `drawer`, `dropdown`, `tabs`, `toast`.
All other components are CSS-only — no JS needed.

### Build

```
make dist
```

Requires: `esbuild` (optional, falls back to basic minification)
