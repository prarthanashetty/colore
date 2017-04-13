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

    sessionStorage.token = "undefined";

    var x = document.getElementById("emailin").value;
    var y = document.getElementById("passwordin").value;
/*   Simulate error message from the server   */
    $.post("/login", {"username" : x, "password" : y}).done(function(msg){sessionStorage.token = msg; window.location='http://localhost:3000/gallery2.html'}).fail(function(a,b,c){});
    console.log(sessionStorage.token);
    if(sessionStorage.token=='undefined') shakeModal();
}

function shakeModal(){
    if(sessionStorage.token=="undefined"){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){
                $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );


}}

function signup(){
  sessionStorage.token = "undefined";
  var a = document.getElementById("emailup").value;
  var b = document.getElementById("passwordup").value;
  var c = document.getElementById("password_confirmationup").value;
  // console.log(a);
  // console.log(b);
  // console.log("in signup");
  if(b==c){
    //console.log("check");
  $.post("/signup", {"username" : a, "password" : b}).done(function(msg){sessionStorage.token = msg;window.location = 'http://localhost:3000/gallery2.html'}).fail(function(a,b,c){});
  //console.log("signed up");
  if(sessionStorage.token=='undefined')shake3Modal();
  //console.log(sessionStorage.token);
}
else {
  shake2Modal()
}
}

function shake2Modal(){
    if(sessionStorage.token=="undefined"){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Passwords do not match");
             $('input[type="password"]').val('');
             setTimeout( function(){
                $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );


}}

function shake3Modal(){
    if(sessionStorage.token=="undefined"){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("username already exists");
             $('input[type="password"]').val('');
             setTimeout( function(){
                $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );


}}

function lookup(){
  var mail = document.getElementById("emailup").value;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = rec;
  xhr.open("POST", "http://localhost:3000/lookup", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send('email='+mail);
}

function rec(){
  if(xhr.status==200||xhr.status==210 && xhr.readyState==4){
  //  console.log(xhr.responseText);
      if(xhr.responseText=="okay")
      {
        document.getElementById("exists").style.display = "none";
        document.getElementById("notexists").style.display = "block";
        
      }
      else if(xhr.responseText=="nope"){
        document.getElementById("notexists").style.display = "none";
        document.getElementById("exists").style.display = "block";
        document.getElementById("emailup").value="";
      }
  }
}
