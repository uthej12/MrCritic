var items=[];
$(document).ready(() => {
    getdishes = $.getJSON("http://localhost:3000/theaters");

    getdishes.done((data) => {
        $(".loading_theaters").css({"display":"none"});
        $(".in_theaters").css({"display":"block"});
        $.each(data, (i,item) => {
            if(i<6){
                $(".in_theaters .imgs").append("<div class='col-6 col-md-2 p-2'><div class='zoom '>"+
                                "<a href='movie.html?id="+item.id+"'>"+
                                "<img class='img-thumbnail' src='http://localhost:3000/"+item.image+"'"+
                                "height='400px' width='100%'></a></div></div");
            }
        });
    });
});
