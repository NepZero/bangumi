document.addEventListener('DOMContentLoaded', function() {
    const textSearchForm = document.getElementById('textSearchForm');
    const tagSearchForm = document.getElementById('tagSearchForm');
    const tagOptions = document.getElementById('tagOptions');
    const searchResults = document.getElementById('searchResults');

    // 加载标签选项
    async function loadTags() {
        try {
            const response = await fetch('/tags');
            const tags = await response.json();
            
            const tagsHTML = tags.map(tag => `
                <label>
                    <input type="checkbox" name="tags" value="${tag}"> ${tag}
                </label>
            `).join('');
            
            tagOptions.innerHTML += tagsHTML;
        } catch (error) {
            console.error('加载标签失败:', error);
        }
    }

    // 处理全选标签
    tagOptions.addEventListener('change', function(e) {
        if (e.target.value === 'all') {
            const isChecked = e.target.checked;
            tagOptions.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.value !== 'all') {
                    checkbox.checked = isChecked;
                    checkbox.disabled = isChecked;
                }
            });
        }
    });

    // 文本搜索处理
    textSearchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const text = this.querySelector('input[name="text"]').value.trim();
        
        if (!text) return;
        
        try {
            const response = await fetch('/searchbytext', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            season: document.querySelector('input[name="season"]:checked').value,
            tags: Array.from(document.querySelectorAll('input[name="tags"]:checked'))
                      .map(input => input.value)
                      .filter(value => value !== 'all'),
            isfinish: document.querySelector('input[name="status"]:checked').value
        };
        
        try {
            const response = await fetch('/searchbytag', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    // 初始化
    loadTags();
});