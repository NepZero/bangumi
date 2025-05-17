$(document).ready(function () {
    // 轮播图相关代码
    var $carousel = $('#carousel-jumbotron');
    $carousel.carousel({
        interval: 5000
    });

    $('.carousel-control').click(function () {
        $carousel.carousel('cycle');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const weekNav = document.querySelector('.week-nav');
    const animeContainer = document.getElementById('weekly-anime');
    let currentDay = 1;

    // 数据获取函数
    async function fetchWeeklyAnime(day) {
        try {
            fetchA = fetch('/week_table', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
            const responseA = await fetchA;
            const data = responseA;
            console.log(responseA)
            return data;
        } catch (error) {
            console.error('获取数据失败:', error);
            throw error;
        }
    }

    // 加载番剧数据函数
    async function loadWeeklyAnime(day) {
        try {
            console.log('正在加载第', day, '天的数据'); // 调试日志
            animeContainer.innerHTML = '<div class="loading">加载中...</div>';

            const response = await fetchWeeklyAnime(day);
            console.log('获取到的响应:', response); // 调试日志

            const weekData = response.data[day - 1];
            console.log('当前星期数据:', weekData); // 调试日志

            if (!weekData || !weekData.bangumi_list || weekData.bangumi_list.length === 0) {
                animeContainer.innerHTML = '<div class="no-data">当天没有更新的番剧</div>';
                return;
            }

            const cardsHTML = weekData.bangumi_list.map(anime => `
                <div class="bangumicard">
                    <div class="card-cover">
                        <img src="/img/2025.4/${anime.id}.png" 
                             alt="${anime.banguminame}"
                             onerror="this.src='/img/0.jpg'">
                        <div class="card-hover">
                            <div class="card-tags">
                                <span class="start-tag">${anime.start_time}</span>
                                <span class="platform-tag">${anime.platform || '暂无'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-info">
                        <h3 class="anime-title">${anime.banguminame}</h3>
                        <div class="update-info">
                            <span class="update-time">${anime.screening}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            animeContainer.innerHTML = cardsHTML;
        } catch (error) {
            console.error('加载番剧数据失败:', error);
            animeContainer.innerHTML = '<div class="error">加载失败，请稍后重试</div>';
        }
    }

    // 移除已有的 jQuery 事件监听器
    $('.week-nav li a').off('click');

    // 使用单一的事件处理器
    if (weekNav) {
        weekNav.addEventListener('click', async function (e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            e.preventDefault();
            console.log('点击了导航项:', link.dataset.day); // 调试日志
            
            // 更新激活状态
            weekNav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // 加载对应日期的番剧
            const day = parseInt(link.dataset.day);
            currentDay = day;
            await loadWeeklyAnime(day); // 确保等待加载完成
        });

        // 初始加载
        console.log('开始初始加载'); // 调试日志
        loadWeeklyAnime(currentDay);
    } else {
        console.error('未找到周导航元素');
    }
});