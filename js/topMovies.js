import { key, tmdb, njs, img, cast_img}  from '../js/serverDetails.js';
var qs= (new URL(document.location)).searchParams;
var pagenum = Number(qs.get('page')); 
var start =0;
var end = 20; 
if(pagenum > 1){
    end = pagenum * 20;
    start = end-20;
}
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


        var movies=$.ajax({
            url: njs+'topmovies',
            method: 'GET',
            dataType: 'JSON', 
          })
          .done((data) => {
            console.log(data);
            $.each(data ,(i,item) =>{
              if(i>start & i<end){
                $('.movies').append("<div class='row element'>"+
                                    "<div class='col-5 col-sm-4 mov-img-container'>"+
                                      "<a href='enMovie.html?_id="+item._id+"'><img src='"+cast_img+item.poster_path+"' class='img-responsive mov-img'></a>"+
                                    "</div>"+
                                    "<div class='col-7 col-sm-8' style='padding: 0px'>"+
                                      "<div class='container-fluid'>"+
                                        "<div class='row'>"+
                                          "<div class='col-12'>"+
                                            "<h2 class='mov-title'><a href='enMovie.html?_id="+item._id+"'>"+item.title+" </a></h2><h4 class='mov-year'>"+item.release_date.split('-')[0]+"</h4>"+
                                          "</div>"+
                                          "<div class='col-12'>"+
                                              "<div class='mov-desc'><p>"+item.overview.split(". ")[0]+item.overview+"</p></div>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>"+
                                    "</div>"+
                                    "</div><hr class='div-line'>");
                  }
              });
          })
          .fail(()=>{
            console.log('Error');
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