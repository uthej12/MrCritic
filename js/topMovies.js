var qs= (new URL(document.location)).searchParams;
var pagenum = Number(qs.get('page')); 
var imgurl = 'https://image.tmdb.org/t/p/w500';
var count=0;
var start =0;
var end = 20; 
if(pagenum > 1){
    end = pagenum * 20;
    start = end-20;
}
const hostname='http://localhost:3000/';
$(document).ready(() => {
    $('.pagination #'+pagenum).addClass('active');
    if(pagenum != 1)
        $('.pagination #previous').attr("href","topMovies.html?page="+(pagenum-1));
    else    
        $('.pagination #previous').addClass('disabled');
    if(pagenum != 10)
        $('.pagination #next').attr("href","topMovies.html?page="+(pagenum+1));
    else
        $('.pagination #next').addClass('disabled');
    movies = $.get(hostname+"topmovies",);
    movies.done((data) => {
        $.each(data, (i,item) => {
            if(count>=start & count <end){
                $(".movies-list").append
                ("<div class='col-12 col-sm-6 movie-tiles pr-5 pl-5 pr-md-2 pl-md-2' height='400px'>"+
                    "<div class='card movie-card'>"+
                        "<div class='row'>"+
                            "<div class='col-12 col-md-5' style='text-align:center'>"+
                                "<a href='enMovie.html?id="+item._id+"'>"+
                                "<img class='card-img-top' src='" + imgurl+item.poster_path + "' height='340px' width='240px'><a>"+
                            "</div>"+
                            "<div class='col-12 col-md-6 mov-des'>"+
                                "<h1>"+ item.title +"("+ item.release_date.split("-")[0] +")</h1>"+
                                "<p class='mov-desc' style='padding: 10px'>"+
                                    item.overview.split('. ')[0] + "<a href='enMovie.html?id="+item._id+"'>......more</a>"+
                                "</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>");
            }count++;
        });
    });
});

$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
  
  
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });
  
  
    return false;
  });