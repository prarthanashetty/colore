const db = require('mysql');

  module.exports = {
    connection : null,
    dbInit : function(){connection = db.createConnection({
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
    }});},

    getusername : function(callback){
      connection.query("SELECT name from users", function(err, result, fields){
        //hello = result;
      connection.end();
      if(!err) {
        return callback(200);
      }
      else if(err) callback(409);
      });
    },

    logmein : function(callback, username, password){
      connection.query("SELECT * from users where name = ? and password = ?", [username, password], function(err, result, fields){
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
    }
}
