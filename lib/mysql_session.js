const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// 配置数据库连接池
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'bangumi',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

// 创建session存储
const sessionStore = new MySQLStore({
    expiration: 10800000, // 3小时
    createDatabaseTable: true,
    schema: {
        tableName: 'session_tab',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    },
    retries: 3, // 查询失败重试次数
    acquireTimeout: 10000 // 10秒超时
}, pool); // 关键修改：传入连接池而非单连接

module.exports = sessionStore;