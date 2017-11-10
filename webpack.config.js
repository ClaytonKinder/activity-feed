var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: 'variables.env' });

module.exports = {
  entry: './frontend/src/main.js',
  output: {
    path: path.resolve(__dirname, './frontend/dist'),
    publicPath: '/frontend/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.woff(\d*)\??(\d*)$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      {
        test: /\.ttf\??(\d*)$/,
        loader: "file-loader"
      },
      {
        test: /\.eot\??(\d*)$/,
        loader: "file-loader"
      },
      {
        test: /\.svg\??(\d*)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        XAPI_ENDPOINT: `'${process.env.XAPI_ENDPOINT}'`,
        XAPI_USER: `'${process.env.XAPI_USER}'`,
        XAPI_PASSWORD: `'${process.env.XAPI_PASSWORD}'`
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, './frontend/src'),
      'assets': path.resolve(__dirname, './frontend/src/assets'),
      'styles': path.resolve(__dirname, './frontend/src/styles'),
      'components': path.resolve(__dirname, './frontend/src/components')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: (process.env.NODE_ENV === 'production') ? '#source-map' : '#eval-source-map'
}
