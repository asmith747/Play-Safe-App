const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var connection = require('../mysqlConnect');

var myLogger = function(req, res, next) {
  console.log('Search Page LOGGED')
  next()
}

router.use(myLogger);

router.post('/', function(req, res) {
  console.log('Querying Parks');
  var queryString = `SELECT * FROM parkInfo AS i JOIN park AS p ON i.park_id = p.park_id JOIN petAmenities AS pa ON p.park_id = pa.park_id JOIN avgRating AS r ON i.park_id = r.park_id`;
  var prev = false;
  if (req.body.shade == 1 || req.body.tennis == 1 || req.body.skate == 1 || req.body.pool == 1 || req.body.basketball == 1 || req.body.soccer == 1 || req.body.bikeFriendly == 1 || req.body.playground == 1 || req.body.dogsAllowed == 1 || req.body.parkName || req.body.doggieBags == 1 || req.body.water == 1 || req.body.trashcans == 1 || req.body.fencedArea == 1 || req.body.leashRequired == 1)
    queryString += ` WHERE `;

  if (req.body.shade == 1) {
    queryString += `i.shade = ${req.body.shade} `;
    prev = true;
  }
  if (req.body.tennis == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `i.tennisCourt = ${req.body.tennis} `;
    prev = true;
  }
  if (req.body.skate == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `i.skatePark = ${req.body.skate} `;
    prev = true;
  }
  if (req.body.pool == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `i.pool = ${req.body.pool} `;
    prev = true;
  }
  if (req.body.basketball == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `i.basketballCourt = ${req.body.basketball} `;
    prev = true;
  }
  if (req.body.parkName) {
    if(prev)
      queryString += `AND `;

    console.log(prev);
    queryString += `p.park_name = '${req.body.parkName}'`;
    prev = true;
  }
  if (req.body.soccer) {
    if(prev)
      queryString += `AND `;

    queryString += `i.soccerField = '${req.body.soccer}' `;
    prev = true;
  }
  if (req.body.bikeFriendly) {
    if(prev)
      queryString += `AND `;

    queryString += `i.bikeFriendly = '${req.body.bikeFriendly}' `;
    prev = true;
  }
  if (req.body.playground) {
    if(prev)
      queryString += `AND `;

    queryString += `i.playground = '${req.body.playground}' `;
    prev = true;
  }
  if (req.body.dogsAllowed) {
    if(prev)
      queryString += `AND `;

    queryString += `i.dogFriendly = '${req.body.dogsAllowed}' `;
    prev = true;
  }
  if (req.body.doggieBags == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `pa.doggie_bags = ${req.body.doggieBags} `;
    prev = true;
  }
  if (req.body.water == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `pa.water = ${req.body.water} `;
    prev = true;
  }
  if (req.body.trashcans == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `pa.trashcans = ${req.body.trashcans} `;
    prev = true;
  }
  if (req.body.fencedArea == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `pa.fenced_area = ${req.body.fencedArea} `;
    prev = true;
  }
  if (req.body.leashRequired == 1) {
    if(prev)
      queryString += `AND `;

    queryString += `pa.leash_required = ${req.body.leashRequired} `;
    prev = true;
  }
  if(req.body.filter != -1 && req.body.filter != "colorRank"){
    queryString += ` ORDER BY ${req.body.filter} DESC`
  } else if(req.body.filter != -1 && req.body.filter == "colorRank"){
    queryString += ` ORDER BY ${req.body.filter} ASC`
  }
  console.log(queryString);
  connection.query(queryString, function(err, results, fields) {
    res.send(results);
  })
});

//filter by popular dog spots, filter by pet friendliness, disability filter, park ratings search, color filter

module.exports = router;
