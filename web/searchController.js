const url = require('url');
const searchDao = require('../dao/searchDao');

let respUtil = require('../util/respUtil');
let timeUtil = require('../util/timeUtil');
let path = new Map();

function searchTitle (request, response) {
    let params = url.parse(request.url, true).query;
    searchDao.queryArticleByKeyWord(params.q, parseInt(params.page), parseInt(params.pageSize), res => {
        res.forEach(item => {
            item.content = item.content.substring(0, 300);
            item.ctime = timeUtil.format(item.ctime);
            item.utime = timeUtil.format(item.utime);
        });
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '搜索文章', res));
    });
}

function getArticalCountBySearch (request, response) {
    let params = url.parse(request.url, true).query;
    searchDao.queryArticleCountByKeyWord(params.q, res => {
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '文章数量', res));
    })
}

path.set('/searchTitle', searchTitle);
path.set('/getArticalCountBySearch', getArticalCountBySearch);

module.exports.path = path;