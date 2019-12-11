const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var createError = require('http-errors');
var router = express.Router();
var passOps = require('./passwordOps');
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('login LOGGED')
  next()
}

router.use(myLogger);

router.post('/auth', function(req, res, next) {
  var username = req.body.username;
  var userPassword = req.body.password;

  console.log(username);
  console.log(userPassword);

  if(username && userPassword) {
    connection.query('SELECT user_id, passwordSalt, passwordHash FROM account WHERE username = ?', [username], function(err, results, fields) {
      if(results.length > 0) {
        var storedSalt = results[0].passwordSalt;
        var storedHash = results[0].passwordHash;
        if(storedHash == passOps.sha512(userPassword, storedSalt)) {
          req.session.loggedin = true;
          req.session.userID = results[0].user_id;
          console.log("successful login");
          userId = results[0].user_id
          console.log("The user id: " + userId);
          res.send("The user id: " + userId);
        }
        else {
          res.send("Incorrect username and/or password");
        }
      }
      else {
        res.send("Incorrect username and/or password");
      }
    });
  }
  else {
    res.send("Please enter a username and password!");
    res.end();
  }
});

module.exports = router;
