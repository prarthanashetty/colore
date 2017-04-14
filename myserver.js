const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodpar = require('body-parser');
const user = require('./users.json');
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const database = require('./database.js');
const fs = require('fs');

const cnc = [];
var buff =  new Buffer(1024);

database.dbInit();

app.listen(port, function(){
  console.log("listening on port " + port);
});

app.use(bodpar.urlencoded({ extended: true }));
app.use(bodpar.json());
app.use(express.static('public'));
const secret = "webtech2";

app.get('/', function(req, res){
      database.getusername(function(status){
        res.sendStatus(status);
      });
});

app.post('/login', function(req, res){
  if(!req.body.username){
    res.status(400).send("username is required");
    return;
  }
  if(!req.body.password){
    res.status(400).send("password is required");
    return;
  }

  database.logmein(req.body.username, req.body.password, function(name,status){
    if(status=='200'){
    //  console.log("logged in");
      var token = jwt.sign({username : req.body.username}, "webtech2");
    //  console.log("end of logmein");
    //  console.log(name);
      res.status(200).send({tok : token, nam : name});
    }
    else {
      console.log("login error");
    }
  });
});

app.get('/gallery', function(req, res){
  res.sendFile('/gallery2.html');
});

app.post('/signup', function(req, res){
  if(!req.body.username){
    res.status(400).send("username is required");
    return;
  }
  if(!req.body.password){
    res.status(400).send("password is required");
    return;
  }

  database.join(req.body.username, req.body.password, function(status){
    if(status=='200'){
      //console.log("signed up");
      var token = jwt.sign({username : req.body.username}, "webtech2");``
      res.status(200).json(token);
    }
    else if(status=='403'){
      console.log("email already exists");
      console.log("choose another email");
    }
    else {
      console.log("registration error");
    }
  });
});

app.post('/lookup', function(req, res){
  //console.log("in lookup");
  // console.log(req.body.email);
  database.lookup(req.body.email, function(status){
      if(status==200)
      {
          res.status(200).send("okay");
      }

      else if(status==210)
      {
      //  console.log("in 210");
        res.status(210).send("nope");
      }
      else {
        res.send("something's wrong");
      }
  });

});

app.get('/notif', function(req, res){
  //console.log("client connected");
  res.writeHead(200, {
    'Content-Type' : 'text/event-stream',
    'Cache-Control' : 'no-cache',
    'Connection' : 'keep-alive'
  });
  cnc.push(res);
//  res.end();
});

app.get('/broadcast', function(req, res){
//  console.log(req.query.message);
  database.broadcast(req.query.message, function(status){
    if(status==200)
    {
        for(i=0; i<cnc.length; i++)
        {
        //  console.log("in broadcast");
          cnc[i].write("event: getNotif\n");
        //  console.log("after write");
          cnc[i].write("data: "+ req.query.message + "\n\n");
        }
    //    console.log(cnc.length);
        res.sendStatus(200);


  //      res.end();
    }

    else if(status==403) res.sendStatus(403);
  });
});

app.get('/notific', function(req, res){
    database.getNotifications(function(result, status){
        if(status==200) res.send(result);
        else res.sendStatus(status);
    });
});

app.get('/getMore', function(req, res){
    var x = req.query.count;
    //console.log("count is "+x);
    var y = buff.length*x;
    fs.open('words.txt', 'r+', function(err, fd){
        if(err) res.sendStatus(403);
      //  console.log("file opened successfully");
      //  console.log("now reading file");
        fs.read(fd, buff,0, buff.length, y,function(err, bytes){
            if(err) console.log("read error");
          //  console.log("bytes read" + bytes);

            if(bytes>0){
              res.send(buff.slice(0, bytes).toString());
            }

            fs.close(fd, function(err){
                if(err)console.log("closing failed");
                //console.log("closing successfull");
            });
        });
    });

});
