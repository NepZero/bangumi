//导入 express
const express = require('express');
const db = require('./lib/mysql.js');

//创建应用对象
const app = express();
app.use(express.static('./public'));


//创建路由规则
app.get('/archive', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/archive.html')
});
app.get('/index', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/index.html')
});
app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/login.html')
});
app.get('/favlist', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/favlist.html')
});
app.get('/', (req, res) =>
{
    res.redirect('/index');
});


/**
 * 请求季度番剧信息的接口
 */
app.post('/bangumiInfo', (req, res) =>
{
    const index = req.headers['index']; //键名
    const key = req.headers['key']; //对应的值
    db.getAll('bangumi_info', index, key)
        .then(data =>
        {
            console.log(data);
            res.json({
                success: true,
                data: data[0],
                timestamp: new Date().toISOString()
            });
        })
    // res.send(`接收到的表名: ${tableName}`);
});

app.post('/login', (req, res) =>
{
    const tableName = req.headers['table'];
    console.log(tableName);
    db.getAll(tableName)
        .then(data =>
        {
            res.json({
                success: true,
                data: data,
                timestamp: new Date().toISOString()
            });
        })
    // res.send(`接收到的表名: ${tableName}`);
});

//监听端口 启动服务
app.listen(8080, () =>
{
    console.log('服务已经启动, 端口监听为 8080...');
});
