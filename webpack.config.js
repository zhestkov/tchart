const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin({
  filename: "bundle.css"
});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devtool: "source-map",
  devServer: {
    overlay: true,
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: extractStyles.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      }
    ]
  },
  plugins: [extractStyles]
};
