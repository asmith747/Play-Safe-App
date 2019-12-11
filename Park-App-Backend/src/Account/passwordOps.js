var crypto = require('crypto');

var generateSalt = function(length) {
	return crypto.randomBytes(length).toString('hex').slice(0, length);
}

var sha512 = function(password, salt) {
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return value;
};

module.exports = {generateSalt, sha512};
