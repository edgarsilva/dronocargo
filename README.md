# MY_WEBAPP - Online Ordering Webapp

## Tech Stack

MY_WEBAPP Webapp Client - Webapp is set up to consume the MY_WEBAPP API, the tech stack consists of the following:

#### Server Side

Serving the Webapp Client sstatic assets (html, js, css, etc) is a Lite Express.js Server, this is also used for light session management, keys, Vendor APIs interactions that need to happen on server and are not relevant to the MY_WEBAPP API (like oAuth flows), also this should let us du SSR (Server Side Rendering) and SEO (Search Engine Optimizations) if we need to.

Located at the root of our app, point of entry `index.js` as usual, dependencies can be checked in the `package.json`

- Node: v14.16.0
- Express.js: v4.17.1
- Redis server v^6.0.6

#### Client Side

The client side is a React/Redux app located in the `./client` directory of the repo and served by Express.js, the react app was generated using the NPM module `create-react-app v2.1.5` all dependencies and their versions can be checked at `./client/package.json`, the main modules and their versions are as follows:

- react: v17.0.2
- redux: v4.1.0
- react-redux: v7.2.4
- Material-UI/Core: v4.11.4
- Material-UI/Icons: v4.11.2

For UI/UX, Theming and CSS we are using both [Material-UI](https://material-ui.com/) and [Styled-Components](https://styled-components.com) (in very few places or where more customization is needed), CSS management and theming are easier and the react module has a lot of great components to use as foundation for the app.

As development is kicking off we are theming lightly from the start, we'll start theming at a later date, more than likely after v1.0.0 of the app is released.

You can find the App custom Material-UI theme at `/client/src/styles/material-ui-theme.js`.
### Development Setup

You need Node.js, NPM and Redis running locally for develpment.

#### 1. Install Node.js

The most important requirement is Node.js, install the appropriate version, preferably using some type of node version manager like the fabulous [n - node version manager](https://github.com/tj/n).

#### 2. Install all dependencies (Server and Client)

You need to install all dependencies on both the server side and the client side of the webapp, there are scripts alread hooked up that will install the client dependencies just by running `npm install` on the server, just run =>

```bash
# From root of the app (AKA server side) ./
# This will trigger client side installs after it's done
$ npm install
```
If you want to just install the client dependencies (the React part of the app), navigate to the client directory inside the repo and run the following:

```bash
# navigate to client directory from app root
$ cd client
$ npm install
```

#### 3. Redis

Follow instalattion instructions in the quickstart guide.

For Ubuntu 17.10 (and probably Linux distros using Systemd) follow the instructions here -> How to setup Redis in ubuntu 17.10.

#### 4. Running the app in development mode

By this point all setup for the app to run should be completed, navigate back to the root directory of the app
so we can start the apps in development mode, the setup is already configured for hot-reloading and serving
correctly from both server side and react side using proxy configuration that can be checked at
`client/src/setupProxy.js`, you can start the app from the root folder by running:

```bash
# from the root of the repo
$ npm run dev
```

The command above should automatically start both apps (server and client) and open the browser with the app, the
server side of the app is working in case we need to do any API calls or call on other services, in development
mode the client app is in charge of serving all client side files (this means anything that has to do with React)
and is configured with hot-reloading, that means it automatically tracks changes and refreshes the React app when saving files, makes development a lot easier.

#### 5. Running in Production

The app is setup to deploy to production servers when there's a merge to the main
branch. The branch is protected and only approved and commits that have passes all CI
checks would be merged in, you can check the status of the checks here ->
[Github MY_WEBAPP Webapp](https://github.com/MY_WEBAPP/webapp) just go to the
to the pull request you are waiting on and click it to see the pending checks.

The app is being deployed to heroku on `main` branch merges but can also be manually pushed from `heroku cli`
by pushing to the heroku repo `git push heroku main` or by pulling from the Heroku dashboard.

## Development process how to: "From new feature to production"

This describes the development process all the way to production release.

### Creating and working on new/existing feature branches and merging them to the development

Any time we need to work on a new feature/bugfix/update we do it by branching off the `development` branch. The usual naming structure is `feature/my-new-feature`, `bugfix/my-bugfixes`, and so on, alternatively you can also include your name to easily identify who is working on which branch, like so `edgar/feature/my-new-feature`.

You should `commit` to your branch often, and `push` your changes at least twice a day, this ensures no work is lost and there's enough visibility of what's being worked on.

### Merging feature/work brances to development.

Once work is considered done and ready to be tested, or included in the next release, we
push our changes and create a `pull request` to the development branch, preferably
all `Pull Requests AKA PRs` should be reviewed by a team member, if none is available then you
should review the changes yourself (consiously as if it were not your code),
wait for all checks to pass and merge to the `development` branch. Make sure to delete
the `feature/my-new-feature` branch if no more work is to be done in it.

## Cutting a Production Release

Once the code is ready and tested in development we prepare for a production release.

Production releases are hooked to the Github repo, specifically the Main branch,
and done through Heroku Github Hooks.

They start and are done automatically when merging commits into the main branch, there are a few ways to start
the production release process.

1. Manually merging and pushing to the main branch (from cli).
2. From github my creating a PR from the development branch to the main branch.
3. By manually pushing to the heroku repo.

## From CLI merge
### 1. Make sure all changes for the next release are merged, ready and tested in the development branch.

### 2. Start by pulling all latest changes locally:

```bash
$ git checkout development
$ git pull
```

### 3. Checkout the main branch and create a non-fast-forward commit to house the release:

```bash
$ git checkout main
$ git merge --no-ff development
```

### 4. Write a good release description for the commit detailing what changes were included, usually along the lines of:

```bash
Release v1.3.2

Changes:

1. Theme updates.
2. Adding new Artwork image fields  to New Job form.
3. New job listings now in dashboard.
4. Bugfix: Buttons now show disabled correctly in inbox.
5. Sign In Modal now available.
```

You can check the current release tag in Github or by running:

```bash
$ git tag --sort=-taggerdate
```

That way you can include next release tag version as shown in the details above, we follow SEMVER nomenclature.

### 5. Add an annotated tag that describes the release:

```bash
$ git tag -a v1.3.2
```

Include the same description used in the release commit.

```bash
Release v1.3.2

Changes:

1. Theme updates.
2. Adding new Artwork image fields  to New Job form.
3. New job listings now in dashboard.
4. Bugfix: Buttons now show disabled correctly in inbox.
5. Sign In Modal now available.
```

### 6. Push to the main branch to start the Heroku CI build

The build should trigger a deployment to the server once it has completed,
you can only push commits that have all checks passed, check to make sure
all builds have finished successfully at (Heroku Dasboard)[https://dashboard.heroku.com/apps].

```bash
$ git push origin main --tags
```

You should see a new build start, once it's done, check the app is ready and working
in production.

### 7. Lastly you should merge the commit back to development and push the development branch.

```bash
$ git checkout development
$ git merge main
$ git push origin development
```