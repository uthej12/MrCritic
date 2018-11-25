import { key, tmdb, njs, img, cast_img, topIndian}  from '../js/serverDetails.js';
var qs= (new URL(document.location)).searchParams;
var page = Number(qs.get('page')); 

$(document).ready(() => {
    $('.pagination #'+page).addClass('active');
    if(page != 1)
        $('.pagination #previous').attr("href","TopIndianMovies.html?page="+(page-1));
    else    
        $('.pagination #previous').addClass('disabled');
    if(page != 10)
        $('.pagination #next').attr("href","TopIndianMovies.html?page="+(page+1));
    else
        $('.pagination #next').addClass('disabled');


        var movies=$.ajax({
            url: topIndian+page,
            method: 'GET',
            dataType: 'JSON', 
          })
          .done((data) => {
            console.log(data);
            $.each(data.results ,(i,item) =>{

                $('.movies').append("<div class='row element'>"+
                                    "<div class='col-5 col-sm-4 mov-img-container'>"+
                                      "<a href='movieInfo.html?id="+item.id+"'><img src='"+cast_img+item.poster_path+"' class='img-responsive mov-img'></a>"+
                                    "</div>"+
                                    "<div class='col-7 col-sm-8' style='padding: 0px'>"+
                                      "<div class='container-fluid'>"+
                                        "<div class='row'>"+
                                          "<div class='col-12'>"+
                                            "<h2 class='mov-title'><a href='movieInfo.html?id="+item.id+"'>"+item.title+" </a></h2><h4 class='mov-year'>"+item.release_date.split('-')[0]+"</h4>"+
                                          "</div>"+
                                          "<div class='col-12'>"+
                                              "<div class='mov-desc'><p>"+item.overview.split(". ")[0]+item.overview+"</p></div>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>"+
                                    "</div>"+
                                    "</div><hr class='div-line'>");
              });
          })
          .fail(()=>{
            console.log('Error');
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