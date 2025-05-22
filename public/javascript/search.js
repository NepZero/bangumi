document.addEventListener('DOMContentLoaded', function() {
    const textSearchForm = document.getElementById('textSearchForm');
    const searchResults = document.getElementById('searchResults');

    // 文本搜索函数
    async function searchByText(text) {
        try {
            const response = await fetch('/searchbytext', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            const data = await response.json();
            // 添加数据验证日志
            console.log('搜索请求参数:', { text });
            console.log('接收到的响应:', response.status, response.statusText);
            console.log('解析后的数据:', data);
            return data;
        } catch (error) {
            console.error('搜索失败:', error);
            throw error;
        }
}

    // 展示搜索结果
    function displayResults(animeList) {
        if (!animeList || animeList.length === 0) {
            searchResults.innerHTML = '<div class="no-results">未找到相关番剧</div>';
            return;
        }

        const resultsHTML = animeList.map(anime => `
            <div class="bangumicard">
                <div class="card-cover">
                    <img src="/img/2025.4/${anime.id}.png" alt="${anime.banguminame}" onerror="this.src='/img/0.jpg'">
                </div>
                <div class="card-info">
                    <h3 class="anime-title">${anime.banguminame}</h3>
                    <div class="update-info">
                        <span class="update-time">${anime.screening || '更新时间未知'}</span>
                    </div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // 处理搜索表单提交
    textSearchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[name="text"]');
        const searchText = searchInput.value.trim();

        if (!searchText) {
            return;
        }

        try {
            searchResults.innerHTML = '<div class="loading">正在搜索...</div>';
            const results = await searchByText(searchText);
            displayResults(results);
        } catch (error) {
            console.error('搜索出错:', error);
            searchResults.innerHTML = '<div class="error">搜索失败，请稍后重试</div>';
        }
    });
});