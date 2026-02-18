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

### Build

```
make dist
```

Requires: `esbuild` (optional, falls back to basic minification)
