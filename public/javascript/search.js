document.addEventListener('DOMContentLoaded', function ()
{
    const textSearchForm = document.getElementById('textSearchForm');
    const tagSearchForm = document.getElementById('tagSearchForm');
    const searchResults = document.getElementById('searchResults');

    // 文本搜索处理
    textSearchForm.addEventListener('submit', async function (e)
    {
        e.preventDefault();
        const text = this.querySelector('input[name="text"]').value.trim();

        if (!text) return;

        try
        {
            // 重置标签搜索表单
            tagSearchForm.reset();

            searchResults.innerHTML = '<div class="loading">搜索中...</div>';

            const response = await fetch('/searchbytext', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const result = await response.json();
            displayResults(result);
        } catch (error)
        {
            console.error('文本搜索失败:', error);
            searchResults.innerHTML = '<div class="error">搜索失败，请稍后重试</div>';
        }
    });

    // 标签搜索处理
    tagSearchForm.addEventListener('submit', async function (e)
    {
        e.preventDefault();

        // 获取表单数据
        const season = this.querySelector('#seasonSelect').value;
        const tag = this.querySelector('#tagSelect').value;
        const isfinish = this.querySelector('#statusSelect').value;

        try
        {
            // 重置文本搜索表单
            textSearchForm.reset();

            searchResults.innerHTML = '<div class="loading">搜索中...</div>';

            // 修改数据处理逻辑 - 按照 API 文档格式
            const formData = {
                season: season === 'all' ? '' : season,
                tag: tag === 'all' ? '' : tag,
                isfinish: isfinish === 'all' ? '' : (isfinish ? Number(isfinish) : '')
            };

            const response = await fetch('/searchbytag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // 改进响应数据处理逻辑
            if (Array.isArray(result))
            {
                // 直接返回数组的情况
                displayResults(result);
            } else if (result && result.data)
            {
                // 包含 data 字段的情况
                displayResults(result.data);
            } else
            {
                // 处理空结果的情况
                displayResults([]);
            }
        } catch (error)
        {
            console.error('标签搜索失败:', error);
            searchResults.innerHTML = '<div class="error">搜索失败，请稍后重试</div>';
        }
    });

    // 改进展示搜索结果函数
    function displayResults(data)
    {

        if (!Array.isArray(data))
        {
            console.error('非数组数据:', data);
            searchResults.innerHTML = '<div class="error">数据格式错误</div>';
            return;
        }

        if (data.length === 0)
        {
            searchResults.innerHTML = '<div class="no-results">未找到相关番剧</div>';
            return;
        }

        const resultsHTML = data.map(anime =>
        {
            // 添加数据验证
            if (!anime || typeof anime !== 'object')
            {
                console.error('无效的番剧数据:', anime);
                return '';
            }

            return `
    <div class="bangumicard">
        <div class="card-cover">
            <img src="/img/${anime.season || ''}/${anime.id || ''}.png" 
                 alt="${anime.banguminame || '未知番剧'}"
                 onerror="this.src='/img/0.jpg'">
        </div>
        <div class="card-content">
            <h3 class="anime-title">${anime.banguminame || '未知番剧'}</h3>
            <p class="update-time">${anime.screening || '更新时间未知'}</p>
        </div>
    </div>
            `;
        }).filter(html => html !== '').join('');

        searchResults.innerHTML = resultsHTML || '<div class="no-results">未找到相关番剧</div>';
    }
});


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