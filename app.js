//导入 express
const express = require('express');
const db = require('./lib/mysql.js');
const session = require("express-session");
const e = require('express');

//创建应用对象
const app = express();
app.use(express.static('./public'));
app.use(session({
    name: 'sid',   //设置cookie的name，默认值是：connect.sid
    secret: 'nepnep', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true,  //是否在每次请求时重新保存session
    cookie: {
        httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 1000 * 300 // 这一条 是控制 sessionID 的过期时间的！！！
    },
}))


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
    //有登录则返回个人信息
    if (req.session.username)
    {
        res.json({
            success: true,
            data: [],
            timestamp: new Date().toISOString()
        });
    }
    else
    {
        db.getAll('bangumi_info', index, key)
            .then(data =>
            {
                // console.log(data);
                res.json({
                    success: true,
                    data: data[0],
                    timestamp: new Date().toISOString()
                });
            })
    }
    // res.send(`接收到的表名: ${tableName}`);
});
/**
 * 注册接口
 * code 200-注册成功    403-用户已存在  404-注册失败
 */
app.get('/register', (req, res) =>
{
    // const user = req.headers['user'];
    // const password = req.headers['password'];
    const user = req.query['user'];
    const password = req.query['password'];
    db.getAll('login_info', 'user', user)
        .then(data =>
        {
            data = data[0];
            if (data.length == 0)
            {
                db.insert_login(user, password)
                    .then(flag =>
                    {
                        if (flag == 1)
                        {
                            req.session.username = user;
                            res.json({ 'code': 200 });
                        }
                        else
                        {
                            res.json({ 'code': 404, 'error': "fault" });
                        }
                    })

            }
            else
            {
                res.json({ 'code': 403, 'error': 'Already Exist' })
            }
        })
    // res.send(`接收到的表名: ${tableName}`);
});
/**
 * 登录接口
 * code:404-用户不存在  401用户密码错误    200登录成功
 */
app.post('/login', (req, res) =>
{
    const user = req.headers['user'];
    const password = req.headers['password'];
    db.getAll('login_info', 'user', user)
        .then(data =>
        {
            data = data[0];
            if (data.length == 0)
            {
                res.json({ 'code': 404, 'error': 'Not Found' })
            }
            else
            {
                if (data["password"] == password)
                {
                    req.session.username = user;
                    res.json({ 'code': 200 })
                }
                else
                {
                    res.json({ 'code': 401, 'error': 'Unauthorized' })
                }
            }
        })
    // res.send(`接收到的表名: ${tableName}`);
});

app.get('/test', (req, res) =>
{
    req.session.username = 'zhangsan';
    res.send('登录成功');
});
app.get('/test1', (req, res) =>
{
    if (req.session.username)
    {
        res.send(`你好 ${req.session.username}`);
    }
    else
    {
        res.send(`请登录注册`);
    }
});



//监听端口 启动服务
app.listen(8080, () =>
{
    console.log('服务已经启动, 端口监听为 8080...');
});
