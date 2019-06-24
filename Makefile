VERSION = $(shell python setup.py --version)

TEST_RESULTS_DIR=test_results
XUNIT_DIR=${TEST_RESULTS_DIR}/xunit
XUNIT_FILE=nosetests.xml
XUNIT_FILENAME=${XUNIT_DIR}/${XUNIT_FILE}

test:
	python setup.py nosetests

test-xunit: ${XUNIT_DIR}
	python setup.py nosetests --verbosity=2 --with-xunit --xunit-file=${XUNIT_FILENAME}

${XUNIT_DIR}:
	mkdir -p ${XUNIT_DIR}

lint:
	python setup.py flake8

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

watch:
	bundle exec guard

deploy:
	gcloud app deploy -v $(APP_VERSION) --project=$(PROJECT) -q --no-promote

.PHONY: test test-xunit lint release watch
