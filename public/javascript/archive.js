var bangumi_informations = [
    { "name": "精灵幻想记 第二季", "screening": "周二00:30", "platform": "bilibili", "start_time": "2024.10.7", "episodes": 24, "isfinish": 1, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" },
    { "name": "重生大小姐正在攻略龙帝殿下", "screening": "周三12:30", "platform": null, "start_time": "2024.1.7", "episodes": 12, "isfinish": 0, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" }
]
var user = {};
var bangumicards_box = document.getElementsByClassName("bangumicards-box")[0];
var bangumicard = [];
var season_likes = {}
var likes = [];
var bangumicard_like = [];
var season;
var title = document.getElementsByClassName("top-time-box")[0];
function more_season()
{
    var body = document.body;
    var more = document.getElementsByClassName("more")[0];
    var more_div = document.createElement('div');
    var more_flag = 0;
    var season_div = ['2025.4', '2025.1', '2024.10', '2024.7', '2024.4', '2024.1', '2023.10', '2023.7', '2023.4', '2023.1'];
    var season_cards = [];

    more.onclick = function ()
    {
        if (more_flag == 0)
        {
            more_flag = 1;
            more_div.style.height = '10vw';
            more_div.style.width = '7vw';
            // more_div.style.backgroundColor = 'blue';
            more_div.style.position = 'fixed';
            more_div.style.top = '3vw';
            more_div.style.left = '27%';
            more_div.style.zIndex = '500';
            more_div.style.overflowY = 'auto';
            more_div.style.borderRadius = "0.5vw";
            more_div.style.display = 'flex';
            more_div.style.flexDirection = 'column';
            more_div.style.gap = '2px';
            more_div.style.backdropFilter = 'blur(10px)';
            more_div.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            body.appendChild(more_div);

            for (var i = 0; i < season_div.length; i++)
            {
                season_cards[i] = document.createElement('div');
                season_cards[i].style.height = '1vw';
                season_cards[i].style.width = '100%';
                season_cards[i].innerHTML = season_div[i].slice(0, 4) + '年' + season_div[i].slice(5) + '月';
                season_cards[i].className = season_div[i];
                season_cards[i].style.fontSize = '0.8vw';
                more_div.appendChild(season_cards[i]);
                more_div.style.textAlign = "center";
                more_div.style.cursor = 'pointer';

                season_cards[i].onmouseover = function ()
                {
                    this.style.backgroundColor = 'rgb(139,139,139)';
                }
                season_cards[i].onmouseout = function ()
                {
                    this.style.backgroundColor = '';
                }
                season_cards[i].onclick = function ()
                {
                    // 创建并提交表单
                    const season = encodeURIComponent(this.className);
                    window.location.href = `/archive?season=${season}`;
                }
            }
        }
        else
        {
            more_flag = 0;
            body.removeChild(more_div);

        }
    }
}

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
                if (user['code'] == 401)
                {
                    season_likes[season] = likes;
                    saveListToCookie('likes', season_likes);
                }
                else
                {
                    fetchA = fetch('/userinfo_update', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ 'user': user['nickname'], 'user_id': user['user_id'], 'code': 100, 'bangumi_id': this.className, 'if_insert': 0 }) }).then(response => console.log(response.json()));
                }

            }
            else
            {

                this.style.backgroundImage = 'url(/img/like.png)';
                likes[this.className] = 1;
                if (user['code'] == 401)
                {
                    season_likes[season] = likes;
                    saveListToCookie('likes', season_likes);
                }
                else
                {
                    console.log(111);
                    fetchA = fetch('/userinfo_update', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ 'user': user['nickname'], 'user_id': user["user_id"], 'code': 100, 'bangumi_id': this.className, 'if_insert': 1 }) }).then(response => console.log(response.json()));
                }

            }
        }


        bangumicard_image = document.createElement('div');
        bangumicard_image.style.height = "100%";
        bangumicard_image.style.width = "20%";
        bangumicard_image.style.position = "absolute";
        bangumicard_image.style.backgroundColor = "white";
        bangumicard_image.style.borderRadius = "0.5vw";

        // bangumicard_image.style.backgroundImage = `url("/img/${bangumi_informations[i - 1]['season']}/${bangumi_informations[i - 1]['id']}.png")`;
        setimg(`/img/${bangumi_informations[i - 1]['season']}/${bangumi_informations[i - 1]['id']}.png`, bangumicard_image);
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
        bangumicard_platform.style.left = "48%";
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
        bangumicard_episodes.style.left = "48%";
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
        bangumicard_isfinish.style.left = "72%";
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
        bangumicard_tags.style.left = "72%";
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


async function fetchData()
{
    try
    {
        fetchA = fetch('/bangumiInfo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'season': season } }).then(response => response.json());
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
                console.log(season_likes)
                season_likes = getListFromCookie('likes');
                if (season_likes[season] != null)
                {
                    likes = season_likes[season]
                }
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
function setimg(imgurl, card)
{
    const tempImg = new Image();
    tempImg.onload = () =>
    {
        // 图片存在，设置背景
        card.style.backgroundImage = `url("${imgurl}")`;
    };
    tempImg.onerror = () =>
    {
        // 图片不存在，使用默认背景
        card.style.backgroundImage = 'url("/img/0.png")';
    };
    tempImg.src = imgurl;
}

function main()
{
    const urlParams = new URLSearchParams(window.location.search);
    season = urlParams.get('season');
    if (season == null)
        season = '2025.4';
    title.innerHTML = season.slice(0, 4) + '年' + season.slice(5) + '月新番'
    fetchData();
    more_season();
}

main();




