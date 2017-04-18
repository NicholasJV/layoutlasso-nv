var path = require('path');
// to run DEV ENV withOUT AUTH use this path:
var devConfigPath = path.join(__dirname, './development_noAuth.js');
// to run DEV ENV with AUTH uncomment this defConvigPath,
// and enable strategies in app/configure/auth:
// var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}
