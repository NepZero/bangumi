// 在全局范围定义一个数组来存储需要更新的收藏状态
let pendingUpdates = [];

async function loadAnimeData()
{
    const user = await fetch('/is_login', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
    const response = await fetch('/user_like', { method: 'POST', headers: { 'Content-Type': 'application/json', 'user': user['nickname'] } }).then(res => res.json());
    const animeList = response.bangumi_list; const container = document.querySelector('.anime-grid');
    container.innerHTML = ''; // 清空容器
    //console.log(animeList);
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
            <div class="like-button" style="background-image: url('/img/like.png');" data-id="${anime.id}"></div>
        `;
        container.appendChild(card);
        const likeButton = card.querySelector('.like-button');
        likeButton.onclick = function ()
        {
            const bangumiId = this.dataset.id;

            // 检查是否已经在待更新列表中
            const existingUpdate = pendingUpdates.find(update => update.bangumi_id === bangumiId);

            if (existingUpdate)
            {
                // 如果已经存在，移除这个更新
                pendingUpdates = pendingUpdates.filter(update => update.bangumi_id !== bangumiId);
                this.style.backgroundImage = 'url(/img/like.png)';
            } else
            {
                // 如果不存在，添加到待更新列表
                pendingUpdates.push({
                    'user': user['nickname'],
                    'user_id': user['user_id'],
                    'code': 100,
                    'bangumi_id': bangumiId,
                    'if_insert': 0
                });
                this.style.backgroundImage = 'url(/img/unlike.png)';
            }
        };

        // 添加鼠标悬停效果
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
window.addEventListener('beforeunload', async function (e)
{
    if (pendingUpdates.length > 0)
    {
        // 阻止页面立即关闭，等待请求完成
        e.preventDefault();
        e.returnValue = '';

        try
        {
            // 发送所有待更新的请求
            for (const update of pendingUpdates)
            {
                await fetch('/userinfo_update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(update)
                });
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