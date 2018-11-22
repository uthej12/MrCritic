import {njs, tmdb, img, v3, v3key,backdrop, user} from '../js/serverDetails.js'

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
        var conf = confirm('Do want to logout?');
        if(conf){
            console.log(localStorage.getItem('token'));
            localStorage.clear();
            $('.auth').show();
            $('.authenticated').hide();
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
