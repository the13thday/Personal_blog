let blogDB = require('./DButil');

function insertEveryDay (content, ctime, callback) {
    let connection = blogDB.createConnection();
    let sql = "INSERT INTO every_day (`content`, `ctime`) values (?,?)";
    let params = [content, ctime];
    connection.query(sql, params, function (err, res) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
        connection.end();
    });
}

function getEveryDay (callback) {
    let connection = blogDB.createConnection();
    let sql = "SELECT * FROM every_day order by id desc limit 1";
    connection.query(sql, function (err, res) {
        if (!err) {
            callback(res[0]);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

module.exports = {
    insertEveryDay,
    getEveryDay
}