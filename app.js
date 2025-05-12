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
app.get('/', (req, res) =>
{
    res.redirect('/index');
});


app.post('/bangumiInfo', (req, res) =>
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
