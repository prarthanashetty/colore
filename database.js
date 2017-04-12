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

    logmein : function(username, password, callback){
      connection.query("SELECT * from users where email = ? and password = ?", [username, password], function(err, result, fields){
    //  connection.end();
      var resLen = result.length;
      //console.log(resLen);
      if(!err && resLen==1) {
          return callback(200);
      }
      else if(err || resLen==0) return callback(409);
        });
    },

    join : function(username, password, callback){
      connection.query("INSERT INTO `users` (`userId`, `email`, `password`) VALUES (NULL, ?, ?);", [username, password], function(err, result, fields){
    //  connection.end();

      //console.log(resLen);
      if(!err) {
          return callback(200);
      }
      else if(err) return callback(409);
        });

  },

  lookup : function(username, callback){
      connection.query("SELECT * from users where email=?", [username], function(err, result, fields){
        if(!result.length && !err){
            return callback(200);
        }
        else {
          return callback(210);
        }
      });
  }

}
