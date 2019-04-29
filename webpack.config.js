
const path = require('path');
const JsToScssPlugin = require('./src/JsToSccsPlugin');
const jsSrc = require('./sample/jsStyleConfig');

module.exports = {
  entry: './sample/index.js',
  output: {
    path: path.resolve('./bundle'),
    filename: 'bundle.js'
  },
  plugins: [
    new JsToScssPlugin({
      jsSrc,
      scssSrc: path.join(__dirname,'sample/sample.scss')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname,'sample'),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}
