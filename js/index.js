var items=[];
$(document).ready(() => {
    getdishes = $.getJSON("http://localhost:3000/theaters");

    getdishes.done((data) => {
        $(".loading_theaters").css({"display":"none"});
        $(".in_theaters").css({"display":"block"});
        $.each(data, (i,item) => {
            if(i<6){
                $(".in_theaters .imgs").append("<div class='col-6 col-md-2 p-2'><div class='zoom '>"+
                                "<a href='movie.html?intheaters_id="+item._id+"'>"+
                                "<img class='img-thumbnail' src='http://localhost:3000/"+item.image+"'"+
                                "height='400px' width='100%'></a></div></div");
            }
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
