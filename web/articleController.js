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
    tagDao.queryTagByName(tagName, function (result) {
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

function getRandomTags (request, response) {
    tagDao.queryRandomTags(res => {
        res.sort(function () {
            return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '获取随机排序标签成功', res));
    });
}

function getArticle (request, response) {
    let params = url.parse(request.url, true).query;
    let page = parseInt(params.page);
    let pagSize = parseInt(params.pageSize);
    articleDao.queryArticleByPage(page, pagSize, function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.substring(0, 300);
            result[i].ctime = timeUtil.format(result[i].ctime);
            result[i].utime = timeUtil.format(result[i].utime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', 'page:'+ page + 1, result));
        response.end();
    })
}

function getArticleCount (request, response) {
    articleDao.queryArticleCount(function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取数据成功', res));
        response.end();
    })
}

function getArticleById (request, response) {
    let query = url.parse(request.url, true).query;
    let id = query.id;
    articleDao.queryArticleById(id, function (res) {
        res.forEach(item => {
            item.ctime = timeUtil.format(item.ctime);
            item.utime = timeUtil.format(item.utime);
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取文章成功', res));
        response.end();
        articleDao.increaseViewsById(id);
    });
}

function getAllArticle (request, response) {
    articleDao.queryAllArticles(res => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取所有文章成功', res));
        response.end();
    })
}

function getHotArticle (request, response) {
    let query = url.parse(request.url, true).query;
    let size = parseInt(query.size);
    articleDao.queryArticleByViewsDesc(size, res => {
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '最近热门文章', res));
    })
}

function getArticleByTag (request, response) {
    var params = url.parse(request.url, true).query;
    var { tagId, page, pageSize } = params;
    let isNumber = /^\d+$/.test(tagId);
    if (isNumber) {
        tagBlogMappingDao.queryBlogIdByTagId(parseInt(tagId), parseInt(page * pageSize), parseInt(pageSize), res => {
            if (res && res.length > 0) {
                var data = [];
                for (var i = 0; i < res.length; i++) {
                    articleDao.queryArticleById(res[i].blog_id, function (result) {
                        data.push(result[0]);
                    });
                }
                getResult(data, res.length, response); 
            } else {
                response.writeHead(200);
                response.end(respUtil.writeResult('success', '标签文章列表', res));
             }
        })
    } else {
        let tagName = tagId;
        tagDao.queryTagIdByName(tagName, res => {
            let id = res[0].id;
            tagBlogMappingDao.queryBlogIdByTagId(id, res => {
                if (res && res.length > 0) {
                    var data = [];
                    for (var i = 0; i < res.length; i++) {
                        articleDao.queryArticleById(res[i].blog_id, function (result) {
                            data.push(result[0]);
                        });
                    }
                    getResult(data, res.length, response); 
                } else {
                    response.writeHead(200);
                    response.end(respUtil.writeResult('success', '标签文章列表', res));
                }
            });
        })
    }
}

function getResult (data, len, response) {
    if (data.length < len) {
        setTimeout(function () {
            getResult(data, len, response);
        }, 10)
    } else {
        for (let i = 0; i < data.length; i++) {
            data[i].content = data[i].content.substring(0, 300);
            data[i].ctime = timeUtil.format(data[i].ctime);
            data[i].utime = timeUtil.format(data[i].utime);
        }
        response.writeHead(200);
        response.end(respUtil.writeResult('success','标签文章列表', data));
    }
}

function getArticleCountOfTag (request, response) {
    let params = url.parse(request.url, true).query;
    let tag = params.tag;
    let isNumber = /^\d+$/.test(tag);
    if (isNumber) {
        let id = parseInt(tag);
        tagBlogMappingDao.queryArticleCountOfTag(id, res => {
            response.writeHead(200);
            response.end(respUtil.writeResult('success', '文章总数', res));
        });
    } else {
        tagDao.queryTagIdByName(tag, res => {
            tagBlogMappingDao.queryArticleCountOfTag(res[0].id, result => {
                response.writeHead(200);
                response.end(respUtil.writeResult('success', '文章总数', result));
            })
        })
    }
}

path.set('/getArticleCount', getArticleCount);
path.set('/getArticle', getArticle);
path.set('/editArticle', editArticle);
path.set('/getArticleById', getArticleById);
path.set('/getAllArticle', getAllArticle);
path.set('/getRandomTags', getRandomTags);
path.set('/getHotArticle', getHotArticle);
path.set('/getArticleByTag', getArticleByTag);
path.set('/getArticleCountOfTag', getArticleCountOfTag);

module.exports.path = path;