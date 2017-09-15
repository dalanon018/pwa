![7eleven-banner](https://offshorly.com/7-eleven/images/cliqq.png)

# 7 Eleven CliQQ Documentation
[ ![Codeship Status for anteraaron/e-commerce-front-end](https://app.codeship.com/projects/91e48900-490c-0135-915a-4eee578a9487/status?branch=master)](https://app.codeship.com/projects/232078)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Development Environment Setup

1. Make sure you have `nvm`, node `v7.6.0 and up` installed
2. Install `yarn` - `npm install -g yarn`.
3. Use a smart `.npmrc`. By default, `npm` doesn’t save installed dependencies to package.json (and you should always track your dependencies!).
4. `npm install -g standard` # standardjs
5. `npm install -g babel-eslint`
6. `npm install -g snazzy`

```bash
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc
```

When adding new packages, always use `yarn add --exact <package>`. To add a package as a devDependency, use `yarn add --exact -D <package>`. This will ensure the package is always added to the `yarn.lock` file.

## Quick start

Make sure you have `nvm`, node `v7.6.0`, and `yarn` installed before proceeding with the following steps. Also, ensure :

1. Clone repo - `git clone git@bitbucket.org:anteraaron/e-commerce-front-end.git`
2. Run `yarn` to install dependencies and clean the git repo.
3. Run `yarn start` to see the app at `http://localhost:3000`.

To build and test production build:

1. Run `yarn run build` to build the app.
2. Run `yarn run start:prod` to run the app in production mode. Make sure there are no errors in the browser console log.

The application uses [Semantic-UI](http://semantic-ui.com/) and [semantic-ui-react](http://react.semantic-ui.com/) as the UI library. To customize theme and css styles of the application:

1. Run `npm install -g gulp`
2. Go to `/semantic` folder
3. Modify the application theme in `/semantic/src/themes/7-eleven`
4. Build the theme - `gulp build`. This will generate an updated `/semantic/dist/semantic.min.css`, which is the main css file loaded in the application.

 ## Documentation

- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Code Style Guide](docs/css/README.md): Code style guide for JavaScript, React, and CSS
- [Contributing Code](docs/git/github-flow.md): How to contribute code using GitHub Flow
- [Testing](docs/testing/README.md): How to work with the built-in test harness
- [CSS](docs/css/README.md): How to work with the CSS tooling
- [Your app](docs/js/README.md): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [Semantic UI](docs/semantic/README.md): The UI library used and how to customize the theming and styles of the library for the app.

## Overview

### Application Folder Structure

The `[`app/`](../../../tree/master/app)` directory contains your entire application code, including CSS, JavaScript, HTML and tests.

The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

Some files left out for brevity.

```
.
├── app/
|   ├── components
|   |   └── Button
|   |       ├── index.js
|   |       └── tests
|   |           └── index.test.js
|   ├── containers
|   |   ├── App
|   |   |   ├── tests
|   |   |   |   ├── actions.js
|   |   |   |   ├── index.test.js
|   |   |   |   └── reducer.test.js
|   |   |   ├── actions.js
|   |   |   ├── constants.js
|   |   |   ├── index.js
|   |   |   ├── sagas.js
|   |   |   └── reducer.js
|   |   |
|   ├── tests
|   ├── utils
|   └── index.js
├── build/
├── docs/
├── internals/
├── semantic/
├── server/
├── .editorconfig
├── .gitattributes
└── .gitignore
└── package.json
```

### Architecture Diagram

![7eleven-diagram](https://offshorly.com/7-eleven/images/arch-diag.png)


### Building & Deploying

1. Run `npm run build`, which will compile all the necessary files to the
`build` folder.

2. Upload the contents of the `build` folder to your web server's root folder.


### CSS

This boilerplate uses [styled-components](https://github.com/styled-components/styled-components) allowing you to write your CSS in your JavaScript, removing the mapping between styles and components.

`styled-components` let's us embrace component encapsulation while `sanitize.css` gives us data-driven cross-browser normalization.

See the [CSS documentation](docs/css/README.md) for more information about PostCSS
and CSS modules.

### JS

The app bundles all your clients-side scripts and chunk them into several files using
code splitting where possible. Your code is automatically optimized when
building for production so you don't have to worry about that.

See the [JS documentation](docs/js/README.md) for more information about the
JavaScript side of things.

### SEO

App uses [react-helmet](https://github.com/nfl/react-helmet) for managing document head tags. Examples on how to
write head tags can be found [here](https://github.com/nfl/react-helmet#examples).

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](docs/testing/README.md)!

#### Performance testing

With the production server running (i.e. while `npm run start:production` is running in
another tab), enter `npm run pagespeed` to run Google PageSpeed Insights and
get a performance check right in your terminal!

#### Browser testing

`npm run start:tunnel` makes your locally-running app globally available on the web
via a temporary URL: great for testing on different devices, client demos, etc!

#### Unit testing

Unit tests live in `test/` directories right next to the components being tested
and are run with `npm run test`.


