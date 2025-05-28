/**
 * 番剧搜索类 - 处理文本搜索和标签搜索功能
 */
class BangumiSearch {
    /**
     * 初始化搜索功能
     * 获取必要的DOM元素并设置事件监听
     */
    constructor() {
        // 获取DOM元素
        this.textSearchForm = document.getElementById('textSearchForm');
        this.tagSearchForm = document.getElementById('tagSearchForm');
        this.searchResults = document.getElementById('searchResults');
        this.seasonSelect = document.getElementById('seasonSelect');
        this.tagSelect = document.getElementById('tagSelect');
        this.statusSelect = document.getElementById('statusSelect');
        
        // 初始化事件监听器
        this.initEventListeners();
        this.initSeasonOptions();
    }

    /**
     * 初始化事件监听器
     * 为搜索表单添加提交事件处理
     */
    initEventListeners() {
        this.textSearchForm.addEventListener('submit', this.handleTextSearch.bind(this));
        this.tagSearchForm.addEventListener('submit', this.handleTagSearch.bind(this));
    }

    /**
     * 初始化季度选项
     * 生成从2024.1到2025.4的季度选项
     */
    initSeasonOptions() {
        // 设定固定的季度范围
        const options = [
            { value: '2025.4', text: '2025年4月' },
            { value: '2025.1', text: '2025年1月' },
            { value: '2024.10', text: '2024年10月' },
            { value: '2024.7', text: '2024年7月' },
            { value: '2024.4', text: '2024年4月' },
            { value: '2024.1', text: '2024年1月' }
        ];

        // 更新季度选择器选项
        const defaultOptions = `
            <option value="">选择季度</option>
            <option value="all">所有</option>
        `;

        const seasonOptions = options.map(option => 
            `<option value="${option.value}">${option.text}</option>`
        ).join('');

        this.seasonSelect.innerHTML = defaultOptions + seasonOptions;
    }

    /**
     * 处理文本搜索
     * @param {Event} e - 提交事件对象
     */
    async handleTextSearch(e) {
        e.preventDefault();
        const text = this.textSearchForm.querySelector('input[name="text"]').value.trim();
        
        if (!text) return;

        try
        {
            // 重置标签搜索表单
            this.tagSearchForm.reset();
            this.showLoading();
            
            // 发送搜索请求
            const response = await fetch('/searchbytext', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            const result = await response.json();
            this.displayResults(result);
        } catch (error) {
            this.showError('搜索失败，请稍后重试');
        }
    }

    /**
     * 处理标签搜索
     * @param {Event} e - 提交事件对象
     */
    async handleTagSearch(e) {
        e.preventDefault();
        
        // 获取搜索条件
        const season = this.tagSearchForm.querySelector('#seasonSelect').value;
        const tag = this.tagSearchForm.querySelector('#tagSelect').value;
        const isfinish = this.tagSearchForm.querySelector('#statusSelect').value;
        
        try {
            // 重置文本搜索表单
            this.textSearchForm.reset();
            this.showLoading();
            
            // 处理搜索参数
            const formData = {
                season: season === 'all' ? '' : season,
                tag: tag === 'all' ? '' : tag,
                isfinish: isfinish === 'all' ? '' : (isfinish ? Number(isfinish) : '')
            };
            
            // 发送搜索请求
            const response = await fetch('/searchbytag', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // 处理返回的数据
            if (Array.isArray(result)) {
                this.displayResults(result);
            } else if (result && result.data) {
                this.displayResults(result.data);
            } else {
                this.displayResults([]);
            }
        } catch (error) {
            this.showError('搜索失败，请稍后重试');
        }
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        this.searchResults.innerHTML = '<div class="loading">搜索中...</div>';
    }

    /**
     * 显示错误信息
     * @param {string} message - 错误信息
     */
    showError(message) {
        this.searchResults.innerHTML = `<div class="error">${message}</div>`;
    }

    /**
     * 初始化收藏功能
     * @param {HTMLElement} card - 番剧卡片元素
     * @param {string} bangumiId - 番剧ID
     */
    async initLikeButton(card, bangumiId) {
        const likeButton = card.querySelector('.like-button');
        if (!likeButton) return;

        try {
            // 获取用户信息
            const user = await fetch('/is_login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json());

            // 确保 window.pendingUpdates 存在
            if (!window.pendingUpdates) {
                window.pendingUpdates = [];
            }

            // 设置初始状态
            const existingUpdate = window.pendingUpdates.find(
                update => update.bangumi_id === bangumiId
            );
            
            // 根据状态设置初始图标
            likeButton.style.backgroundImage = `url(/img/${existingUpdate ? 'unlike' : 'like'}.png)`;

            likeButton.onclick = function() {
                if (existingUpdate) {
                    window.pendingUpdates = window.pendingUpdates.filter(
                        update => update.bangumi_id !== bangumiId
                    );
                    this.style.backgroundImage = 'url(/img/like.png)';
                } else {
                    window.pendingUpdates.push({
                        'user': user['nickname'],
                        'user_id': user['user_id'],
                        'code': 100,
                        'bangumi_id': bangumiId,
                        'if_insert': 0
                    });
                    this.style.backgroundImage = 'url(/img/unlike.png)';
                }
            };
        } catch (error) {
            console.error('初始化收藏按钮失败:', error);
        }
    }

    /**
     * 展示搜索结果
     * @param {Array} data - 搜索结果数据数组
     */
    displayResults(data) {
        // 验证数据格式
        if (!Array.isArray(data)) {
            this.showError('数据格式错误');
            return;
        }

        // 处理空结果
        if (data.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">未找到相关番剧</div>';
            return;
        }

        // 确保 pendingUpdates 存在
        if (!window.pendingUpdates) {
            window.pendingUpdates = [];
        }

        // 生成结果HTML
        const resultsHTML = data.map(anime => {
            if (!anime || typeof anime !== 'object') {
                return '';
            }

            // 修改 displayResults 方法中的卡片模板
            return `
                <div class="bangumicard">
                    <div class="card-cover">
                        <img src="/img/${anime.season || ''}/${anime.id || ''}.png" 
                             alt="${anime.banguminame || '未知番剧'}"
                             onerror="this.src='/img/0.jpg'">
                    </div>
                    <div class="card-content">
                        <div class="info-line">
                            <h3 class="anime-title">${anime.banguminame || '未知番剧'}</h3>
                            <div class="like-button" style="background-image: url('/img/like.png');" data-id="${anime.id}"></div>
                        </div>
                        <p class="update-time">${anime.screening || '更新时间未知'}</p>
                    </div>
                </div>
            `;
        }).filter(html => html !== '').join('');

        this.searchResults.innerHTML = resultsHTML || '<div class="no-results">未找到相关番剧</div>';

        // 为每个卡片初始化收藏按钮
        const cards = this.searchResults.querySelectorAll('.bangumicard');
        cards.forEach(card => {
            const bangumiId = card.querySelector('.like-button').dataset.id;
            this.initLikeButton(card, bangumiId);
        });
    }
}

// 当DOM加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    new BangumiSearch();
});