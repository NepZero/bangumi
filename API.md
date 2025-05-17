# JS中请求数据
**样例**
```js 
async function fetchData() //异步函数 对返回的数据的操作写在此函数内
{
    try
    {
        fetchA = fetch('/bangumiInfo', { method: 'POST', headers: { 'Content-Type': 'application/json','season'='2024.10'} }).then(response => response.json()); //请求头可添加多个
        fetchB = fetch('/is_login', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
        const responseA = await fetchA; //异步请求数据 返回响应
        const responseB = await fetchB;
        bangumi_informations = responseA['data'];
        console.log(bangumi_informations);
    }
    catch (error)
    {
        console.error('请求失败:', error);
    }

}

fetchData();
```
---

# API接口
## 用户登录接口
**请求地址:** /login
**请求方式:** post
**请求体**: nickname,password
|  请求体   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| nickname | str | 必要 | 1~10位用户名 |
 password | str | 必要 | 5~13位密码，可字母数字符号组合 |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code  | int | 响应状态 | 403-用户不存在<br>401-用户密码错误<br>200-登录成功|

## 注册接口
**请求地址:** /register
**请求方式:** post
**请求体**: nickname,password,email
|  请求体   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| nickname | str | 必要 | 1~10位用户名 |
| password | str | 必要 | 5~13位密码，可字母数字符号组合 |
| email | str | 必要 | |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code  | int | 响应状态 | 403-用户已存在<br>404-注册失败<br>200-注册成功|

## 登录状态接口
**请求地址:** /is_login
**请求方式:** post
**请求头**: 无
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code  | int | 响应状态 | 200-已登录<br>401-未登录 |
| username | str | 当前登录账户 | 未登录为空 |
 id | int | 登录账号id | 未登录为空 |

## 请求季度番剧接口
**请求地址:** /bangumiInfo
**请求方式:** post
**请求头**: 
|  请求头   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| seaon | str | 非必要 | 如：2024.10,2024.1,2024.4,2024.7（没有则返回当前季度）|
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code | int | 响应状态 | 200-响应成功|
| data | array | 番剧数据 | |
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

## 每周番剧信息接口
**请求地址:** /week_table
**请求方式:** post
**请求头**: 无
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| data | array | 详细信息 | |
| today | int | 今天是周几 | |

data:
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| day | str | 周几 | |
| bangumi_list | array | 番剧信息 | |

## 用户收藏列表接口
**请求地址:** /user_like
**请求方式:** post
**请求头**: 
|  请求头   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| user | str | 必要 | 要查询的用户名 |
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| bangumi_list | array | 番剧信息 | |

## 每日推荐接口
**请求地址:** /daily_recommend
**请求方式:** post
**请求头**: 无
**json回复:**
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| bangumi_list | array | 番剧信息 | |

## 用户数据更新
**请求地址:** /userinfo_update
**请求方式:** post
**请求体**: 
|  请求体   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| user | str | 必要 | 用户名 |
| user_id | int | 必要 | 用户id |
| code | int | 必要 | 100-对用户收藏列表更新|

**code-100:**
|  请求体   | 类型  | 必要性 | 内容 |
| :----: | :----: | :----: | :----: |
| bangumi_id | int | 必要 | 番剧编号 |
| if_insert | int | 必要 | 1-插入<br>0-删除|
json回复:
|  字段   | 类型  | 内容 | 备注 |
| :----: | :----: | :----: | :----: |
| code | int | 更新结果 | 0-删除成功<br>1-添加成功<br>-1-删除失败<br>-2-已有数据，添加失败 |
| message | str | 更新内容 | |