const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('Favorites LOGGED')
  next()
}

router.use(myLogger);

router.post('/myFavorites', function(req, res) {
    connection.query(`SELECT park.park_id, park.park_name FROM park JOIN favorites ON park.park_id = favorites.park_id WHERE
      favorites.user_id = '${req.body.userID}'`, function(err, results, fields) {
        if (err) {
          res.send("error");
        } else if (results.length > 0) {
          res.send(results);
        } else {
         res.send("You have no saved favorites");
        }
      });
});

router.post('/removeFavorite', function(req, res) {
  connection.query(`DELETE FROM favorites WHERE favorites.park_id = '${req.body.parkID}' AND favorites.user_id = '${req.body.userID}'`, function(err, results, fields) {
    if(err) {
      throw err;
    } else if(results.length == 0){
      res.send("Favorite failed to remove");
    } else {
      res.send("Favorite removed");
    }
  });
});

module.exports = router;
