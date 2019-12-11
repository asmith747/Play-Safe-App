const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('parkInfo LOGGED')
  next()
}

router.use(myLogger);

router.get('/', function(req, res) {
  connection.query(`SELECT * FROM parkInfo AS i JOIN park AS p ON i.park_id = p.park_id JOIN petAmenities AS pa ON p.park_id = pa.park_id`, function(err, results, fields) {
    res.send(results);
  })
});

router.get('/:parkId', function(req, res) {
  console.log(req.body.parkId);
  connection.query(`SELECT * FROM parkInfo AS i JOIN park AS p ON i.park_id = p.park_id JOIN petAmenities AS pa ON p.park_id = pa.park_id WHERE i.park_id = ${req.params.parkId}`, function(err, results, fields){
    res.send(results);
    //console.log(results);
  })
});

router.get('/:parkId/care', function(req, res) {
  var incidentId = req.params.parkId;
  connection.query(`SELECT * FROM services AS s
    LEFT OUTER JOIN careFacilities AS c ON s.care_id = c.care_id
    LEFT OUTER JOIN fireStations AS f ON s.fire_id = f.fire_id
    LEFT OUTER JOIN policeStations AS p ON s.police_id = p.police_id
    WHERE s.park_id = ${incidentId}`, function(err, results, fields) {
    if (err) {
      res.send("error");
    } else if (results.length > 0) {
      res.send(results);
    } else {
      res.send('no service information with that park')
    }
  })
});

router.post('/:parkId/favorite', function(req, res) {
    var date = new Date();
    connection.query(`SELECT * FROM favorites WHERE park_id = ${req.params.parkId} AND user_id = ${req.body.userID}`, function(err, results, fields){
      if(results.length == 0) { //favorite doesnt exist
        connection.query(`INSERT INTO favorites VALUES (${req.params.parkId}, ${req.body.userID}, ${connection.escape(date)}, ${connection.escape(date)})`);
        console.log(`Added parkId #${req.params.parkId} to user ${req.body.userID}'s favorites list`);
        res.send("Added favorite")
      }
      else if(err) {
        res.send("Error adding favorite");
      }
      else {
        res.send("User has already added favorites this park")
      }
    });
    //connection.query(`INSERT INTO favorites VALUES (${req.params.parkId}, ${req.body.userID}, ${connection.escape(date)}, ${connection.escape(date)})`);

});

router.post('/', function(req, res) {
    var shade;
    if (req.body.shadeRating = "on") {
      shade = true;
    } else {
      shade = false;
    }
    connection.query(`SELECT * FROM rating WHERE park_id = ${req.body.parkId} AND createdBy = ${req.body.userID};`, function(err, results, fields) {
      if (results.length != 0){
        var updateDate = new Date();
        //Update previous rating/review
        connection.query(`UPDATE rating SET accessibility = ${req.body.accessibilityRating}, atmosphere = ${req.body.atmosphereRating},
           noise = ${req.body.noiseRating}, cleanliness = ${req.body.cleanlinessRating}, equipment = ${req.body.equipmentRating},
           shade = ${shade}, pet_friendliness = ${req.body.petRating}, crowd = ${req.body.crowdRating}, review = '${req.body.review}',
           update_date = ${connection.escape(updateDate)} WHERE park_id = ${req.body.parkId} AND createdBy = ${req.body.userID};`);

        console.log('Updated the rating');
        //update color rating
        updateColor(req.body.parkId);
        //Update averages
        updateAverages(req.body.parkId);
        res.send("rating added");
      } else if (err) {
        res.send("error");
      } else {
        var date = new Date();
        //create new rating/review if none exists
        connection.query(`INSERT INTO rating (park_id, createdBy, accessibility, atmosphere, noise, cleanliness, equipment, shade, pet_friendliness, crowd, review, create_date, update_date)
        VALUES (${req.body.parkId}, ${req.body.userID}, ${req.body.accessibilityRating}, ${req.body.atmosphereRating},
        ${req.body.noiseRating}, ${req.body.cleanlinessRating}, ${req.body.equipmentRating}, ${shade}, ${req.body.petRating}, ${req.body.crowdRating}, '${req.body.review}', ${connection.escape(date)}, ${connection.escape(date)})`);
        console.log('Created a new row and added the rating');
        //Update COlor rating
        updateColor(req.body.parkId);
        //Update averages
        updateAverages(req.body.parkId);
        res.send("rating added");

        }
    });
  res.end;
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
    WHERE park_id = ${parkId};`);
  console.log('Updated Average Rating');
  return;
};

function updateColor(parkId){
  connection.query(`SELECT (avg(accessibility) + avg(atmosphere) + avg(noise) + avg(cleanliness) + avg(equipment) + avg(pet_friendliness) + avg(crowd))/7 AS totalAVG FROM rating WHERE park_id = ${parkId}`, function(err, result, fields){
    if (err) throw err;
    var average = result[0].totalAVG;
    console.log('AVERAGE RATING = ' + average);

    var color = -1;
    if(average < 3.33)
      color = 2;
    if(average >= 3.33 && average < 6.66)
      color = 1;
    if(average >= 6.66)
      color = 0;

    connection.query(`UPDATE parkInfo SET colorRank = ${color} WHERE park_id = ${parkId};`);
  })
  console.log('Updated Color Rating');
  return;
};

module.exports = router;
