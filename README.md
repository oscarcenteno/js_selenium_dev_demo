# js_selenium_dev_demo
Running samples from Selenium.dev website done during my personal study. Created from scratch.

Shows the use of Mocha as main test runner, which eases the debugging of tests inside vscode, and also using the test explorer extension.

## Running tests in local browsers

```bash
# Run any of the next commands in the local bash shell
BROWSER=chrome SELENIUM_HOST=localhost npm run test
BROWSER=firefox SELENIUM_HOST=localhost npm run test
BROWSER=edge SELENIUM_HOST=localhost npm run test
```

Do the same with the vscode Test Runner by setting your .env file as:

```env
BROWSER = chrome # chrome, firefox, edge
SELENIUM_HOST = localhost
```

## Starting docker containers

Reference: https://www.testmo.com/guides/github-actions-selenium

```bash
# To start all our four containers, simply change to the dev directory in our project and launch the containers with the
cd dev
docker compose up -d

# enter our node container by launching a shell with 
docker compose exec node bash

# When finished, leave the shell & container by pressing Ctrl+D

# Then from outside the container, you can shut everything down
$ docker compose down

# Running tests in docker image browsers
# Run any of the next commands in the bash shell inside the "node" docker container
BROWSER=chrome SELENIUM_HOST=chrome npm run test
BROWSER=firefox SELENIUM_HOST=firefox npm run test
BROWSER=edge SELENIUM_HOST=edge npm run test

```

## Github Actions

- Parallel test runs workflow (test-parallel.yml): runs tests in parallel on different browsers within Docker containers.