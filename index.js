const express = require('express');
const webLoader = require('./webLoader');
const globalConfig = require('./server.config.js');

const app = express();

app.use(express.static('./' + globalConfig.page_path + '/'));

app.listen(globalConfig.port, globalConfig.ip, () => {
    console.log('server is running');
})

app.post('/editEveryDay', webLoader.get('/editEveryDay'));

app.get('/getEveryDay', webLoader.get('/getEveryDay'));

app.post('/editArticle', webLoader.get('/editArticle'));

app.get('/getArticle', webLoader.get('/getArticle'));

app.get('/getArticleCount', webLoader.get('/getArticleCount'));

app.get('/getArticleById', webLoader.get('/getArticleById'));

app.get('/submit_comment', webLoader.get('/submit_comment'));

app.get('/getCaptcha', webLoader.get('/getCaptcha'));