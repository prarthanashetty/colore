const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodpar = require('body-parser');
const user = require('./users.json');
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const database = require('./database.js');

database.dbInit();

app.listen(port, function(){
  console.log("listening on port " + port);
});

app.use(bodpar.urlencoded({ extended: true }));
app.use(bodpar.json());
app.use(ejwt({secret : "webtech2"}).unless({path : ['/login']}));
app.use(express.static('public'));

app.get('/', function(req, res){
      database.getusername(function(status){
        res.sendStatus(status);
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

});

// app.post('/user/subscription', expressJWT({secret : secret}), (req, res) => {
//   database.addSubscription(req.user.usn, function(status) {
//     res.sendStatus(status);
//   });
// });
