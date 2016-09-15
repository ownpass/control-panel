var fs = require('fs');
var uglify = require('uglify-js');

var uglifyTask = uglify.minify([
    './node_modules/core-js/client/shim.min.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.src.js',
    './systemjs.config.js',
], {
    mangle: false,
    compress: false,
});

fs.writeFileSync('vendor.js', uglifyTask.code);