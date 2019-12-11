const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('Rating LOGGED')
  next()
}

router.use(myLogger);

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/Rating.html'));
});

router.get('/view/:parkId', function(req, res) {
  if (req.params.parkId > 0) {
    connection.query(`SELECT username, rating.* FROM rating JOIN account ON rating.createdBy = account.user_id WHERE park_id = ${req.params.parkId}`, function(err, results, fields) {
      if (err) {
        res.send("error");
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send('no ratings')
      }
    });
  }
});

router.post('/myRatings', function(req, res) {
  connection.query(`SELECT park_name, rating.* FROM rating JOIN park ON rating.park_id = park.park_id WHERE createdBy = '${req.body.userID}'`, function(err, results, fields) {
      if (err) {
        res.send(err);
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send("There are no saved reviews");
      }
    }
  );
});

router.get('/avgRating/:parkId', function(req, res) {
    connection.query(`SELECT * FROM avgRating WHERE park_id = ${req.params.parkId}`, function(err, results, fields) {
      if (err) {
        res.send("error");
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send("no ratings");
      }
    }
  );
});

function updateAverages(parkId){
    connection.query(`UPDATE avgRating
    SET accessibilityAVG = (SELECT avg(accessibility) FROM rating WHERE park_id = ${parkId}),
      atmosphereAVG = (SELECT avg(atmosphere) FROM rating WHERE park_id = ${parkId}),
      noiseAVG = (SELECT avg(noise) FROM rating WHERE park_id = ${parkId}),
      cleanlinessAVG = (SELECT avg(cleanliness) FROM rating WHERE park_id =  ${parkId}),
      equipmentAVG = (SELECT avg(equipment) FROM rating WHERE park_id = ${parkId}),
      pet_friendlinessAVG = (SELECT avg(pet_friendliness) FROM rating WHERE park_id = ${parkId}),
      crowdAVG = (SELECT avg(crowd) FROM rating WHERE park_id = ${parkId})
    WHERE park_id =  ${parkId};`);
  connection.query(`SELECT (avg(accessibility) + avg(atmosphere) + avg(noise) + avg(cleanliness) + avg(equipment) + avg(pet_friendliness) + avg(crowd))/7 FROM rating WHERE park_id = ${parkId}`);
  console.log('Updated Average Rating');
  return;
}

function updateColor(parkId){
  connection.query(`SELECT (avg(accessibility) + avg(atmosphere) + avg(noise) + avg(cleanliness) + avg(equipment) + avg(pet_friendliness) + avg(crowd))/7 FROM rating WHERE park_id = ${parkId}`);
  console.log('Updated Color Rating');
  return;
}

module.exports = router;
