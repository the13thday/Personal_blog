const blogDB = require('./DButil');

function queryTag (name, callback) {
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


module.exports.queryTag = queryTag;
module.exports.insertTag = insertTag;