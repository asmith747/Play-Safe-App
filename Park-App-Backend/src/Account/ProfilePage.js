const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var passOps = require('./passwordOps');
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('Profile Page LOGGED');
  next()
}

router.use(myLogger);


router.post('/', function(req, res) {
  console.log("profile logged");
  console.log(req.body.userID);
  connection.query(`SELECT * FROM account WHERE user_id = '${req.body.userID}';`, function(err, results, fields) {
    if(results.length != 0) {
      res.send(results);
    }
    else if(err) {
      res.send("error");
    }
    else {
      res.send("Please login to view your profile");
    }
  });
});

router.post('/update', function(req, res) {
  var updateDate = new Date();
  connection.query(`SELECT * FROM account WHERE user_id = '${req.body.userID}'`, function(err, results, fields) {
    if(results.length > 0) {
      var user = results[0].username;
      var hash = results[0].passwordHash;
      var salt = results[0].passwordSalt;
      var firstName = results[0].f_name;
      var lastName = results[0].l_name;

      if(req.body.username) {
        user = req.body.username;
      }
      if(req.body.password) {
        salt = passOps.generateSalt(16);
        hash = passOps.sha512(req.body.password, salt);
      }
      if(req.body.f_name) {
        firstName = req.body.f_name;
      }
      if(req.body.l_name) {
        lastName = req.body.l_name;
      }

      connection.query(`UPDATE account SET username = '${user}', passwordHash = '${hash}', passwordSalt = '${salt}', f_name = '${firstName}', l_name = '${lastName}', update_date = ${connection.escape(updateDate)} WHERE user_id = ${req.body.userID};`);
      res.send("profile updated")
      }
    else if(err) {
      throw err;
    }
    else {
      res.send("Could not find account? Are you logged in");
    }
  });
});

module.exports = router;
