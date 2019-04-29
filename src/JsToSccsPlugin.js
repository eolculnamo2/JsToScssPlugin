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

      // Create string of scssVariables to write to scss file
      let newScss = new Set();
      for(const x in this.jsSrc) {
        newScss.add(`$${x}:${this.jsSrc[x]};`);
      }

      // Append newScss to existing scssSrc file.
      fs.readFile(this.scssSrc, 'utf8', (err,res) => {

        // Delete previous scss variables.
        let resNoWp = this.removeWhiteSpace(res);
        newScss.forEach( x => {
          resNoWp = resNoWp.split(';').filter(y => {
            if(y.split(':')[0] !== x.split(':')[0]) {
              return y;
            }
          }).join(';') + ';'+x;
        });

        //write file
        fs.writeFile(this.scssSrc, resNoWp, (err1,res1) => callback() );
      });
    });

  }

  removeWhiteSpace(str) {
    return str.replace(/(\r\n|\n|\r| )/gm, "");
  }
}

module.exports = JsToSccsPlugin;
