var fs = require('fs');
var logFile = 'log.log';
var errMessage = function(err, callback){
	var message = {
		'error': err.toString()
	}
	callback(message);
}
var reqMessage = function(req, callback){
	var message = {
		'req method': req.method,
		'req url': req.url
	}
	callback(message);
}
var cacheMessage = function(data, callback){
	var message = {
		'operation': 'getFromCache',
		'data': data
	}


	callback(message);
}

var logType = {
    'err': errMessage,
    'req': reqMessage,
    'res': reqMessage,
    'cache': cacheMessage
};
/*var resMessage = function(res, callback){
	var message = {
		'req method': res.statusCode,
		'req url': req.url
	}
	callback(message);
}*/

var logger = function (type, obj) {

	logType[type](obj, function(message){
		message.time = new Date().toISOString();
		console.log(message);
		fs.appendFile(logFile, JSON.stringify(message));
		//fs.appendFile(logFile, '\n\n\n');
	})
}

module.exports = {
	logger: logger
}