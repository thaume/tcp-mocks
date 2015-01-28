var fs = require('fs');
var path = require('path');
var middleware = {};

// import all middleware from the middleware directory for later use
fs.readdirSync(__dirname).forEach(function (file) {
  if (path.extname(file) === '.js') {
    middleware[path.basename(file, '.js')] = require('./' + file);
  }
});

module.exports = middleware;
