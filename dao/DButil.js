const mysql = require('mysql');

function createConnection () {
    let connection = mysql.createConnection({
        host: '192.168.2.102',
        // host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'the13thday',
        database: 'my_blog'
    })
    connection.connect();
    return connection;
}

module.exports.createConnection = createConnection;