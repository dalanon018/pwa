/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      loader: 'happypack/loader?id=jsx'
    }, {
      // Preprocess our own .css files
      // This is the place to add your own loaders (e.g. sass/less etc.)
      // for a list of loaders, see https://webpack.js.org/loaders/#styling
      test: /\.css$/,
      exclude: [/node_modules/, /semantic/],
      loader: 'happypack/loader?id=styles'
    }, {
      // Preprocess 3rd party .css files located in node_modules
      test: /\.css$/,
      include: [/node_modules/, /semantic/],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
      loaders: 'file-loader'
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
    }, {
      test: /\.html$/,
      loaders: 'html-loader'
    }, {
      test: /\.json$/,
      loaders: 'json-loader'
    }, {
      test: /\.(mp4|webm)$/,
      loaders: 'url-loader',
      query: {
        limit: 10000
      }
    }]
  },
  plugins: options.plugins.concat([
    new HappyPack({
      id: 'jsx',
      loaders: [{
        loader: 'babel-loader',
        options: options.babelQuery
      }]
    }),
    new HappyPack({
      id: 'styles',
      loaders: ['style-loader', 'css-loader']
    }),

    new ExtractTextPlugin('styles.css'),

    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        TOKEN_URL: JSON.stringify(process.env.TOKEN_URL),
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        APP_BASE_URL: JSON.stringify(process.env.APP_BASE_URL),
        STORE_LOCATOR_URL: JSON.stringify(process.env.STORE_LOCATOR_URL),
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        FIREBASE_MAIN_OBJECT: JSON.stringify(process.env.FIREBASE_MAIN_OBJECT),
        FIREBASE_USERNAME: JSON.stringify(process.env.FIREBASE_USERNAME),
        FIREBASE_PASSWORD: JSON.stringify(process.env.FIREBASE_PASSWORD),
        OATH_CLIENT_ID: JSON.stringify(process.env.OATH_CLIENT_ID),
        OATH_CLIENT_SECRET: JSON.stringify(process.env.OATH_CLIENT_SECRET),
        OATH_RESPONSE_TYPE: JSON.stringify(process.env.OATH_RESPONSE_TYPE),
        OATH_GRANT_TYPE: JSON.stringify(process.env.OATH_GRANT_TYPE),
        RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY)
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: { moment: 'moment/moment.js' },
    extensions: [
      '.js',
      '.jsx',
      '.react.js'
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ]
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {}
})
