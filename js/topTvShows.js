var qs= (new URL(document.location)).searchParams;
var pagenum = Number(qs.get('page')); 
var imgurl = 'https://image.tmdb.org/t/p/w500';
var count=0;
var start =-1;
var end = 20; 
if(pagenum > 1){
    end = pagenum * 20;
    start = end-20;
}
const hostname='http://localhost:3000/';
$(document).ready(() => {
    $('.pagination #'+pagenum).addClass('active');
    if(pagenum != 1)
        $('.pagination #previous').attr("href","topTvShows.html?page="+(pagenum-1));
    else    
        $('.pagination #previous').addClass('disabled');
    if(pagenum != 10)
        $('.pagination #next').attr("href","topTvShows.html?page="+(pagenum+1));
    else
        $('.pagination #next').addClass('disabled');
    movies = $.get(hostname+"toptv",);
    movies.done((data) => {
        $.each(data, (i,item) => {
            if(i>start & i <end){
                $(".movies-list").append
                ("<div class='col-12 col-sm-6 movie-tiles pr-5 pl-5 pr-md-2 pl-md-2' height='400px'>"+
                    "<div class='card movie-card'>"+
                        "<div class='row'>"+
                            "<div class='col-12 col-md-5' style='text-align:center'>"+
                                "<a href='tvPage.html?id="+item._id+"'>"+
                                "<img class='card-img-top' src='" + imgurl+item.poster_path + "' height='340px' width='240px'><a>"+
                            "</div>"+
                            "<div class='col-12 col-md-6 mov-des'>"+
                                "<h1>"+ item.name +"("+ item.first_air_date.split("-")[0] +")</h1>"+
                                "<p class='mov-desc' style='padding: 10px'>"+
                                    item.overview.split('. ')[0] + "<a href='tvPage.html?id="+item._id+"'>......more</a>"+
                                "</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>");
            }
        });
    });
});


if(localStorage.getItem('token') == null){
    $('.authenticated').hide();
    
    $("#loginButton").on('click',()=> {
        var uname = $('[name="uname"]').val();
        var password = $('[name="password"]').val();
        console.log(JSON.stringify({"username":uname,"password":password}))
        if(uname != "" && password != ""){
            $.ajax({
                type:'POST',
                dataType: 'json',
                contentType:'application/json;charset=utf-8',
                url:njs+'users/login',
                data:JSON.stringify({"username":uname,"password":password}),
                success: (msg)=>{
                    console.log(msg);
                    if(msg.success == true){
                        $('#loginModal').modal('toggle');
                        $('.auth').hide();
                        $('.authenticated').show();
                        localStorage.setItem('token',msg.token);
                    }
                },
                error: (err)=>{
                    alert('Invalid Credentials');
                    console.log(err);
                }
            });
        }
        else{
            alert("Enter valid data");
        }
    });
    }
    else{
        $('.authenticated').show();
        $('.auth').hide();
        $('#logout').click(()=>{
            console.log(localStorage.getItem('token'));
            localStorage.clear();
            $('.auth').show();
            $('.authenticated').hide();
        });
    }

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