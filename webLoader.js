const fs = require('fs');
const webPath = new Map();
const globalConfig = require('./server.config');

let pathArr = fs.readdirSync('./' + globalConfig.web_path);

for (let i = 0; i < pathArr.length; i++) {
    let file = require('./' + globalConfig.web_path + pathArr[i]);
    if (file.path) {
        for (let [k, v] of file.path) {
            if (webPath.get(k) == null) {
                webPath.set(k, v);
            } else {
                throw new Error(`url path 异常, url: ${k}`);
            }
        }
    }
}

module.exports = webPath;