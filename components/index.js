const fs = require('fs');

const assets =  '../assets';
const cssAssets =  '../assets/css/vendor/';

if (!fs.existsSync(assets)){
    fs.mkdirSync(assets);
}

if (!fs.existsSync(assets + '/js')){
    fs.mkdirSync(assets + '/js');
}

if (!fs.existsSync(assets + '/js/vendor')){
    fs.mkdirSync(assets + '/js/vendor');
}

if (!fs.existsSync(assets + '/css')){
    fs.mkdirSync(assets + '/css');
}

if (!fs.existsSync(cssAssets)){
    fs.mkdirSync(cssAssets);
}

fs.createReadStream('./node_modules/foundation-sites/dist/js/foundation.min.js')
  .pipe(fs.createWriteStream(assets + '/js/vendor/foundation.min.js'));

fs.createReadStream('./node_modules/foundation-sites/dist/js/foundation.min.js.map')
  .pipe(fs.createWriteStream(assets + '/js/vendor/foundation.min.js.map'));

fs.createReadStream('./node_modules/jquery/dist/jquery.min.js')
  .pipe(fs.createWriteStream(assets + '/js/vendor/jquery.min.js'));

  fs.createReadStream('./node_modules/vue/dist/vue.js')
    .pipe(fs.createWriteStream(assets + '/js/vendor/vue.js'));
