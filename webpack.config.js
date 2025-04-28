// module.exports = {
//   entry: './src/app.js',
//   output: {
//     filename: './dist/app.bundle.js'
//   }
// }

var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var BUILD_DIR = path.join(__dirname, "dist")
var APP_DIR = path.join(__dirname, "src")

const VENDOR_LIBS = ["react", "react-dom", "react-router-dom"]

var config = {
  // entry: APP_DIR + "/index.js",
  entry: {
    bundle: APP_DIR + "/index.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // include: APP_DIR,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"],
      minChunks: 2,
    }),
  ],
}

module.exports = config
