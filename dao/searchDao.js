const blogDB = require('./DButil');

function queryArticleByKeyWord (keyWord, page, pageSize, callback) {
    let connetion = blogDB.createConnection();
    let sql = 'SELECT * FROM blog WHERE title LIKE CONCAT("%",?,"%") limit ?, ?';
    let params = [keyWord, page * pageSize, pageSize];
    connetion.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connetion.end();
    });
}

function queryArticleCountByKeyWord (keyWord, callback) {
    let connetion = blogDB.createConnection();
    let sql = 'SELECT count(1) as count FROM blog WHERE title LIKE CONCAT("%",?,"%")';
    let params = [keyWord];
    connetion.query(sql, params, function (err, res) {
        if (!err) {
            typeof callback === 'function' && callback(res);
        } else {
            console.log(err);
        }
        connetion.end();
    });
}

module.exports.queryArticleByKeyWord = queryArticleByKeyWord;
module.exports.queryArticleCountByKeyWord = queryArticleCountByKeyWord;