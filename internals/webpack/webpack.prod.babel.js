// Important modules this config uses
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: {
    vendor: ['react-dom', 'react', 'moment', 'styled-components', 'core-js', 'immutable', 'react-router-dom', 'redux'],
    app: path.join(process.cwd(), 'app/app.js')
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  babelQuery: {
    plugins: ['lodash', 'ramda', 'transform-semantic-ui-react-imports']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(), // minify everything
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   children: true,
    //   minChunks: 2,
    //   async: true
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],
      minChunks: 2
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      hash: true,
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess', '.netlify', '_redirects'],

      // Externals we have to find a way to match this using RegEx
      // Will hande external API CALLS
      ServiceWorker: {
        entry: path.join(process.cwd(), 'app/sw-handler.js')
      },

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js']
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      AppCache: false
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.ico$|\.gif$|\.ttf$|\.woff$|\.woff2$|\.eot$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.css$|\.html$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.ico$|\.gif$|\.ttf$|\.woff$|\.woff2$|\.eot$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename))
  }
})
