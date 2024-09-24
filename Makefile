all: deploy

deploy:
	npm run build && \
	scp -r dist/ test_user@178.208.94.22:/home/test_user/