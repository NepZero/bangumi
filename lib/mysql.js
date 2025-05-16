const mysql = require('mysql2/promise');
const seedrandom = require('seedrandom');

function getSeededRandomIndex(max, seed)
{
    const rng = seedrandom(seed); // 初始化带种子的生成器
    return Math.floor(rng() * max);
}

//数据库配置信息
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

    /**
     * 返回指定{table}字段{index}为{key}的所有记录
     * 默认返回所有{table}的记录
     */
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

            return rows[0];
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

    /**
     * 返回指定{season}的番剧信息
     * 默认为当前季度
     */
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

            return rows[0];
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

    /**
     * 返回{user}的收藏列表，包括番剧详细信息
     */
    async getuser_like(user)
    {
        let connection;
        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            // 使用 await 执行查询
            const sql = `SELECT bangumi_info.id,banguminame,start_time,screening,platform,isfinish,episodes,season FROM bangumi_info,uesrlike_info where bangumi_info.id=uesrlike_info.likes and uesrlike_info.user='${user}'`;
            rows = await connection.execute(sql);

            return rows[0];
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

    /**
     * 返回五个每日推荐的番剧信息
     * season默认为当季
     */
    async get_daily(season = '2025.4')
    {
        let connection;
        const date = new Date()
        let day = date.getDay();
        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            // 使用 await 执行查询
            rows = await connection.execute(`SELECT * FROM bangumi_info where season='${season}'`);
            rows = rows[0];
            let ans = [];
            //随机抽取 暂时
            // for (let i = 0; i < 5; i++)
            //     ans.push(rows[getSeededRandomIndex(rows.length, day + i * i * i)]);
            ans.push(rows[8]);
            ans.push(rows[32]);
            ans.push(rows[34]);
            ans.push(rows[59]);
            // console.log(ans)
            return ans;
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

    async insert_login(nickname = null, email = null, password = null)
    {
        let connection;
        try
        {
            connection = await this.pool.getConnection();
            const sql = `INSERT INTO login_info (nickname,email, password) VALUES (?,?, ?);`;
            await connection.execute(sql, [nickname, email, password]); // 参数化传递
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
// db.get_daily();
// db.getuser_like('nepnep')
//     .then(data =>
//     {
//         console.log(data[0]);
//     }
//     )
// db.getAll('login_info', 'user', "123456")
//     .then(data =>
//     {
//         console.log(data[0]); // 输出实际数据
//     })
// console.log(db.insert_login("nepnep", "123456"));
