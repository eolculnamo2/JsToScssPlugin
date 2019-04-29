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

      let newScss = '';
      for(const x in this.jsSrc) {
        newScss += `$${x}:${this.jsSrc[x]};`;
      }

      fs.readFile(this.scssSrc, 'utf8', (err,res) => {
        const finalScss = res += newScss;
        fs.writeFile(this.scssSrc, finalScss, (err,res) => callback() );
      });
    });
  }
}

module.exports = JsToSccsPlugin;
