.PHONY: build

setup: clean
	npm install

clean:
	rm -rf node_modules

start:
	npm start

build: test
	npm run build

test:
	CI=true npm run test
