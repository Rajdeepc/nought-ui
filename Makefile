# Nought - Build System

.PHONY: dist css js clean size publish

CSS_FILES = src/core/theme.css \
	src/core/base.css \
	src/components/grid/grid.css \
	src/components/button/button.css \
	src/components/form/form.css \
	src/components/table/table.css \
	src/components/card/card.css \
	src/components/badge/badge.css \
	src/components/alert/alert.css \
	src/components/progress/progress.css \
	src/components/spinner/spinner.css \
	src/components/navbar/navbar.css \
	src/components/tabs/tabs.css \
	src/components/accordion/accordion.css \
	src/components/dialog/dialog.css \
	src/components/dropdown/dropdown.css \
	src/components/toast/toast.css \
	src/components/drawer/drawer.css \
	src/components/skeleton/skeleton.css \
	src/components/tooltip/tooltip.css \
	src/core/utilities.css

JS_FILES = src/core/base.js \
	src/components/tabs/tabs.js \
	src/components/accordion/accordion.js \
	src/components/dropdown/dropdown.js \
	src/components/dialog/dialog.js \
	src/components/drawer/drawer.js \
	src/components/toast/toast.js \
	src/core/init.js

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
	@cp -r src/core dist/core
	@cp -r src/components dist/components
	@cp README.md dist/README.md
	@cp LICENSE dist/LICENSE
	@VERSION=$$(git describe --tags --abbrev=0 | sed 's/^v//') && \
		sed 's/"version-0.0.0"/"'"$$VERSION"'"/' package.json > dist/package.json
	@cd dist && npm publish --access public
