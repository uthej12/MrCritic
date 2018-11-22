import {tmdb, njs, img, backdrop, v3,v3key} from '../js/serverDetails.js'
var qs = (new URL(document.location)).searchParams;
var _id = qs.get('_id');
console.log(_id);
function get_date(myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].iso_3166_1 === 'IN' || myArray[i].iso_3166_1 == 'US') {
            return myArray[i].release_dates[0].release_date;
        }
    }
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});
$(document).ready(() => {
    $("#clear-text").click(()=>{
        $('.new-comment').val('');
    });
    $('#submit-comment').click(()=>{
        var comment = $('.new-comment').val();
        $('.new-comment').val('');
        $('.new').hide();
        $('.comments')
        .append("<div class='col-12 col-lg-10 card comment-container'>"+
                    "<div class='container-fluid' style='padding: 0'>"+
                        "<div class='col-12'>"+
                            "<span><img src='./images/user.png' alt='user' class='avatar'></span>"+
                            "<h5>You </h5>"+
                        "</div>"+
                        "<div class='col-12 comment'>"+
                            "<p>"+comment+"</p>"+
                        "</div>"+
                    "</div>"+
                "</div>");

    });
    if(_id != null){
        console.log(njs+"topindian/"+_id);
        var movie = $.getJSON(njs+"topindian/"+_id);
        movie.done((data) => {
            console.log(data);
            $('.jumbotron').css({'background-image':'url('+backdrop+data.backdrop_path+')'});
            $(".poster").attr("src", img +data.poster_path);
            $(".movieName").append(data.title);
            $('.mov-year').append(" ("+data.release_date.split('-')[0]+")")
            $('.star-rating h4').append(data.vote_average);
            $('.overview').append(data.overview);
            var language = {'en':'English','hi':'Hindi'};
            $('.ol').append(language[data.original_language]);
            $.getJSON(v3+data.id+'?api_key='+v3key).done((det)=>{
                $('.budget').append(formatter.format(det.budget));
                if(det.revenue >0)
                    $('.box').append(formatter.format(det.revenue));
                else
                    $('.box').append(formatter.format(det.budget));
                for(var i=0;i<det.genres.length;i++){
                    if(i>0)
                        $('.genre').append(', ');
                    $('.genre').append(det.genres[i].name + " ");
                }
            });
            
            var releaseDate = $.getJSON(v3+data.id+'/release_dates?api_key='+v3key)
            .done((release)=> {
                var release = new Date(get_date(release.results));
                var dateISO = release.toString().split(' ');
                var date = dateISO[2]+" "+dateISO[1]+","+dateISO[3];
                $('.release').append(date);
                
            });
            var getRecomendations = $.getJSON(v3+data.id+'/recommendations?api_key='+v3key)
                .done((recomended)=>{
                    $.each(recomended.results, (i,movie)=>{
                        if(i<8){
                            $('.rec').append("<div class ='rec-movie'>"+
                                                "<img class='rec-img' src='"+img+movie.backdrop_path+"'>"+
                                                "<div class='rec-text' style='overflow:hidden'><b>"+movie.title.slice(0,22)+"</b></div>"+
                                            "</div>");
                        }
                    });
                });
            var comments = $.getJSON(njs+'topmovies/'+data._id+'/comments')
                .done((comments) => {
                $.each(comments, (i,comment) =>{
                    $('.comments').append(
                        "<div class='col-12 col-lg-10 card comment-container'>"+
                            "<div class='container-fluid' style='padding: 0'>"+
                                "<div class='col-12'>"+
                                    "<span><img src='./images/user.png' alt='user' class='avatar'></span>"+
                                    "<h5>"+comment.author +"</h5>"+
                                "</div>"+
                                "<div class='col-12 comment'>"+
                                    "<p>"+comment.comment+"</p>"+
                                "</div>"+
                            "</div>"+
                        "</div>")
                });    
            });
            
                console.log(data._id);
            $.ajax({
                url:v3+data.id+'/credits?api_key='+v3key,
                type:'GET'
            }).done((cast)=>{
                $.each(cast.cast, (i,cast_member)=>{
                    if(i<6){
                        $('.cast').append("<div class='col-6 col-sm-4 col-xl-2' style='padding:20px 60px 20px 0px;'>"+
                                    "<div class='card' style='box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius: 0%;height:350px;width:150px;'>"+
                                        "<div class='card-img-top' style='min-width: 100%;max-height: 100%'>"+
                                            "<img class='img-fluid' src='"+img+cast_member.profile_path+"'>"+
                                        "</div>"+
                                    "<div class='card-content' style='padding:4px'>"+
                                        "<div class='card-title'>"+
                                            "<h4>"+cast_member.name+"</h4>"+
                                        "</div>"+
                                        "<p style='color:dimgrey;bottom:0;position:absolute'>"+cast_member.character.split("/")[0]+"</p>"+
                                    "</div>"+
                                "</div>"+
                            "</div>");
                    }
                });var d=0;var p=0;var s=0;var m=0;
                $.each(cast.crew, (i,crew) => { 
                    if(crew.job === 'Director'){
                        if(d>0)
                            $('.director').append(', ');
                        $('.director').append(crew.name);
                        d=Number(d)+1;
                    }
                    if(crew.job === 'Producer'){
                        if(p !== 0)
                            $('.producer').append(', ');
                        $('.producer').append(crew.name," ");
                        p=Number(p)+1;
                    }
                    if(crew.job === 'Screenplay'){
                        if(s !== 0)
                            $('.writer').append(', ');
                        $('.writer').append(crew.name," ");
                        s=Number(s)+1;
                    }
                    if(crew.job === 'Original Music Composer'){
                        if(m !== 0)
                            $('.music').append(', ');
                        $('.music').append(crew.name," ");
                        m=Number(m)+1;
                    }
                });
            });
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