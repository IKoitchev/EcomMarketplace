const path = require('path');
const gateway = require('express-gateway');

console.log('gw2');
gateway().load(path.join(__dirname, 'config')).run();
