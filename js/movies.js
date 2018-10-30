var count=0;
$(document).ready(() => {
    movies = $.getJSON('http://localhost:3000/top-indian');
    movies.done((data) => {
        $.each(data, (i,item) => {
                $.each(data, (i,item) => {
                    if(count<20){
                        count++;
                        $(".movies-list").append("<div class='col-12 col-md-6 movie-tiles' height='400px'>"+
                        "<div class='card movie-card'>"+
                        "<img src='"+item.posterurl+"' height='340px' width='240px'>"+
                        "</div>"+
                        "</div>");
                    }
                });
        });
    });
});