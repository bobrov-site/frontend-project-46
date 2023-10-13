install:
	npm ci
	
gendiff:
	node gendiff.js
	
lint:
	npx eslint .

fix: 
	npx eslint --fix .