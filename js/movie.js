var qs = (new URL(document.location)).searchParams;
var intheaters_id = qs.get('intheaters_id');
var movie_id = qs.get('id');
var imgurl = 'https://image.tmdb.org/t/p/w500';
if(intheaters_id!=null){
    var id = intheaters_id; 
    var loc = 'theaters/';
}
else {
    var id = movie_id;
    var loc = 'topindian/';
}
const hostname = "http://localhost:3000/";
$(document).ready(() => {
    if(id != null){
        console.log(hostname+loc+id);
        movie = $.getJSON(hostname+loc+id);
        movie.done((data) => {
            if(intheaters_id != null)
                $(".poster").attr("src", hostname +data.image);
            else
                $(".poster").attr("src", data.posterurl);

        });
    }
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