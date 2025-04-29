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
    filename: "[name].[hash].js",
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
  devServer: {
    contentBase: BUILD_DIR,
    compress: true, // enable gzip compression
    port: 9000,
    disableHostCheck: false, // if you're usin Webpack Dev Server, this should always be set to false. Apps that do not check host are usually vulnerable to DNS rebinding attacks

    open: true, // when you run a dev server, it will automatically open the tab in your default browser with the page.
    hot: true, //  hot load React modules (The most powerful feature of the Webpack Dev Server)
    // it will let you retain the application state when you refresh the page
    // it will only update the components that have changed
    // it allows to tweak styles much faster
    // when working with React - author highly recommends to have this module enable on all times
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"],
      minChunks: 2,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = config
