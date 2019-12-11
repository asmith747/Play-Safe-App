var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '34.68.213.226',      //for deployment
	//host: 'db',								//for local dev
	port: '3306',
	user: 'user',
	password: 'password',
	database: 'db'
});

connection.connect(function(err) {
	if (err)
	  logger.error("Cannot connect to DB!");
  });

module.exports = connection;
