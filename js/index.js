import {njs, tmdb, img, v3, v3key,backdrop} from '../js/serverDetails.js'

var items=[];
$(document).ready(() => {

    $.getJSON("http://localhost:3000/theaters")
       .done((data) => {
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
