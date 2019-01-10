const fs = require('fs');

let config = {};
let confArr = fs.readFileSync('./server.conf', 'utf8').split('\r\n');

confArr.forEach(conf => {
    let temp = conf.split('=');
    config[temp[0]] = temp[1];
});

module.exports = config;

