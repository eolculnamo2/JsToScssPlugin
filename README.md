# JsToScssPlugin

## A webpack plugin for converting JS scss variables into scss.
In ITCSS or similar SCSS architectures, there is generally a global SCSS file that defines global variables such as breakpoints, colors, etc.
The problem with such a setup is that it is often necessary to also keep these global variables in a JS file which means you have to
update both the JS configuration AND the SCSS configuration.

This is the problem that JsToScssPlugin seeks to resolve by taking the names of the JS object keys and converting them into SCSS
in the specified configuration file. 

See the example below where dark1 is mismatched.

### global-variables.js
<code>
module.exports = {
  dark1: #333;
  dark2: #555;
  dark3: #777;
}
</code>

### global-variables.scss
<code>
$dark1: #111;
$dark2: #555;
</code>

In this scenario, JsToScssPlugin would remove $dark1 from the SCSS file and replace it with dark1 from the JS file. The output
would look like this


### global-variables.scss post webpack build.
<code>
$dark1:#333;$dark2:#555;$dark3:#777;
</code>


## How to use:
1) Copy and paste the JsToScssPlugin_min file in the build directory into your project and require it in webpack.config.js.
2) Require your js configuration file as jsSrc.
3) Add the JsToScssPlugin with jsSrc and scssSrc. scssSrc is the location of the SCSS configuration file which will be updated
with the JS version of the variables.

### webpack.config.js
<code>
const JsToScssPlugin = require('./JsToScssPlugin_min');
const jsSrc = require('./src/pathToJs.js');

module.exports = {
entry: {...},
output: {...},
plugins: [
    new JsToScssPlugin({
      jsSrc,
      scssSrc: path.join(__dirname,'sample/sample.scss')
    })
  ],
}
</code>
