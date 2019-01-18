const blogDB = require('./DButil');

function insertComment (blogId, parent, parentName, userName, email, content, ctime, utime, callback) {
    let connection = blogDB.createConnection();
    let insertSql = 'INSERT INTO comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `content`, `ctime`, `utime`) values (?,?,?,?,?,?,?,?)';
    let params = [blogId, parent, parentName, userName, email, content, ctime, utime];
    connection.query(insertSql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    })
}

function queryCommentsById (blog_id, callback) {
    let connection = blogDB.createConnection();
    let insertSql = 'SELECT * FROM comments where blog_id = ?';
    let params = [blog_id];
    connection.query(insertSql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    })
}

function queryCommentCountById (blog_id, callback) {
    let connection = blogDB.createConnection();
    let insertSql = 'SELECT count(1) as count From comments where blog_id = ?';
    let params = [blog_id];
    connection.query(insertSql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    })
}

function queryRecentCommentsByIdDesc (size, callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT * FROM comments ORDER BY id DESC LIMIT ?';
    let params = [size];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    })
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsById = queryCommentsById;
module.exports.queryCommentCountById = queryCommentCountById;
module.exports.queryRecentCommentsByIdDesc = queryRecentCommentsByIdDesc;