import {tmdb, njs, img, backdrop} from '../js/serverDetails.js'
var qs = (new URL(document.location)).searchParams;
var _id = qs.get('_id');
console.log(_id);
$(document).ready(() => {
    if(_id != null){
        console.log(njs+"topmovies/"+_id);
        var movie = $.getJSON(njs+"topmovies/"+_id);
        movie.done((data) => {
            console.log(data);
            $('.jumbotron').css({'background-image':'url('+backdrop+data.backdrop_path+')','color':'white'});
            $(".poster").attr("src", img +data.poster_path);
            $(".movieName").append(data.title+" ("+data.release_date.split('-')[0]+")");
            $('.rating').append(data.vote_average+"<i class='fa fa-star'></i>");
            $('.overview').append(data.overview);
            
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