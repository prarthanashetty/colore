const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodpar = require('body-parser');
const user = require('./users.json');
const db = require('mysql');
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');


var connection = db.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'coloriedb'
});

connection.connect(function(err){
    if(!err)
    {
      console.log("succesfully connected to database");
    }
    else {
        console.log("error connecting to database " + err);
    }
});

app.listen(port, function(){
  console.log("listening on port " + port);
});

app.use(bodpar.urlencoded({ extended: true }));
app.use(bodpar.json());
app.use(ejwt({secret : "webtech2"}).unless({path : ['/login']}));

app.use(express.static('public'));

app.get('/', function(req, res){
      connection.query("SELECT name from users", function(err, result, fields){
      connection.end();
      if(!err) {
          console.log("the solution is ", result);
          res.status(200).send(result);
      }
      else if(err) console.log("error");
    });
});

// app.get('/users', function(req,res){
//   res.send({'users' : Object.keys(user)});
// });
app.post('/login', function(req, res){
  if(!req.body.username){
    res.status(400).send("username is required");
    return;
  }
  if(!req.body.password){
    res.status(400).send("password is required");
    return;
  }
  connection.query("SELECT * from users where name = ? and password = ?", [req.body.username, req.body.password], function(err, result, fields){
//  connection.end();
  var resLen = result.length;
  //console.log(resLen);
  if(!err && resLen==1) {
      console.log("logged in");
      var token = jwt.sign({username : req.body.username}, "webtech2");
      res.status(200).json(token);
  }
  else if(err || resLen==0) console.log("login error");
    });


});
