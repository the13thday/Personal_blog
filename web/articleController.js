const url = require('url');
const articleDao = require('../dao/articleDao');
const tagDao = require('../dao/tagDao');
const tagBlogMappingDao = require('../dao/tagBlogMappingDao');
let timeUtil = require('../util/timeUtil');
let respUtil = require('../util/respUtil');

let path = new Map();

function editArticle(request, response) {
    let query = url.parse(request.url, true).query;
    let tags = query.tags.replace(/\s/g, '').replace(/，/g, ',');
    const bufferArray = [];
    request.on('data', function (content) {
        bufferArray.push(content);
    })
    request.on('end', function () {
        const content = Buffer.concat(bufferArray);
        return articleDao.insertArticle(query.title, content.toString(), 0, tags, timeUtil.nowTime(), timeUtil.nowTime(), function (result) {
            response.statusCode = 200;
            response.write(respUtil.writeResult('succes', '文章添加成功', null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                let tagName = tagList[i].trim();
                if (tagName === '') {
                    continue;
                }
                queryTagByName(tagName, blogId);
            }
        })
    })
}

function queryTagByName (tagName, blogId) {
    tagDao.queryTag(tagName, function (result) {
        if (result == null || result.length === 0) {
            insertTag(tagName, blogId);
        } else {
            insertTagBlogMapping(result[0].id, blogId, timeUtil.nowTime(), timeUtil.nowTime());
        }
    })
}

function insertTag (tagName, blogId) {
    tagDao.insertTag(tagName, timeUtil.nowTime(), timeUtil.nowTime(), function (res) {
        let tagId = res.insertId;
        insertTagBlogMapping(tagId, blogId, timeUtil.nowTime(), timeUtil.nowTime());
    })
}

function insertTagBlogMapping (tagId, blogId, ctime, utime) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, ctime, utime);
}


function getArticle (request, response) {
    let params = url.parse(request.url, true).query;
    let page = parseInt(params.page);
    let pagSize = parseInt(params.pageSize);
    articleDao.queryArticleByPage(page, pagSize, function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', 'page:'+ page + 1, result));
        response.end();
    })
}

function getArticalCount (request, response) {
    articleDao.queryArticleCount(function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取数据成功', res));
        response.end();
    })
}


path.set('/getArticalCount', getArticalCount);
path.set('/getArticle', getArticle);
path.set('/editArticle', editArticle);

module.exports.path = path;