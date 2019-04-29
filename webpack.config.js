
const path = require('path');
const JsToScssPlugin = require('./build/JsToScssPlugin_min');
const jsSrc = require('./sample/jsStyleConfig');

const testConfig = {
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

const buildModule = {
  entry: './src/JsToSccsPlugin.js',
  output: {
    path: path.resolve('./build'),
    filename: 'JsToScssPlugin_min.js',
    library: "my-library",
    libraryTarget: "umd"
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname,'src'),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
}

module.exports = process.env.NODE_ENV === 'production' ? buildModule : testConfig;