VERSION = $(shell python setup.py --version)
APP_VERSION = ${shell python setup.py --version | sed s/[.]/-/g}
PROJECT_ID=${shell gcloud config list --format 'value(core.project)'}

release_test:
	rm -rf dist build woven_gutter_gae.egg-info .eggs
	python setup.py sdist bdist_wheel
	twine upload --repository-url https://test.pypi.org/legacy/ dist/*

release:
	rm -rf dist build woven_gutter_gae.egg-info .eggs
	git tag $(VERSION) -f
	git push origin $(VERSION) -f
	git push origin master
	python setup.py sdist bdist_wheel
	twine upload --repository-url https://upload.pypi.org/legacy/ dist/*

deploy:
	rm -rf build dist requirements.txt frontend/node_modules
	pipenv lock -r > requirements.txt
	(cd frontend && npm install && npm run build:${ENV})
	gcloud app deploy -v $(APP_VERSION) --project=$(PROJECT_ID) -q --no-promote

.PHONY: deploy
