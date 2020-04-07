.PHONY: build

setup: clean
	npm install

clean:
	rm -rf node_modules

start:
	npm start

build:
	npm run build
