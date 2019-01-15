let blogDB = require('./DButil');

function insertArticle (title, content, views, tags, ctime, utime, callback) {
    let connection = blogDB.createConnection();
    let sql = 'INSERT INTO blog (`title`, `content`, `views`, `tags`, `ctime`, `utime`) values (?,?,?,?,?,?)';
    let params = [title, content, views, tags, ctime, utime];
    connection.query(sql, params, function (err, res) {
        if (!err) {
           typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function queryArticleByPage (page, pageSize, callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT * FROM blog ORDER BY id DESC limit ?,?';
    let params = [page * pageSize, pageSize];
    connection.query(sql, params, function (err, res) {
        if (!err) {
           typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function queryArticleCount (callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT count(1)as count FROM blog';
    let params = [];
    connection.query(sql, params, function (err, res) {
        if (!err) {
           typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}


module.exports = {
    insertArticle,
    queryArticleByPage,
    queryArticleCount
}