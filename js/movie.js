var qs = (new URL(document.location)).searchParams;
var id = qs.get('id');
$(document).ready(() => {
    movie = $.getJSON("http://192.168.1.11:3000/theaters?id="+id);
    movie.done((data) => {
        $("img").attr("src","http://192.168.1.11:3000/"+data[0].image);
    });
});