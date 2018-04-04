const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let filename;

if (process.env.NODE_ENV === "production") {
  filename = `cpf.min.js`;
} else {
  filename = `cpf.js`;
}

module.exports = {
  entry: `${__dirname}/src/cpf`,
  devtool: "source-map",

  output: {
    path: `${__dirname}/dist/`,
    filename: filename,
    library: 'cpf'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: [`${__dirname}/src/`],
      }
    ]
  }
};
