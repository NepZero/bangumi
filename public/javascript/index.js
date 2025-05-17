async function fetchData() //异步函数 对返回的数据的操作写在此函数内
{
    try
    {
        console.log(111);
        fetchA = fetch('/week_table', { method: 'POST', headers: { 'Content-Type': 'application/json'} }).then(response => response.json()); //请求头可添加多个
        const responseA = await fetchA; //异步请求数据 返回响应
        console.log(responseA);
    }
    catch (error)
    {
        console.error('请求失败:', error);
    }

}

fetchData();

$(document).ready(function() {
    $('.week-nav li a').click(function(e) {
        e.preventDefault();
        $('.week-nav li').removeClass('active');
        $(this).parent('li').addClass('active');
        var targetId = $(this).attr('href');
        $('.anime-container').removeClass('active').hide();
        $(targetId).addClass('active').fadeIn();
    });

    var $carousel = $('#carousel-jumbotron');
    $carousel.carousel({
        interval: 5000
    });
    
    $('.carousel-control').click(function() {
        $carousel.carousel('cycle');
    });
});

document.addEventListener('DOMContentLoaded', function() {

    fetch('/api/daily-recommendations')
        .then(response => response.json())
        .then(data => {
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            days.forEach(day => {
                const container = document.getElementById(day);
                const dayData = data[day] || [];
                
                container.innerHTML = '';
                
                dayData.forEach(anime => {
                    const card = createAnimeCard(anime);
                    container.appendChild(card);
                });
            });
        })
        .catch(error => console.error('获取推荐数据失败:', error));
});

function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'bangumicard';
    
    card.innerHTML = `
        <img src="${anime.cover_url}" alt="${anime.title}">
        <div class="card-info">
            <h3 class="anime-title">${anime.title}</h3>
            <p class="update-time">${anime.update_time}</p>
            <p class="episodes">${anime.episodes}集</p>
            <p class="status">${anime.status}</p>
        </div>
    `;
    
    return card;
}