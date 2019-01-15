const url = require('url');
const commentDao = require('../dao/commentDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const SvgCaptcha = require('svg-captcha');
let path = new Map();

function submit_comment (request, response) {
    let query = url.parse(request.url, true).query;
    let { id, name, email, content } = query;
    commentDao.insertComment(parseInt(id), -1, name, email, content, timeUtil.nowTime(), timeUtil.nowTime(), function (res) {
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

path.set('/submit_comment', submit_comment);
path.set('/getCaptcha', getCaptcha);

module.exports.path = path;