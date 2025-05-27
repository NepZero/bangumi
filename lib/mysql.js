const { uniqueSort } = require('jquery');
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
                rows = await connection.execute(`SELECT * FROM ${table} where BINARY ${index}='${key}'`);
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
            const sql = `SELECT bangumi_info.id,banguminame,start_time,screening,platform,isfinish,episodes,season FROM bangumi_info,userlike_info where bangumi_info.id = userlike_info.likes and userlike_info.user='${user}'`;
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
     * 返回四个每日推荐的番剧信息
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
            await this.get_tags([9, 33, 35, 60]).then(data => { ans[0]['tags'] = data[0], ans[1]['tags'] = data[1], ans[2]['tags'] = data[2], ans[3]['tags'] = data[3] });
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


    /**
     * 返回对应id的标签
     */
    async get_tags(bangumi_id = [])
    {
        let connection;
        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            let ans = [];
            // 使用 await 执行查询
            for (let i = 0; i < bangumi_id.length; i++)
            {
                rows = await connection.execute(`SELECT tag FROM tag_info where id='${bangumi_id[i]}'`);
                rows = rows[0];
                ans.push([]);
                for (let j = 0; j < rows.length; j++)
                {
                    ans[i].push(rows[j]['tag']);
                }
            }
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



    /**
     * 进行用户收藏的数据库更新
     * like 0-删除收藏 1-添加收藏
     * 返回值 0-删除成功 1-添加成功 -1-删除失败 -2-已有数据，添加失败
     */
    async update_like(user = null, user_id = null, like = null, bangumi_id = null)
    {
        let connection;

        try
        {
            // 从连接池获取连接
            let rows;
            connection = await this.pool.getConnection();
            if (like == 0)
            {
                const sql = `delete from userlike_info where user='${user}' and likes=${bangumi_id}`;
                const [result] = await connection.execute(sql);
                if (result.affectedRows === 0)
                {
                    return { 'code': -1, 'message': '无此条数据,删除失败' };
                }
                return { 'code': 0, 'message': '删除成功' };
            }
            else if (like == 1)
            {
                const [checkRows] = await connection.execute(`SELECT 1 FROM userlike_info WHERE user_id = ? AND likes = ? LIMIT 1`, [user_id, bangumi_id]);
                if (checkRows.length > 0)
                {
                    return { 'code': -2, 'message': '该收藏数据已存在' };
                }
                const sql = `INSERT INTO userlike_info (user_id,user,likes) VALUES (?,?,?)`;
                await connection.execute(sql, [user_id, user, bangumi_id]);
                return { 'code': 1, 'message': '添加成功' };
            }

        } catch (err)
        {
            console.error('查询出错:', err);
            return -1;
            throw err; // 重新抛出错误以便外部处理

        } finally
        {
            // 释放连接回连接池，而不是关闭
            if (connection) connection.release();
        }
    }

    /**
     * 插入用户数据
     * */
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
            // console.error('插入出错:', err);
            return -1;
            throw err; // 重新抛出错误以便外部处理
        } finally
        {
            // 释放连接回连接池，而不是关闭
            if (connection) connection.release();
        }
    }
    /**
     * 根据各个tag标签 返回对应的番剧 tag标签目前总共三大类 季度 番剧类型 是否连载中
     */
    async get_id_according_tag(season = null, tag = null, isfinish = null) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            let sql = 'SELECT DISTINCT b.* FROM bangumi_info b';
            let params = [];
            let conditions = [];

            if (tag && tag !== '' && tag !== 'all') {
                sql += ' INNER JOIN tag_info t ON b.id = t.id';
                conditions.push('t.tag LIKE ?');
                params.push(`%${tag.trim()}%`);
            }

            if (season && season !== '' && season !== 'all') {
                conditions.push('b.season = ?');
                params.push(season);
            }

            if (isfinish !== null && isfinish !== '' && isfinish !== 'all') {
                conditions.push('b.isfinish = ?');
                params.push(Number(isfinish));
            }

            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }

            sql += ' ORDER BY b.id ASC';

            const [rows] = await connection.execute(sql, params);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    /**
     * 根据搜索框的文字 返回对应的番剧 
     */
    async get_id_according_text(text = null) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            if (!text) return [];
            // 使用LIKE进行模糊查询
            let sql = `SELECT * FROM bangumi_info WHERE banguminame LIKE ?`;
            let [rows] = await connection.execute(sql, [`%${text}%`]);
            return rows;
        } catch (err) {
            console.error('查询出错:', err);
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    /**
     * 返回指定ID列表的番剧详细信息
     */
    async getBangumiByIds(ids) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            if (!ids || ids.length === 0) {
                return [];
            }
            // 使用IN子句和参数化查询
            const placeholders = ids.map(() => '?').join(',');
            const sql = `SELECT * FROM bangumi_info WHERE id IN (${placeholders})`;
            const [rows] = await connection.execute(sql, ids);
            return rows;
        } catch (err) {
            console.error('根据ID查询番剧出错:', err);
            throw err;
        } finally {
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
// db.get_daily()
//     .then(data =>
//     {
//         console.log(data);
//     })
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
