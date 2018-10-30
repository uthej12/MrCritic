var qs = (new URL(document.location)).searchParams;
var id = qs.get('id');
$(document).ready(() => {
    movie = $.getJSON("http://localhost:3000/theaters?id="+id);
    movie.done((data) => {
        $(".poster").attr("src","http://localhost:3000/"+data[0].image);
    });
});