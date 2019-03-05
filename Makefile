install: 
	npm install

start: 
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/json-before.json ./__tests__/__fixtures__/json-after.json

publish: 
	npm publish

lint: 
	npx eslint .

test:
	npm test