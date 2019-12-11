const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var passOps = require('./passwordOps');
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('Create Account LOGGED')
  next()
}

router.use(myLogger)

router.post('/', function(req, res) {
  console.log(req.body);

  var username = req.body.username;
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var userPassword = req.body.password;

  connection.query('SELECT username FROM account WHERE username = ?', [username], function(err, results, fields) {
    if(results.length != 0) {
      res.send('Username already in use!');
    }
    else {
      var createDate = new Date();
      var salt = passOps.generateSalt(16);
      var passwordHash = passOps.sha512(userPassword, salt);

      connection.query(`SELECT COUNT(*) AS numUsers FROM account`, function(err, results, fields) {
        var user_id = results[0].numUsers + 1;
        connection.query(`INSERT INTO account (username, f_name, l_name, passwordHash, passwordSalt, create_date, update_date) VALUES ('${username}', '${fName}', '${lName}', '${passwordHash}', '${salt}', ${connection.escape(createDate)}, ${connection.escape(createDate)});`);
        req.session.loggedin = true;
        req.session.userID = user_id;
        res.send("Account Created");
      });
    }
  });
});


module.exports = router;
