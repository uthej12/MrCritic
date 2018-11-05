var qs = (new URL(document.location)).searchParams;
var id = qs.get('id');
var imgurl = 'https://image.tmdb.org/t/p/w500';
const hostname = "http://localhost:3000/toptv/";
$(document).ready(() => {
    if(id != null){
        console.log(hostname+id);
        movie = $.getJSON(hostname+id);
        movie.done((data) => {
            $(".poster").attr("src", imgurl +data.poster_path);
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