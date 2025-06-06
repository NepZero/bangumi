//导入 express
const express = require('express');
const db = require('./lib/mysql.js');
const session = require("express-session");
const sessionStore = require('./lib/mysql_session.js');

//创建应用对象
const app = express();
app.use(express.static('./public'));
app.use(express.json());//解析JSON
app.use(express.urlencoded({ extended: true }));//解析 form 表单的数据
app.use(session({
    name: 'sid',   //设置cookie的name，默认值是：connect.sid
    secret: 'nepnep', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true,  //是否在每次请求时重新保存session
    store: sessionStore,
    cookie: {
        httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 1000 * 60 * 60 * 12 // 这一条 是控制浏览器 sessionID 的过期时间的！！！
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
app.get('/search', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/search.html');
});
app.get('/login', (req, res) =>
{
    //用户已登录 禁止重复进入
    if (req.session.userId && req.session.nickname)
    {
        res.redirect('/index');
    } else
    {
        // 返回登录页面
        res.sendFile(__dirname + '/public/html/login.html');
    }
});
app.get('/favlist', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/favlist.html');
});
app.get('/register', (req, res) =>
{
    //用户已登录 禁止重复进入
    if (req.session.userId && req.session.nickname)
    {
        res.redirect('/index');
    } else
    {
        // 返回注册页面
        res.sendFile(__dirname + '/public/html/register.html');
    }
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
    const season = req.headers['season'];
    db.getAll_season('bangumi_info', season)
        .then(data =>
        {
            // console.log(data);
            res.json({
                code: 200,
                data: data,
                like: [],
                timestamp: new Date().toISOString()
            });
        })
    // res.send(`接收到的表名: ${tableName}`);
});
/**
 * 注册接口
 * code 200-注册成功    403-用户已存在  404-注册失败
 */
app.post('/register', async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const nickname = req.body.nickname;
    if (confirmPassword !== password) return res.status(403).json({ code: 403, error: '密码不一致' });
    try
    {
        let result = await db.getAll('login_info', 'email', email);
        if (result.length !== 0)
        {
            return res.status(403).json({ code: 403, error: '该邮箱已被注册' });
        }
        result = await db.getAll('login_info', 'nickname', nickname);
        if (result.length !== 0)
        {
            return res.status(403).json({ code: 403, error: '该昵称已被注册' });
        }
        if (db.insert_login(nickname, email, password)) return res.status(200).json({ code: 200, message: '注册成功' });
        else return res.status(404).json({ code: 404, error: '数据库插入错误' });
    } catch (e)
    {
        console.error('登录异常：', e);
        return res.status(404).json({ code: 404, error: e.message || '服务器内部错误' });
    }
});
/**
 * 登录接口
 * code:403-用户不存在   401用户密码错误    200登录成功    404数据库错误
 */
app.post('/login', async (req, res) =>
{
    //在login.js中已经改用fetch重新发送 详情看该文件
    const user = req.body.user;
    const password = req.body.password;
    const searchType = req.body.searchType;
    const isKeepLogin = req.body.checkbox === 'on';
    try
    {
        const result = await db.getAll('login_info', searchType, user);
        const data = result[0];
        if (!data)
        {
            return res.status(403).json({ code: 403, error: '用户不存在' });
        }

        if (data.password !== password)
        {
            return res.status(401).json({ code: 401, error: '密码错误' });
        }
        req.session['userId'] = data.id;
        req.session['nickname'] = data.nickname;
        if (isKeepLogin)
        {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
        } else
        {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 12;
        }
        return res.status(200).json({ code: 200, message: '登录成功' });
    } catch (e)
    {
        console.error('登录异常：', e);
        return res.status(404).json({ code: 404, error: e.message || '服务器内部错误' });
    }
});
/**
 * 登录状态接口，返回登录信息
 */
app.post('/is_login', (req, res) =>
{
    if (req.session['userId'] && req.session['nickname'])
    {
        return res.status(200).json({ code: 200, nickname: req.session.nickname, user_id: req.session.userId });
    } else
    {
        return res.status(401).json({ code: 401, message: '未登录' });
    }
});
/**
 * 登出接口，清除登录信息
 */
app.post('/log_out', (req, res) =>
{
    if (req.session.userId && req.session.nickname)
    {
        req.session.destroy(err =>
        {
            if (err)
            {
                console.error('注销失败:', err);
                return res.status(500).send('注销失败');
            }
            res.clearCookie('connect.sid');
            return res.redirect('/index');
        });
    } else
    {
        return res.redirect('/index');
    }
});

/**
 * 返回周番剧信息
 */
app.post('/week_table', (req, res) =>
{
    function day2number(day)
    {
        if (day[1] == "一")
            return 0;
        else if (day[1] == "二")
            return 1;
        else if (day[1] == "三")
            return 2;
        else if (day[1] == "四")
            return 3;
        else if (day[1] == "五")
            return 4;
        else if (day[1] == "六")
            return 5;
        else if (day[1] == "日")
            return 6;
    }
    db.getAll('bangumi_info', 'season', '2025.4')
        .then(data =>
        {
            const date = new Date()
            ans = [];
            ans.push({ 'day': '周一', 'bangumi_list': [] });
            ans.push({ 'day': '周二', 'bangumi_list': [] });
            ans.push({ 'day': '周三', 'bangumi_list': [] });
            ans.push({ 'day': '周四', 'bangumi_list': [] });
            ans.push({ 'day': '周五', 'bangumi_list': [] });
            ans.push({ 'day': '周六', 'bangumi_list': [] });
            ans.push({ 'day': '周日', 'bangumi_list': [] });
            for (let i = 0; i < data.length; i++)
            {
                ans[day2number(data[i]['screening'])]['bangumi_list'].push(data[i]);
            }
            if (date.getDay() == 0)
            {
                res.json({ 'data': ans, 'today': 7 });
            }

            else
            {
                res.json({ 'data': ans, 'today': date.getDay() });
            }

        })
});
/**
 * 返回指定用户收藏列表信息
 */
app.post('/user_like', (req, res) =>
{
    const user = req.body.user;
    db.getuser_like(user)
        .then(data =>
        {
            res.json({ 'bangumi_list': data });
        })
});
/**
 * 每日推荐
 */
app.post('/daily_recommend', (req, res) =>
{
    db.get_daily()
        .then(data =>
        {
            res.json({ 'bangumi_list': data });
        })
});
/**
 * 对用户指定行为进行数据更新
 * code 100-对用户收藏列表更新
 * if_insert 1-插入 0-删除
 */
app.post('/userinfo_update', (req, res) =>
{
    const user = req.body.user;
    const user_id = req.body.user_id;
    const code = req.body.code;
    if (code == 100)
    {
        const bangumi_id = req.body.bangumi_id;
        const if_insert = req.body.if_insert;
        db.update_like(user, user_id, if_insert, bangumi_id)
            .then(data =>
            {
                res.json(data);
            })
    }
});
app.post('/searchbytag', (req, res) =>
{
    const season = req.body.season;
    const tag = req.body.tag;
    const isfinish = req.body.isfinish;
    db.get_id_according_tag(season, tag, isfinish).then(data =>
    {
        res.json(data);
    })
})
app.post('/searchbytext', (req, res) =>
{
    const text = req.body.text;
    db.get_id_according_text(text).then(data =>
    {
        res.json(data);
    })
})

/**
 * 根据ID列表返回番剧详细信息
 * 请求地址: /getBangumiDetailsByIds
 * 请求方式: post
 * 请求体: { ids: [id1, id2, ...] }
 * json回复: 番剧详细信息列表
 */
app.post('/getBangumiDetailsByIds', async (req, res) => {
    const ids = req.body.ids; // 假设前端在body中发送{ ids: [...] }
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ code: 400, message: '请求体需包含非空ID数组' });
    }
    try {
        const bangumiList = await db.getBangumiByIds(ids);
        res.json({ code: 200, data: bangumiList });
    } catch (error) {
        console.error('获取指定ID番剧信息出错:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
});

//监听端口 启动服务
app.listen(8080, () =>
{
    console.log('服务已经启动, 端口监听为 8080...');
});
