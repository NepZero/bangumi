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
        `;
        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', loadAnimeData);