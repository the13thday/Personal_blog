const url = require('url');
const commentDao = require('../dao/commentDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const SvgCaptcha = require('svg-captcha');

let path = new Map();

function submit_comment (request, response) {
    let query = url.parse(request.url, true).query;
    let { id, parentId, parentName, name, email, content } = query;
    commentDao.insertComment(parseInt(id), parseInt(parentId), parentName, name, email, content, timeUtil.nowTime(), timeUtil.nowTime(), function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    })
}

function getCaptcha (request, response) {
    let captcha = SvgCaptcha.create({height: 50, fontSize: 50});
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '', captcha));
    response.end();
}

function getCommentsById (request, response) {
    let query = url.parse(request.url, true).query;
    let blogId = query.id;
    commentDao.queryCommentsById(blogId, function (res) {
        res.forEach(item => {
            item.ctime = timeUtil.format(item.ctime);
            item.utime = timeUtil.format(item.utime);
        })
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '获取总数成功', res));
    })
}

function getCommentCountById (request, response) {
    let query = url.parse(request.url, true).query;
    let blogId = query.id;
    commentDao.queryCommentCountById(blogId, function (res) {
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '读取评论成功', res));
    })
}

function getRecentComments (request, response) {
    let query = url.parse(request.url, true).query;
    let size = parseInt(query.size);
    commentDao.queryRecentCommentsByIdDesc(size, res => {
        res.forEach(item => {
            item.ctime = timeUtil.format(item.ctime);
            item.utime = timeUtil.format(item.utime);
        })
        response.writeHead(200);
        response.end(respUtil.writeResult('success', '最新评论', res));
    })
}

path.set('/submit_comment', submit_comment);
path.set('/getCaptcha', getCaptcha);
path.set('/getCommentsById', getCommentsById);
path.set('/getCommentCountById', getCommentCountById);
path.set('/getRecentComments', getRecentComments);


module.exports.path = path;