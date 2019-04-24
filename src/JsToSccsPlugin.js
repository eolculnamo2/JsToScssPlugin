/* eslint-disable class-methods-use-this */
const fs = require('fs');
const path = require('path');

class JsToSccsPlugin {

  constructor(config) {
    const { jsSrc, scssSrc } = config;
    this.jsSrc = jsSrc;
    this.scssSrc = scssSrc;
  }

  apply(compiler) {

    compiler.hooks.beforeCompile.tapAsync('JsToSccsPlugin', (params, callback) => {

      const addGlobalScss = scssInp => {
        let newScss = '';
        for(let x in scssInp) {

        }
      }

      fs.readFile(this.scssSrc, 'utf8', (err,res) => );
      callback();
    });
  }
}

module.exports = JsToSccsPlugin;
