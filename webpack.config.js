const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    // publicPath: path.resolve(__dirname, "src/static")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      exclude:  ['.gitkeep']
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  mode: "development"
};
