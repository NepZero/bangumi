$(document).ready(function ()
{
    // 轮播图相关代码
    var $carousel = $('#carousel-jumbotron');
    $carousel.carousel({
        interval: 5000
    });

    $('.carousel-control').click(function ()
    {
        $carousel.carousel('cycle');
    });
});

document.addEventListener('DOMContentLoaded', function ()
{
    const weekNav = document.querySelector('.week-nav');
    const animeContainer = document.getElementById('weekly-anime');
    let currentDay = 1; // 默认值将被实际的today值覆盖

    // 数据获取函数
    async function fetchWeeklyAnime(day)
    {
        try
        {
            fetchA = fetch('/week_table', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
            const responseA = await fetchA;
            const data = responseA;
            console.log(responseA)
            return data;
        } catch (error)
        {
            console.error('获取数据失败:', error);
            throw error;
        }
    }

    // 修改加载番剧数据函数
    async function loadWeeklyAnime(day)
    {
        try
        {
            console.log('正在加载第', day, '天的数据');
            animeContainer.innerHTML = '<div class="loading">加载中...</div>';

            const response = await fetchWeeklyAnime(day);
            console.log('获取到的响应:', response);

            // 仅在初始加载时更新"今天"标签
            if (response.today && !window.todayInitialized)
            {
                currentDay = response.today;
                const todayLink = weekNav.querySelector(`[data-day="${currentDay}"]`);
                if (todayLink)
                {
                    todayLink.textContent = '今天';
                    // 仅在初始加载时设置激活状态
                    if (!window.todayInitialized)
                    {
                        weekNav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                        todayLink.parentElement.classList.add('active');
                        window.todayInitialized = true;
                    }
                }
            }

            const weekData = response.data[day - 1];
            console.log('当前星期数据:', weekData); // 调试日志

            if (!weekData || !weekData.bangumi_list || weekData.bangumi_list.length === 0)
            {
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
        } catch (error)
        {
            console.error('加载番剧数据失败:', error);
            animeContainer.innerHTML = '<div class="error">加载失败，请稍后重试</div>';
        }
    }

    // 移除已有的 jQuery 事件监听器
    $('.week-nav li a').off('click');

    // 使用单一的事件处理器
    if (weekNav)
    {
        weekNav.addEventListener('click', async function (e)
        {
            const link = e.target.closest('a');
            if (!link) return;

            e.preventDefault();

            // 更新激活状态
            weekNav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');

            // 加载对应日期的番剧
            const day = parseInt(link.dataset.day);
            await loadWeeklyAnime(day);
        });

        // 初始加载
        fetchWeeklyAnime(1).then(response =>
        {
            if (response && response.today)
            {
                currentDay = response.today;
                const todayLink = weekNav.querySelector(`[data-day="${currentDay}"]`);
                if (todayLink)
                {
                    todayLink.textContent = '今天';
                    weekNav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                    todayLink.parentElement.classList.add('active');
                }
                loadWeeklyAnime(currentDay);
            }
        }).catch(error =>
        {
            console.error('初始化失败:', error);
        });
    } else
    {
        console.error('未找到周导航元素');
    }

    // 获取每日推荐数据
    async function fetchDailyRecommend()
    {
        try
        {
            const fetchA = fetch('/daily_recommend', {
                method: 'POST'
            }).then(response => response.json());

            const response = await fetchA;
            console.log('每日推荐数据:', response);
            return response;
        } catch (error)
        {
            console.error('获取每日推荐失败:', error);
            throw error;
        }
    }

    // 加载每日推荐到轮播图
    async function loadDailyRecommend()
    {
        try
        {
            const data = await fetchDailyRecommend();

            if (!data || !data.bangumi_list || data.bangumi_list.length === 0)
            {
                throw new Error('每日推荐数据为空');
            }

            // 生成指示器
            const indicators = data.bangumi_list.map((_, index) => `
                <li data-target="#carousel-jumbotron" 
                    data-slide-to="${index}" 
                    ${index === 0 ? 'class="active"' : ''}>
                </li>
            `).join('');

            document.querySelector('.carousel-indicators').innerHTML = indicators;

            // 生成轮播内容
            const carouselItems = data.bangumi_list.map((anime, index) => `
                <div class="item ${index === 0 ? 'active' : ''}">
                    <div class="jumbotron" style="background-image: url('/img/recommend/${anime.id}.jpg')">
                        <h1>${anime.banguminame}</h1>
                        <div class="container">
                            <p>${anime.screening}</p>
                            <p>${anime.platform || 'bilibili'}</p>
                            <p>${anime.episodes}集</p>
                            <p>${anime.status || '连载中'}</p>
                            <p>${anime.tags || '暂无标签'}</p>
                        </div>
                    </div>
                </div>
            `).join('');

            document.querySelector('.carousel-inner').innerHTML = carouselItems;

        } catch (error)
        {
            console.error('加载每日推荐失败:', error);
            document.querySelector('.carousel-inner').innerHTML =
                '<div class="error">加载失败，请稍后重试</div>';
        }
    }

    // 初始化轮播图
    const $carousel = $('#carousel-jumbotron');
    $carousel.carousel({
        interval: 5000
    });

    // 加载每日推荐数据
    loadDailyRecommend();
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