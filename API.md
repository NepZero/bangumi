# JS中请求数据
**样例**
```js
let xhr = new XMLHttpRequest();
xhr.open("post", "/login", true); //请求方式  请求地址
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('user', '001'); //设置请求头，可设置多个
xhr.setRequestHeader('password', '123456');
xhr.send();
xhr.onreadystatechange = function () 
{
    if (xhr.readyState == 4 && xhr.status == 200)
    {
        //xhr.response是返回的json数据，要先解析
        console.log(JSON.parse(xhr.response)["code"]);
        //因为是异步请求，尽量在这使用数据
    }
    else if (xhr.status == 404)
    {
        console.log("接受信息失败");
    }
}
```
---

# API接口
## 用户登录接口
**请求地址:** /login
**请求方式:** post
**请求头**: user,password
|  请求头   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| user | str | 必要 | 1~10位用户名 |
 password | str | 必要 | 5~13位密码，可字母数字符号组合 |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code  | int | 响应状态 | 403-用户不存在<br>401-用户密码错误<br>200-登录成功|

## 注册接口
**请求地址:** /register
**请求方式:** post
**请求头**: user,password
|  请求头   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| user | str | 必要 | 1~10位用户名 |
 password | str | 必要 | 5~13位密码，可字母数字符号组合 |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code  | int | 响应状态 | 403-用户已存在<br>404-注册失败<br>200-注册成功|

## 请求季度番剧接口
**请求地址:** /bangumiInfo
**请求方式:** post
**请求头**: 
|  请求头   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| seaon | str | 非必要 | 如：2024.10,2024.1,2024.4,2024.7（没有则返回当前季度）|
| user | str | 非必要 | 当前用户名 |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code | int | 响应状态 | 200-响应成功|
| data | dict | 番剧数据 | |
| timestamp | Date | 响应时间 | |
| like | array | 该用户的收藏列表 | 没有则响应空列表 |
data:
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| banguminame | str | 番剧名 | |
| id | str | 番剧在数据库中id| 独有id |
| episodes | int | 集数 | |
| platform | str | 在大陆的播放平台 | |
| screening | str | 每周播出时间 | |
| season | str | 季度 | |
| start_time | str | 首播日期 | |