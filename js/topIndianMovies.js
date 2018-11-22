import {njs, tmdb, img, v3, v3key,backdrop} from '../js/serverDetails.js'
var qs= (new URL(document.location)).searchParams;
var pagenum = Number(qs.get('page')); 
var count=0;
var start =0;
var end = 25; 
if(pagenum > 1){
    end = pagenum * 25;
    start = end-25;
}
console.log(pagenum);
const hostname='http://localhost:3000/';
$(document).ready(() => {
    $('.pagination #'+pagenum).addClass('active');
    if(pagenum != 1)
        $('.pagination #previous').attr("href","TopIndianMovies.html?page="+(pagenum-1));
    else    
        $('.pagination #previous').addClass('disabled');
    if(pagenum != 10)
        $('.pagination #next').attr("href","TopIndianMovies.html?page="+(pagenum+1));
    else
        $('.pagination #next').addClass('disabled');
    var movies = $.get(hostname+"topindian",);
    movies.done((data) => {
        $.each(data, (i,item) => {
            if(count>=start & count <end){
                $(".movies-list").append
                ("<div class='col-12 col-sm-6 movie-tiles pr-5 pl-5 pr-md-2 pl-md-2' height='400px'>"+
                    "<div class='card movie-card'>"+
                        "<div class='row'>"+
                            "<div class='col-12 col-md-5' style='text-align:center'>"+
                                "<a href='movie.html?id="+item._id+"'>"+
                                "<img class='card-img-top' src='" + item.posterurl + "' height='340px' width='240px'><a>"+
                            "</div>"+
                            "<div class='col-12 col-md-6 mov-des'>"+
                                "<h1>"+ item.title +"("+ item.releaseDate.split("-")[0] +")</h1>"+
                                "<p class='mov-desc' style='padding: 10px'>"+
                                    item.storyline.split('. ')[0] + "<a href='movie.html?id="+item._id+"'>.....more</a>"+
                                "</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>");
            }count++;
        });
        console.log(count);
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
                        location.reload();
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
    $('#signup').on('click',()=>{
        var name = $('[name="name"]').val();
        var email = $('[name="email"]').val();
        var uname = $('[name="runame"]').val();
        var password = $('[name="rpassword"]').val();
        var password2 = $('[name="password2"]').val();
        console.log(JSON.stringify({"name":name,"email":email,"username":uname,"password":password}));
        if(uname != "" && password != ""){
            $.ajax({
                type:'POST',
                dataType: 'json',
                contentType:'application/json;charset=utf-8',
                url:njs+'users/signup',
                data:JSON.stringify({"name":name,"email":email,"username":uname,"password":password}),
                success: (msg)=>{
                    console.log(msg);
                    if(msg.success == true){
                        $('#registerModal').modal('toggle');
                        $('#loginModal').modal('toggle');
                        //$('.auth').hide();
                        //$('.authenticated').show();
                        //localStorage.setItem('token',msg.token);
                        //location.reload();
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
        $.ajax({
            type:'GET',
            url:njs+'users',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
            },
            dataType:'json',
            success:(user)=>{
                $('.logo .name').append(user.name);
                console.log(user);
            },
            error:(err)=>{
                console.log(err);
            }
        });
        $('.authenticated').show();
        $('.auth').hide();
        $('#logout').click(()=>{
            var conf = confirm('Do want to logout?');
            if(conf){
                console.log(localStorage.getItem('token'));
                localStorage.clear();
                $('.auth').show();
                $('.authenticated').hide();
                location.reload();
            }
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