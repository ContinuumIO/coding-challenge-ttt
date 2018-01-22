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
  // {test: /\.js$/, loader: 'babel-loader',
  //  exclude: /(node_modules|bower_components)/, query: {presets: ['es2015']}},
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

    // Entry Points ------------------------------------------------------------
    entry: {
        polyfills: './src/polyfills.ts',
        app: "./src/main.ts",
        vendor: './src/vendor.ts',
        angular: './src/angular.ts'
    },

    // Outputted files and locations -------------------------------------------
    output: {
        path: __dirname + "/static",
        filename: "[name].js"
    },

    // Path extension resolutions ----------------------------------------------
    resolve: {extensions: extensions},

    // Rules for handling file types -------------------------------------------
    module: {rules: loaders},

    // Local development server w/ HMR -----------------------------------------
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

    // Source maps (slower but accurate version) -------------------------------
    devtool: "source-map",

    // Plugins -----------------------------------------------------------------
    plugins: [
        // clear out the output dir for a sparkling clean build
        new CleanWebpackPlugin(['static']),

        // let's the hot module replacement going on for the webpack-dev-server
        new webpack.HotModuleReplacementPlugin(),

        // declare providers for jQuery
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "window.jquery": "jquery",
            jQuery: "jquery"
        }),

        // extract the embedded css into one file
        new ExtractTextPlugin({
            filename: "index.css",
            disable: true
        }),

        // declare the index file to use to inject the bundles and css
        // -- this was moved to the src folder rather than the backend dir.
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // /angular(\\|\/)core(\\|\/)@angular/,
            /\@angular(\\|\/)core(\\|\/)esm5/,
            path.join(__dirname, "./src")
        ),

        // Tree-shake the javascript into bundles defined by the entry points
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'angular', 'vendor', 'polyfills']
        }),

        // Extract all shared code into the runtime bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: ['runtime']
        }),

        // Output friendly errors because errors make us sad and then is friendly
        new FriendlyErrorsPlugin()

    ]
}];
