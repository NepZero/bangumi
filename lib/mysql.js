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
    async getAll_season(table, season = '2025.4')
    {
        let connection;
        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            // 使用 await 执行查询
            rows = await connection.execute(`SELECT * FROM ${table} where season='${season}'`);

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
    async insert_login(user = null, password = null)
    {
        let connection;
        try
        {
            connection = await this.pool.getConnection();
            const sql = `INSERT INTO login_info (user, password) VALUES (?, ?);`;
            await connection.execute(sql, [user, password]); // 参数化传递
            return 1;

        } catch (err)
        {
            console.error('插入出错:', err);
            return -1;
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
// db.getAll('login_info', 'user', "123456")
//     .then(data =>
//     {
//         console.log(data[0]); // 输出实际数据
//     })
// console.log(db.insert_login("nepnep", "123456"));
