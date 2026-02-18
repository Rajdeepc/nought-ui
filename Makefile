# Nought - Build System

.PHONY: dist css js clean size publish

CSS_FILES = src/css/01-theme.css \
	src/css/00-base.css \
	src/css/grid.css \
	src/css/button.css \
	src/css/form.css \
	src/css/table.css \
	src/css/card.css \
	src/css/badge.css \
	src/css/alert.css \
	src/css/progress.css \
	src/css/spinner.css \
	src/css/navbar.css \
	src/css/tabs.css \
	src/css/accordion.css \
	src/css/dialog.css \
	src/css/dropdown.css \
	src/css/toast.css \
	src/css/drawer.css \
	src/css/skeleton.css \
	src/css/tooltip.css \
	src/css/utilities.css

JS_FILES = src/js/base.js \
	src/js/tabs.js \
	src/js/dropdown.js \
	src/js/toast.js \
	src/js/init.js

dist: css js size

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/nought.css
	@./node_modules/.bin/esbuild dist/nought.css --minify --outfile=dist/nought.min.css 2>/dev/null || \
		npx esbuild dist/nought.css --minify --outfile=dist/nought.min.css
	@gzip -9 -k -f dist/nought.min.css
	@cp dist/nought.min.css docs/static/nought.min.css
	@echo "CSS: $$(wc -c < dist/nought.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@cat $(JS_FILES) > dist/nought.js
	@./node_modules/.bin/esbuild dist/nought.js --minify --outfile=dist/nought.min.js 2>/dev/null || \
		npx esbuild dist/nought.js --minify --outfile=dist/nought.min.js
	@gzip -9 -k -f dist/nought.min.js
	@cp dist/nought.min.js docs/static/nought.min.js
	@echo "JS: $$(wc -c < dist/nought.min.js | tr -d ' ') bytes (minified)"

clean:
	@rm -rf dist

size:
	@echo ""
	@echo "Bundle:"
	@echo "CSS (src): $$(wc -c < dist/nought.css | tr -d ' ') bytes"
	@echo "CSS (min): $$(wc -c < dist/nought.min.css | tr -d ' ') bytes"
	@echo "CSS (gzip): $$(wc -c < dist/nought.min.css.gz | tr -d ' ') bytes"
	@echo ""
	@echo "JS (src): $$(wc -c < dist/nought.js | tr -d ' ') bytes"
	@echo "JS (min): $$(wc -c < dist/nought.min.js | tr -d ' ') bytes"
	@echo "JS (gzip): $$(wc -c < dist/nought.min.js.gz | tr -d ' ') bytes"

publish: clean dist
	@cp -r src/css dist/css
	@cp -r src/js dist/js
	@cp README.md dist/README.md
	@cp LICENSE dist/LICENSE
	@VERSION=$$(git describe --tags --abbrev=0 | sed 's/^v//') && \
		sed 's/"version-0.0.0"/"'"$$VERSION"'"/' package.json > dist/package.json
	@cd dist && npm publish --access public
