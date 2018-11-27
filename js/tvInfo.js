import {njs, tmdb, img, v3tv, v3key,backdrop} from '../js/serverDetails.js'
var qs = (new URL(document.location)).searchParams;
var id = qs.get('id');
var name =null;
console.log(id);
function convert_date(date){
    var year        = Number(date.substring(0,4));
    var month       = Number(date.substring(5,7));
    var day         = Number(date.substring(8,11));

    var ISOdate = new Date(year,month-1,day).toString().split(' ');
    var dateFormated = ISOdate[0]+" "+ISOdate[2]+" "+ISOdate[1]+" , "+ISOdate[3];
    return dateFormated;
}
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
    $('.add-comments').hide();
    if(id != null){
        console.log(v3tv+id+"?api_key="+v3key);
        var tv = $.getJSON(v3tv+id+"?api_key="+v3key);
        tv.done((data) => {

            $.ajax({
                type:'GET',
                url:njs+'favorites/tv/',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
                }
            }).done((fav) => {
                $.each(fav, (i,fav) =>{
                    if(fav == data.id)
                        $('#add-to-wishlist').addClass('clicked');
                })
            });

            $('#add-to-wishlist').click(()=>{
                if($('#add-to-wishlist').hasClass('clicked')){
                    $('#add-to-wishlist').removeClass('clicked');
                    $.ajax({
                        type:'DELETE',
                        url:njs+'favorites/tv/'+data.id,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
                        }
                    }).done((fav)=>console.log(fav));
                }
                else{
                    $('#add-to-wishlist').addClass('clicked');
                    $.ajax({
                        type:'POST',
                        url:njs+'favorites/tv/'+data.id,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
                        }
                    }).done((fav)=>console.log(fav));
                }      
            });

            $('.jumbotron').css({'background-image':'url('+backdrop+data.backdrop_path+')'});
            $(".poster").attr("src", img +data.poster_path);
            $(".movieName").append(data.name);
            $('.mov-year').append(" ("+data.first_air_date.split('-')[0]+")");
            $('.release').append(convert_date(data.first_air_date));
            $('.star-rating h4').append(data.vote_average);
            $('.overview').append(data.overview);
            var language = {'en':'English','hn':'Hindi'};
            $('.ol').append(language[data.original_language]);
            
            
            $.getJSON(v3tv+data.id+'?api_key='+v3key).done((det)=>{
                
                if(det.last_episode_to_air != "")
                    $('.last-air')
                    .append("<h5>Last Episode Aired</h5><p>"+
                    "S"+("0" + det.last_episode_to_air.season_number).slice(-2)+"E"+
                    ("0" + det.last_episode_to_air.episode_number).slice(-2)+" <br>"+
                    det.last_episode_to_air.name+" <br>"+convert_date(det.last_episode_to_air.air_date)+"</p>");
                
                if(det.next_episode_to_air != null)
                    $('.next-air')
                    .append("<h5>Next Episode</h5><p>"+
                    "S"+("0" + det.next_episode_to_air.season_number).slice(-2)+"E"+
                    ("0" + det.next_episode_to_air.episode_number).slice(-2)+" <br>"+
                    det.next_episode_to_air.name+" <br>"+convert_date(det.next_episode_to_air.air_date)+"</p><br>");

                if(det.networks.length > 0){
                    $('.network').append("<h5>Network</h5>"+det.networks[0].name);
                    $('.network').css('margin-bottom','40px');
                }
                    

                if(det.genres.length>0){
                    $('.genre').append("<h5>Genres</h5>");
                    for(var i=0;i<det.genres.length;i++){
                        if(i>0)
                            $('.genre').append(', ');
                        $('.genre').append(det.genres[i].name + " ");
                    }
                    $('.genre').css('margin-bottom','40px');
                }
            });
            
            var getRecomendations = $.getJSON(v3tv+data.id+'/recommendations?api_key='+v3key)
                .done((recomended)=>{
                    $.each(recomended.results, (i,tv)=>{
                        if(i<8){
                            $('.rec').append("<div class ='rec-movie'>"+
                                                "<a href='tvInfo.html?id="+tv.id+"'><img class='rec-img' src='"+img+tv.backdrop_path+"'></a>"+
                                                "<div class='rec-text' style='overflow:hidden'><b>"+tv.name.slice(0,22)+"</b></div>"+
                                            "</div>");
                        }
                    });
                });
                
                
                var comments = $.getJSON(njs+'comments/'+data.id)
                .done((comments) => {
                console.log(comments)
                var commented = false;
                if(comments.status != 'unsucessful'){
                    console.log('Comments',comments);
                    $.each(comments, (i,comment) =>{
                        if(comment.author == name){
                            //console.log('In if',comment.author,name)
                            commented = true;
                            $('.comments').append(
                                "<div class='col-12 col-lg-10 card comment-container'>"+
                                    "<div class='container-fluid' style='padding: 0'>"+
                                        "<div class='col-12'>"+
                                            "<span><img src='./images/user.png' alt='user' class='avatar'></span>"+
                                            "<h5><u>"+comment.author +"</u></h5>"+
                                        "</div>"+
                                        "<div class='col-12 comment'>"+
                                            "<p>"+comment.comment+"</p>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>")
                        }
                        else{
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
                        }
                    });
                }
                if(!commented && name !=null)
                    $('.add-comments').show();
                else
                    $('.add-comments').hide();    
            });

            $('#submit-comment').click(()=>{
                console.log($('#comment').val());
                $.ajax({
                    type:'POST',
                    url:njs+'comments/'+data.id,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
                    },
                    dataType:'json',
                    data:{comment:$('#comment').val()}
                }).done((data)=>{
                    console.log(data);
                    location.reload();
                }); 
            });


            $.ajax({
                url:v3tv+data.id+'/credits?api_key='+v3key,
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
                    if(crew.job === 'Executive Producer'){
                        if(d==0)
                            $('.director').append('<h5>Exceutive Producer</h5>');
                        if(d !== 0  && d<2)
                            $('.director').append(', ');
                        if(d<2)
                            $('.director').append(crew.name," ");
                        d=Number(d)+1;
                    }
                    if(crew.job === 'Producer'){
                        if(p==0)
                            $('.producer').append('<h5>Producer</h5>')
                        if(p !== 0  && p<2)
                            $('.producer').append(', ');
                        if(p<2)
                            $('.producer').append(crew.name," ");
                        p=Number(p)+1;
                    }
                    if(crew.job === 'Original Music Composer'){
                        if(m==0)
                            $('.music').append('<h5>Original Music</h5>')
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
                name = user.name;
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