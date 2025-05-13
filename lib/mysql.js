const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'bangumi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

class Database
{
    constructor()
    {
        // 使用连接池而不是单个连接
        this.pool = mysql.createPool(dbConfig);
    }

    async getAll(table, index = null, key = null)
    {
        let connection;
        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            // 使用 await 执行查询
            if (index != null)
                rows = await connection.execute(`SELECT * FROM ${table} where ${index}='${key}'`);
            else
                rows = await connection.execute(`SELECT * FROM ${table}`);
            // console.log('查询结果:', rows);

            return rows;
        } catch (err)
        {
            console.error('查询出错:', err);
            throw err; // 重新抛出错误以便外部处理
        } finally
        {
            // 释放连接回连接池，而不是关闭
            if (connection) connection.release();
        }
    }

    // 添加关闭连接池的方法
    async close()
    {
        await this.pool.end();
    }
}
module.exports = new Database(dbConfig);
// db = new Database(dbConfig);
// db.getAll('bangumi_info', 'season', "2025.4")
//     .then(data =>
//     {
//         console.log(data); // 输出实际数据
//     })
