const webpack = require("webpack");
const path = require("path");

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Ignore Typescript specification files
var ignore = new webpack.IgnorePlugin(/^\.spec\.ts$/);

var loaders = [
    {
        test: /\.html$/,
        loaders: [ 'raw-loader' ]
    },

  // SCSS should be automatically transpiled
  {
      test: /\.(css|scss)$/,
      loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
      }))
  },

  // Support both Typescript and ES2015 Javascript
  {test: /\.js$/, loader: 'babel-loader',
   exclude: /(node_modules|bower_components)/, query: {presets: ['es2015']}},
  {
       test: /\.ts$/,
       use: [
           {loader: 'awesome-typescript-loader'},
           {loader: 'angular2-template-loader'}
       ]
   },

  {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=font/[hash:6].[ext]"},
  {test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
  {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash:6].[ext]" }
];

var extensions = [".webpack.js", ".web.js", ".ts", ".js", ".scss"];

module.exports = [{
    // entry: './src/main.ts',
  entry: {
      polyfills: './src/polyfills.ts',
      app: "./src/main.ts",
      vendor: './src/vendor.ts',
      angular: './src/angular.ts'
  },
  output: {
    path: __dirname + "/static",
    filename: "[name].js",
    library: "coding-challenge-ttt",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {extensions: extensions},
  module: {rules: loaders},

  // local development server
  devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: path.join(__dirname, '/src'),
        port: 3000,
        proxy: {
            '/api/games': {
                target: 'http://localhost:8080',
                secure: false
            },
            '/api/games/*': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        hot: true
  },
  devtool: "source-map",
  plugins: [
      new CleanWebpackPlugin(['static']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
         $: "jquery",
         jquery: "jquery",
         "window.jquery": "jquery",
         jQuery: "jquery"
      }),
      new ExtractTextPlugin({
          filename: "index.css"
      }),
      new HtmlWebpackPlugin({
        //   template: '../backend/templates/index.html'
          template: './src/index.html'
      }),
        new webpack.ContextReplacementPlugin(
            // /angular(\\|\/)core(\\|\/)@angular/,
            /\@angular(\\|\/)core(\\|\/)esm5/,
            path.join(__dirname, "./src")
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'angular', 'vendor', 'polyfills']
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['runtime']
        // }),
      new FriendlyErrorsPlugin()

  ]
}];
