var webpack = require('webpack');
var path = require('path');

// Ignore Typescript specification files
var ignore = new webpack.IgnorePlugin(/^\.spec\.ts$/);

var loaders = [
  // SCSS should be automatically transpiled
  { test: /\.css$/, loader: 'style!css' },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader' // creates style nodes from JS strings
      },
      {
        loader: 'css-loader' // translates CSS into CommonJS
      },
      {
        loader: 'sass-loader' // compiles Sass to CSS
      }
    ]
  },

  // Support both Typescript and ES2015 Javascript
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
    query: { presets: ['es2015'] }
  },
  { test: /\.ts$/, loader: 'ts-loader' },

  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=font/[hash:6].[ext]'
  },
  { test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader:
      'url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash:6].[ext]'
  }
];

var extensions = ['.webpack.js', '.web.js', '.ts', '.js', '.scss'];

module.exports = [
  {
    entry: './src/main.js',
    output: {
      path: __dirname + '/ui/ttt-ng/dist',
      filename: 'main.js',
      library: 'coding-challenge-ttt',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    resolve: { extensions: extensions },
    module: { loaders: loaders },
    devtool: 'source-map'
  }
];
