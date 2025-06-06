// 在全局范围定义一个数组来存储需要更新的收藏状态
let pendingUpdates = [];

// 新增：cookie操作函数
function setListToCookie(listName, list)
{
    document.cookie = `${listName}=${encodeURIComponent(JSON.stringify(list))};path=/;max-age=2592000`;
}
function getListFromCookie(listName)
{
    const name = listName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++)
    {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0)
        {
            const listString = cookie.substring(name.length, cookie.length);
            try
            {
                return JSON.parse(listString);
            } catch
            {
                return [];
            }
        }
    }
    return [];
}

async function loadAnimeData()
{
    const user = await fetch('/is_login', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
    // 登录后自动同步cookie收藏
    if (user && user.nickname)
    {
        let favList = getListFromCookie('favlist');
        if (favList && favList.length > 0)
        {
            for (const bangumiId of favList)
            {
                await fetch('/userinfo_update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'user': user['nickname'],
                        'user_id': user['user_id'],
                        'code': 100,
                        'bangumi_id': bangumiId,
                        'if_insert': 1
                    })
                });
            }
            setListToCookie('favlist', []); // 清空cookie
        }
        // 登录后：只显示数据库收藏
        const response = await fetch('/user_like', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user: user['nickname'] }) }).then(res => res.json());
        renderAnimeList(response.bangumi_list, user);
    } else
    {
        // 未登录：只显示cookie收藏
        let favList = getListFromCookie('favlist');
        if (!favList || favList.length === 0)
        {
            renderAnimeList([], null);
            return;
        }
        // 调用新接口根据ID列表获取番剧详细信息
        const response = await fetch('/getBangumiDetailsByIds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: favList }) // 发送ID列表
        }).then(res => res.json());

        const favAnime = response.data || []; // 获取后端返回的番剧数据

        renderAnimeList(favAnime, null); // 渲染获取到的番剧列表
    }
}

function renderAnimeList(animeList, user)
{
    const container = document.querySelector('.anime-grid');
    container.innerHTML = '';
    let favList = getListFromCookie('favlist');
    animeList.forEach(anime =>
    {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <div class="cover-image">
                <img src="/img/${anime.season}/${anime.id}.png" alt="${anime.banguminame}" onerror="this.onerror=null;this.src='/img/0.png';">
            </div>
            <div class="anime-info">
                <div class="anime-name">${anime.banguminame}</div>
                <div class="meta-info">
                    <span class="region-tag">${anime.screening}</span>
                    <span class="episode-info">全${anime.episodes}话</span>
                </div>
            </div>
            <div class="like-button" data-id="${anime.id}"></div>
        `;
        container.appendChild(card);
        const likeButton = card.querySelector('.like-button');

        // 渲染按钮状态
        likeButton.style.backgroundImage = 'url(/img/like.png)';

        likeButton.onclick = function ()
        {
            let favList = getListFromCookie('favlist');
            const isFav = favList.includes(anime.id);
            if (!user || !user.nickname)
            {
                // 未登录，切换收藏状态
                if (isFav)
                {
                    // 取消收藏
                    favList = favList.filter(id => id !== anime.id);
                    this.style.backgroundImage = 'url(/img/unlike.png)';
                } else
                {
                    // 添加收藏
                    favList.push(anime.id);
                    this.style.backgroundImage = 'url(/img/like.png)';
                }
                setListToCookie('favlist', favList);
                // 不强制刷新整个列表，按钮状态已即时切换
                return;
            }
            // 检查是否已经在待更新列表中
            const existingUpdate = pendingUpdates.find(update => update.bangumi_id === anime.id);
            if (existingUpdate)
            {
                // 如果已经存在，移除这个更新
                pendingUpdates = pendingUpdates.filter(update => update.bangumi_id !== anime.id);
                this.style.backgroundImage = 'url(/img/like.png)';
            } else
            {
                // 如果不存在，添加到待更新列表
                pendingUpdates.push({
                    'user': user['nickname'],
                    'user_id': user['user_id'],
                    'code': 100,
                    'bangumi_id': anime.id,
                    'if_insert': 0
                });
                this.style.backgroundImage = 'url(/img/unlike.png)';
            }
        };

        // 悬停效果
        likeButton.onmouseover = function ()
        {
            this.style.filter = 'brightness(1.2)';
        };
        likeButton.onmouseout = function ()
        {
            this.style.filter = '';
        };
    });
}

// 在页面刷新前发送所有待更新的请求
window.addEventListener('beforeunload', function (e)
{
    if (pendingUpdates.length > 0)
    {
        // 原有阻止跳转和弹窗的代码，现已注释
        // e.preventDefault();
        // e.returnValue = '';

        try
        {
            // 使用sendBeacon静默发送所有待更新的请求
            for (const update of pendingUpdates)
            {
                navigator.sendBeacon('/userinfo_update', new Blob([JSON.stringify(update)], { type: 'application/json' }));
            }
            // 清空待更新列表
            pendingUpdates = [];
        } catch (error)
        {
            console.error('更新收藏状态失败:', error);
        }
    }
});

document.addEventListener('DOMContentLoaded', loadAnimeData);


// 季度信息下拉菜单
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
more_season();