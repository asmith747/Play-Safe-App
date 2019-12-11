const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var router = express.Router();
var connection = require('../mysqlConnect');

var myLogger = function (req, res, next) {
  console.log('Incident LOGGED')
  next()
}

router.use(myLogger);

router.get('/park/:parkId', function(req, res) {
  if (req.params.parkId > 0) {
    connection.query(`SELECT username, incident.* FROM incident JOIN incidentTypes ON incident.incidentType = incidentTypes.incidentType JOIN account ON incident.createdBy = account.user_id WHERE park_id = ${req.params.parkId}`, function(err, results, fields) {
      if (err) {
        res.send("error");
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send('no recorded incidents at this park')
      }
    });
  }
});

router.get('/view/:incidentId', function(req, res) {
  var incidentId = req.params.incidentId
  console.log("incident num " + incidentId);
  connection.query(`SELECT * FROM incident WHERE incident_id = ${incidentId}`, function(err, results, fields) {
    if (err) {
      res.send("error");
    } else if (results.length > 0) {
      res.send(results);
    } else {
      res.send('no incident with that id')
    }
  })
});

router.get('/all', function(req, res) {
  console.log("all incidents");
  connection.query(`SELECT * FROM incident`, function(err, results, fields) {
    if (err) {
      res.send("error");
    } else if (results.length > 0) {
      res.send(results);
    } else {
      res.send('no incidents  ')
    }
  })
});

router.post('/myIncidents', function(req, res) {
  connection.query(`SELECT park_name, incident.* FROM incident JOIN park ON incident.park_id = park.park_id WHERE createdBy = '${req.body.userID}'`, function(err, results, fields) {
      if (err) {
        res.send("error getting incidents");
      } else if (results.length != 0) {
        console.log(results);
        res.send(results);
      } else {
        console.log(results.length);
        res.send("There are no saved incidents");
      }
  });
});

router.get('/incidentTypes', function(req, res) {
  console.log("incident types");
  connection.query(`SELECT typeDescription FROM incidentTypes`, function(err, results, fields) {
    if (err) {
      res.send("error");
    } else {
      res.send(results);
    }
  })
})

router.post('/createIncident', function(req, res) {
    var date = new Date();
    connection.query(`INSERT INTO incident (park_id, createdBy, incidentType, incidentDescription, incidentDate, create_date, update_date)
      VALUES (${req.body.parkId},  ${req.body.userID}, ${req.body.incidentType}, '${req.body.incidentDescription}',
      '${req.body.incidentDate}', ${connection.escape(date)}, ${connection.escape(date)})`);
    console.log('Created a new row and added the incident');
    res.send("incident added");
});

module.exports = router;
