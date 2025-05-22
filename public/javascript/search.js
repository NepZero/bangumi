document.addEventListener('DOMContentLoaded', function() {
    const textSearchForm = document.getElementById('textSearchForm');
    const tagSearchForm = document.getElementById('tagSearchForm');
    const searchResults = document.getElementById('searchResults');

    // 文本搜索处理
    textSearchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const text = this.querySelector('input[name="text"]').value;
        
        try {
            const response = await fetch('/searchbytext', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('搜索失败:', error);
        }
    });

    // 标签搜索处理
    tagSearchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = {
            season: this.querySelector('#seasonSelect').value || 'all',
            tag: this.querySelector('#tagSelect').value || 'all',
            isfinish: this.querySelector('#statusSelect').value || 'all'
        };
        
        try {
            const response = await fetch('/searchbytag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('搜索失败:', error);
        }
    });

    // 显示搜索结果
    function displayResults(data) {
        if (!data || !data.length) {
            searchResults.innerHTML = '<div class="no-results">未找到相关结果</div>';
            return;
        }

        const resultsHTML = data.map(anime => `
            <div class="anime-card">
                <img src="/img/2025.4/${anime.id}.png" alt="${anime.banguminame}">
                <h3>${anime.banguminame}</h3>
                <p>${anime.screening}</p>
                <p>${anime.platform || 'bilibili'}</p>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }
});