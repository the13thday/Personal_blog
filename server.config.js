const fs = require('fs');
const os = require('os');

let config = {};
let confArr = fs.readFileSync('./server.conf', 'utf8').split(os.EOL);
confArr.forEach(conf => {
    let temp = conf.split('=');
    config[temp[0].trim()] = temp[1].trim();
});

module.exports = config;

