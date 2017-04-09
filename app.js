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
const secret = "webtech2";

app.use(express.static("public"));

app.get('/', function(req, res){
      res.sendFile('/login_register_modal.html');
});

app.post('/login', function(req, res){
console.log("in login");
  if(!req.body.username){
    res.status(400).send("email is required");
    return;
  }
  if(!req.body.password){
    res.status(400).send("password is required");
    return;
  }
  connection.query("SELECT * from users where email = ? and password = ?", [req.body.username, req.body.password], function(err, result, fields){
//  connection.end();
  var resLen = result.length;
  console.log(resLen);
  if(!err && resLen==1) {
      console.log("logged in");
      var token = jwt.sign({username : req.body.username}, "webtech2");
      console.log(token);
      res.status(200).json(token);
  }
  else if(err || resLen==0) console.log("login error");
    });
});

app.get('/gallery', function(req, res){
  res.sendFile('/gallery2.html');
});
