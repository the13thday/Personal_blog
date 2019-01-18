const blogDB = require('./DButil');

function queryTagByName (name, callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT * FROM tags where tag = ?';
    let params = [name];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function insertTag (tagName, ctime, utime, callback) {
    let connection = blogDB.createConnection();
    let sql = 'INSERT INTO tags (`tag`, `ctime`, `utime`) values (?,?,?)';
    let params = [tagName, ctime, utime];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function queryRandomTags (callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT * FROM tags';
    let params = [];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function queryTagIdByName (name, callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT id FROM tags where tag = ?';
    let params = [name];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

module.exports.queryTagByName = queryTagByName;
module.exports.insertTag = insertTag;
module.exports.queryRandomTags = queryRandomTags;
module.exports.queryTagIdByName = queryTagIdByName;