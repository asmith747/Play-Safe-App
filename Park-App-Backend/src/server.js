const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
var loginRouter = require('./Account/Login');
var createAccountRouter = require('./Account/CreateAccount')
var browseRouter = require('./Browse/Browse');
var profileRouter = require('./Account/ProfilePage');
var ratingRouter = require('./Rating/Rating');
var incidentRouter = require('./Incident/incident');
var searchRouter = require('./Search/Search');
var favoritesRouter = require('./Favorites/favorites');
var connection = require('./mysqlConnect');

var fs = require('fs');
var readline = require('readline');

//Upload data from sql file into DB
var rl = readline.createInterface({
  input: fs.createReadStream('./Data.sql'),
  terminal: false
 });
rl.on('line', function(chunk){
    connection.query(chunk.toString('ascii'), function(err, sets, fields){
     if(err) console.log(err);
    });
});
rl.on('close', function(){
  console.log("finished parsing sql");
});

const config = {
    name: 'Park-Information-App',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();

app.use(cors())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use('/createAccount', createAccountRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/browse', browseRouter);
app.use('/rating', ratingRouter);
app.use('/search', searchRouter);
app.use('/incident', incidentRouter);
app.use('/favorites', favoritesRouter);

app.get('/', function (req, res) {
  res.redirect('/landingPage');
})

app.get('/home', function(req, res)
{
    if(req.session.loggedin)
    {
        res.redirect('/home');
    }
    else
    {
        res.send("Please login to view this page!");
    }
    res.end();
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
    if (e) {
      throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
  });

module.export  = app;
