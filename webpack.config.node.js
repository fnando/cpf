const web = require("./webpack.config.js");
const node = Object.assign({}, web);

node.output = {
  path: `${__dirname}/dist/`,
  filename: `node.js`,
  libraryTarget: "commonjs"
};

module.exports = node;
