const blogDB = require('./DButil');

function queryTagBlogMapping (tagId, blogId, callback) {
    let connection = blogDB.createConnection();
    let sql = 'SELECT * FROM tag_blog_mapping where tag_id = ? AND blog_id = ?';
    let params = [tagId, blogId];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end()
    });
}

function insertTagBlogMapping (tagId, blogId, ctime, utime, callback) {
    let connection = blogDB.createConnection();
    let sql = 'INSERT INTO tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?,?,?,?)';
    let params = [tagId, blogId, ctime, utime];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end()
    });
}

module.exports.queryTagBlogMapping = queryTagBlogMapping;
module.exports.insertTagBlogMapping = insertTagBlogMapping;