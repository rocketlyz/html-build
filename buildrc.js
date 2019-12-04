const path = require('path');
const fs = require('fs');


const PROJECT_PATH = process.cwd();
const rc = path.resolve(PROJECT_PATH, '.buildrc');

const defaults = {
    'development': {
      'css-modules': {
        localIdentName: '[path][name]__[local]',
      },
    },
    'production': {   
      'css-modules': {
        localIdentName: '[hash:base64]',
      },   
    }
    
}

let options = {};

try {
  const customOptions = JSON.parse(fs.readFileSync(rc, 'utf-8'));
  options.development = Object.assign({}, defaults.development, customOptions || customOptions.development);
  options.production = Object.assign({}, defaults.production, customOptions || customOptions.production);

} catch (e) {
  if (e.code === 'ENOENT') {
    options = Object.assign({}, defaults);
  } else {
    throw e;
  }
}


module.exports = options;