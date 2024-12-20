all: deploy

deploy:
	npm run build && \
	scp -r dist/ test_user@newtest:/home/test_user/