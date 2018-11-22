var qs = (new URL(document.location)).searchParams;
var intheaters_id = qs.get('intheaters_id');
var movie_id = qs.get('id');
var imgurl = 'https://image.tmdb.org/t/p/w500';
if(intheaters_id!=null){
    var id = intheaters_id; 
    var loc = 'theaters/';
}
else {
    var id = movie_id;
    var loc = 'topindian/';
}
const hostname = "http://localhost:3000/";
$(document).ready(() => {
    if(id != null){
        console.log(hostname+loc+id);
        movie = $.getJSON(hostname+loc+id);
        movie.done((data) => {
            if(intheaters_id != null)
                $(".poster").attr("src", hostname +data.image);
            else
                $(".poster").attr("src", data.posterurl);

        });
    }
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