# Customizing Semantic UI

The app uses the full version of [Semantic UI](http://semantic-ui.com/), and can be customized by changing
the CSS variables.

## Quick Start

The following steps are required to build customize the theme of the app:

```
$ npm install -g gulp
$ cd semantic
$ gulp build
```

## Theming

* `semantic/src/themes/worldvision/globals/site/variables` - to modify page container sizes, default fonts, and colors
* Use overrides [semantic/src/themes/github/collections/menu.overrides](https://github.com/Semantic-Org/example-github/blob/master/semantic/src/themes/github/collections/menu.overrides) to override the default CSS selector styles
* Combining multiple individual component themes together in one [theme.config](https://github.com/Semantic-Org/example-github/blob/master/semantic/src/theme.config)
* Using a [custom icon font](https://github.com/Semantic-Org/example-github/blob/master/semantic/src/themes/github/elements/icon.overrides), and [modifying paths](https://github.com/Semantic-Org/example-github/blob/master/semantic/src/themes/github/elements/icon.variables) to assets.

## Using themes

### Sitewide Defaults

Semantic UI includes twelve named colors. Components with color variations inherit these global variables when defining how colors should appear.


