/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loaders: ['happypack/loader?id=jsx'],
      exclude: /node_modules/,
      query: options.babelQuery
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      // test: /\.css$/,
      // include: /node_modules/,
      // loaders: ['style-loader', 'css-loader']
    }, {
      // Preprocess our own .css files
      // This is the place to add your own loaders (e.g. sass/less etc.)
      // for a list of loaders, see https://webpack.js.org/loaders/#styling
      // test: /\.css$/,
      // exclude: [/node_modules/, /semantic/],
      // use: ['style-loader', 'css-loader']
    }, {
      // Preprocess 3rd party .css files located in node_modules
      test: /\.css$/,
      include: [/node_modules/, /semantic/],
      loaders: ['happypack/loader?id=styles']
    }, {
      test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
      loaders: ['file-loader']
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
      loaders: ['happypack/loader?id=html']
    }, {
      test: /\.json$/,
      loaders: ['happypack/loader?id=json']
    }, {
      test: /\.(mp4|webm)$/,
      loaders: 'happypack/loader?id=url',
      query: {
        limit: 10000
      }
    }]
  },
  plugins: options.plugins.concat([
    // JSX
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader']
    }),
    // STYLES
    new HappyPack({
      id: 'styles',
      threads: 2,
      loaders: ['style-loader', 'css-loader']
    }),
    // HTML-LOADER
    new HappyPack({
      id: 'html',
      threads: 1,
      loaders: ['html-loader']
    }),
    // JSON-LOADER
    new HappyPack({
      id: 'json',
      threads: 1,
      loaders: ['json-loader']
    }),
    // URL-LOADER
    new HappyPack({
      id: 'url',
      threads: 1,
      loaders: ['url-loader']
    }),

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
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        APP_BASE_URL: JSON.stringify(process.env.APP_BASE_URL),
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
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
