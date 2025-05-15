$(document).ready(function() {
    $('.week-nav li a').click(function(e) {
        e.preventDefault();
        $('.week-nav li').removeClass('active');
        $(this).parent('li').addClass('active');
        var targetId = $(this).attr('href');
        $('.anime-container').removeClass('active').hide();
        $(targetId).addClass('active').fadeIn();
    });
});