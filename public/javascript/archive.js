var bangumi_informations = [
    { "name": "精灵幻想记 第二季", "screening": "周二00:30", "platform": "bilibili", "start_time": "2024.10.7", "episodes": 24, "isfinish": 1, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" },
    { "name": "重生大小姐正在攻略龙帝殿下", "screening": "周三12:30", "platform": null, "start_time": "2024.1.7", "episodes": 12, "isfinish": 0, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" }
]
var user = {};
var bangumicards_box = document.getElementsByClassName("bangumicards-box")[0];
var bangumicard = [];
var likes = []
var bangumicard_like = [];

function Init()
{
    for (var i = 1; i <= bangumi_informations.length; i++)
    {

        bangumicard[i] = document.createElement('div');
        bangumicard[i].style.width = "36%";
        bangumicard[i].style.height = "10vw";
        bangumicard[i].style.position = "relative";
        bangumicard[i].style.margin = "1vw auto";
        bangumicard[i].style.borderRadius = "0.5vw";
        bangumicard[i].style.backdropFilter = 'blur(10px)';
        bangumicard[i].style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        bangumicards_box.appendChild(bangumicard[i]);

        bangumicard_like[i] = document.createElement('div');
        bangumicard_like[i].style.height = '1.5vw';
        bangumicard_like[i].style.width = '1.5vw';
        bangumicard_like[i].style.position = 'absolute';
        bangumicard_like[i].style.right = '1%';
        bangumicard_like[i].className = i;
        if (likes[i] == 1)
            bangumicard_like[i].style.backgroundImage = 'url(/img/like.png)';
        else
            bangumicard_like[i].style.backgroundImage = 'url(/img/unlike.png)';
        bangumicard_like[i].style.backgroundRepeat = 'no-repeat';
        bangumicard_like[i].style.backgroundPosition = 'center';
        bangumicard_like[i].style.backgroundSize = 'cover';
        bangumicard_like[i].style.cursor = 'pointer';
        bangumicard[i].appendChild(bangumicard_like[i]);
        bangumicard_like[i].onmouseover = function ()
        {
            this.style.filter = 'brightness(1.2)';
        }
        bangumicard_like[i].onmouseout = function ()
        {
            this.style.filter = '';
        }
        bangumicard_like[i].onclick = function ()
        {
            if (likes[this.className] == 1)
            {
                this.style.backgroundImage = 'url(/img/unlike.png)';
                likes[this.className] = 0;
                saveListToCookie('likes', likes);
            }
            else
            {
                this.style.backgroundImage = 'url(/img/like.png)';
                likes[this.className] = 1;
                saveListToCookie('likes', likes);
            }
        }


        bangumicard_image = document.createElement('div');
        bangumicard_image.style.height = "100%";
        bangumicard_image.style.width = "20%";
        bangumicard_image.style.position = "absolute";
        bangumicard_image.style.backgroundColor = "white";
        bangumicard_image.style.borderRadius = "0.5vw";
        bangumicard_image.style.backgroundImage = `url("/img/${bangumi_informations[i - 1]['season']}/${bangumi_informations[i - 1]['id']}.png")`;
        bangumicard_image.style.backgroundRepeat = 'no - repeat';
        bangumicard_image.style.backgroundPosition = 'center';
        bangumicard_image.style.backgroundSize = 'cover';
        bangumicard_image.style.backdropFilter = 'blur(5px)';
        bangumicard_image.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        bangumicard[i].appendChild(bangumicard_image);

        bangumicard_header = document.createElement('div');
        bangumicard_header.style.height = "30%";
        bangumicard_header.style.width = "70%";
        bangumicard_header.style.position = "absolute";
        // bangumicard_header.style.backgroundColor = "blue";
        bangumicard_header.style.left = "25%";
        bangumicard_header.style.top = "10%";
        bangumicard_header.title = bangumi_informations[i - 1]["banguminame"];
        bangumicard_header.innerHTML = bangumi_informations[i - 1]["banguminame"];
        bangumicard_header.style.textAlign = "center";
        bangumicard_header.style.fontSize = "1.5vw";
        bangumicard_header.style.overflow = 'hidden';
        bangumicard_header.style.textOverflow = 'ellipsis';
        bangumicard_header.style.whiteSpace = 'nowrap';
        bangumicard[i].appendChild(bangumicard_header);

        bangumicard_time = document.createElement('div');
        bangumicard_time.style.height = "20%";
        bangumicard_time.style.width = "20%";
        bangumicard_time.style.position = "absolute";
        // bangumicard_time.style.backgroundColor = "yellow";
        bangumicard_time.style.left = "20%";
        bangumicard_time.style.top = "50%";
        bangumicard_time.style.textAlign = "center";
        bangumicard_time.innerHTML = bangumi_informations[i - 1]["screening"];
        bangumicard_time.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_time);

        bangumicard_platform = document.createElement('div');
        bangumicard_platform.style.height = "20%";
        bangumicard_platform.style.width = "20%";
        bangumicard_platform.style.position = "absolute";
        // bangumicard_platform.style.backgroundColor = "yellow";
        bangumicard_platform.style.left = "45%";
        bangumicard_platform.style.top = "50%";
        bangumicard_platform.style.textAlign = "center";
        if (bangumi_informations[i - 1]["platform"])
            bangumicard_platform.innerHTML = "大陆: " + bangumi_informations[i - 1]["platform"];
        else
            bangumicard_platform.innerHTML = "大陆: " + "暂无";
        bangumicard_platform.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_platform);

        bangumicard_episodes = document.createElement('div');
        bangumicard_episodes.style.height = "20%";
        bangumicard_episodes.style.width = "20%";
        bangumicard_episodes.style.position = "absolute";
        // bangumicard_episodes.style.backgroundColor = "yellow";
        bangumicard_episodes.style.left = "45%";
        bangumicard_episodes.style.top = "75%";
        bangumicard_episodes.style.textAlign = "center";
        bangumicard_episodes.innerHTML = "集数: " + bangumi_informations[i - 1]["episodes"];
        bangumicard_episodes.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_episodes);

        bangumicard_isfinish = document.createElement('div');
        bangumicard_isfinish.style.height = "20%";
        bangumicard_isfinish.style.width = "25%";
        bangumicard_isfinish.style.position = "absolute";
        // bangumicard_isfinish.style.backgroundColor = "yellow";
        bangumicard_isfinish.style.left = "70%";
        bangumicard_isfinish.style.top = "50%";
        bangumicard_isfinish.style.textAlign = "center";
        if (bangumi_informations[i - 1]["isfinish"] == 1)
            bangumicard_isfinish.innerHTML = "已完结";
        else
            bangumicard_isfinish.innerHTML = "连载中";
        bangumicard_isfinish.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_isfinish);

        bangumicard_tags = document.createElement('div');
        bangumicard_tags.style.height = "20%";
        bangumicard_tags.style.width = "25%";
        bangumicard_tags.style.position = "absolute";
        // bangumicard_tags.style.backgroundColor = "yellow";
        bangumicard_tags.style.left = "70%";
        bangumicard_tags.style.top = "75%";
        bangumicard_tags.style.textAlign = "center";
        bangumicard_tags.innerHTML = "标签";
        bangumicard_tags.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_tags);

        bangumicard_start = document.createElement('div');
        bangumicard_start.style.height = "20%";
        bangumicard_start.style.width = "20%";
        bangumicard_start.style.position = "absolute";
        // bangumicard_start.style.backgroundColor = "yellow";
        bangumicard_start.style.left = "20%";
        bangumicard_start.style.top = "75%";
        bangumicard_start.style.textAlign = "center";
        bangumicard_start.innerHTML = "开播: " + bangumi_informations[i - 1]["start_time"];
        bangumicard_start.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_start);



    }
    // console.log(likes);
}

// function main()
// {
//     let xhr = new XMLHttpRequest();
//     xhr.open("post", "/bangumiInfo", true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     // xhr.setRequestHeader('index', 'season');
//     xhr.setRequestHeader('season', '2025.4');
//     xhr.send();
//     xhr.onreadystatechange = function ()
//     {
//         if (xhr.readyState == 4 && xhr.status == 200)
//         {
//             bangumi_informations = JSON.parse(xhr.response)["data"];
//             console.log(JSON.parse(xhr.response));
//             Init();
//         }
//         else if (xhr.status == 404)
//         {
//             console.log("接受信息失败");
//         }
//     }
// }
async function fetchData()
{
    try
    {
        fetchA = fetch('/bangumiInfo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'season': '2025.4' } }).then(response => response.json());
        fetchB = fetch('/is_login', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());

        const responseA = await fetchA;
        bangumi_informations = responseA['data'];
        const responseB = await fetchB;
        user = responseB;

        for (var i = 1; i <= responseA['data'].length; i++)
        {
            likes[i] = 0;
        }
        if (user['code'] == 401)
        {
            if (getListFromCookie('likes') != null)
            {
                likes = getListFromCookie('likes');
            }
        }
        else
        {
            fetchC = fetch('/user_like', { method: 'POST', headers: { 'Content-Type': 'application/json', 'user': user['nickname'] } }).then(response => response.json());
            const responseC = await fetchC;
            for (var i = 1; i <= responseC['bangumi_list'].length; i++)
            {
                likes[responseC['bangumi_list'][i - 1]['id']] = 1;
            }
        }




        // console.log(bangumi_informations);
        console.log(user);


        Init();
    }
    catch (error)
    {
        console.error('请求失败:', error);
    }

}

// 保存列表到cookie
function saveListToCookie(listName, listData, daysToExpire = 30)
{
    // 将列表数据转换为JSON字符串
    const listString = JSON.stringify(listData);

    // 设置过期时间
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    // 设置cookie
    document.cookie = `${listName}=${encodeURIComponent(listString)};${expires};path=/`;
}

// 从cookie获取列表
function getListFromCookie(listName)
{
    const name = listName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++)
    {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ')
        {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0)
        {
            const listString = cookie.substring(name.length, cookie.length);
            return JSON.parse(listString);
        }
    }
    return null; // 如果没有找到则返回null
}

function main()
{
    fetchData();
}

main();





