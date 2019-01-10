const express = require('express');

const globalConfig = require('./server.config.js');

const app = express();

app.use(express.static('./' + globalConfig.page_path + '/'));

app.listen(globalConfig.port, globalConfig.ip, () => {
    console.log('server is running');
})