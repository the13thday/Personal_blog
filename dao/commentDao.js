const blogDB = require('./DButil');

function insertComment (blogId, parent, userName, email, content, ctime, utime, callback) {
    let connection = blogDB.createConnection();
    let insertSql = 'INSERT INTO comments (`blog_id`, `parent`, `user_name`, `email`, `content`, `ctime`, `utime`) values (?,?,?,?,?,?,?)';
    let params = [blogId, parent, userName, email, content, ctime, utime];
    connection.query(insertSql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    })
}

module.exports.insertComment = insertComment;