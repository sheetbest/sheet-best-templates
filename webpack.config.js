var path = require('path');

module.exports = {
  entry: path.resolve(path.join(__dirname, 'index.js')),
  output: {
    path: path.resolve(path.join(__dirname, 'dist')),
    library: 'SheetBest',
    libraryTarget: 'umd',
    filename: 'sheet-best-templates.js',
    globalObject: 'this',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    }],
  },
};
