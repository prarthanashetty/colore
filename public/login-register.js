/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 *
 */

 var ein = $('#emailin');
 var pin = $('#passwordin');
 var eup = $('#emailup');
 var pup = $('#passwordup');



function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
    });
     $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}

function loginAjax(){
    /*   Remove this comments when moving to server
    $.post( "/login", function( data ) {
            if(data == 1){
                window.location.replace("/home");
            } else {
                 shakeModal();
            }
        });
    */
  //  window.alert("in loginajax");
    var x = document.getElementById("emailin").value;
    var y = document.getElementById("passwordin").value;
    //console.log(x);
    // console.log(ein.val());
    // console.log(ein.value);
/*   Simulate error message from the server   */
    $.post("/login", {"username" : x, "password" : y}).done(function(msg){sessionStorage.token = msg; window.location='http://localhost:3000/gallery2.html'}).fail(function(a,b,c){alert(c)});
  //  window.alert(sessionStorage.length);
    if(sessionStorage.token=='undefined') shakeModal();
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){
                $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );


}
