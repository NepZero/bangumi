// 在全局范围定义一个数组来存储需要更新的收藏状态
let pendingUpdates = [];

async function loadAnimeData() {
    const user = await fetch('/is_login', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
    const response = await fetch('/user_like', {method: 'POST', headers: {'Content-Type': 'application/json', 'user': user['nickname']}}).then(res => res.json());
    const animeList = response.bangumi_list;const container = document.querySelector('.anime-grid');
    container.innerHTML = ''; // 清空容器
    //console.log(animeList);
    animeList.forEach(anime => {
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
        likeButton.onclick = function() {
            const bangumiId = this.dataset.id;
            
            // 检查是否已经在待更新列表中
            const existingUpdate = pendingUpdates.find(update => update.bangumi_id === bangumiId);
            
            if (existingUpdate) {
                // 如果已经存在，移除这个更新
                pendingUpdates = pendingUpdates.filter(update => update.bangumi_id !== bangumiId);
                this.style.backgroundImage = 'url(/img/like.png)';
            } else {
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
        likeButton.onmouseover = function() {
            this.style.filter = 'brightness(1.2)';
        };
        
        likeButton.onmouseout = function() {
            this.style.filter = '';
        };
    });
}

// 在页面刷新前发送所有待更新的请求
window.addEventListener('beforeunload', async function(e) {
    if (pendingUpdates.length > 0) {
        // 阻止页面立即关闭，等待请求完成
        e.preventDefault();
        e.returnValue = '';

        try {
            // 发送所有待更新的请求
            for (const update of pendingUpdates) {
                await fetch('/userinfo_update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(update)
                });
            }
            // 清空待更新列表
            pendingUpdates = [];
        } catch (error) {
            console.error('更新收藏状态失败:', error);
        }
    }
});

document.addEventListener('DOMContentLoaded', loadAnimeData);