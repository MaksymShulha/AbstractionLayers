var fs = require('fs');
var logFile = 'log.log';

var errMessage = function(err, callback){
	var message = {
		error: err.toString()
	};
	callback(message);
};
var reqMessage = function(req, callback){
	var message = {
		reqMethod: req.method,
		reqUrl: req.url
	};
	callback(message);
};
var cacheMessage = function(obj, callback){
	var message = {
		cacheOperation: obj.method,
		data: obj.data
	};
	callback(message);
};
var logType = {
    err: errMessage,
    req: reqMessage,
    res: reqMessage,
    cache: cacheMessage
};
/*var resMessage = function(res, callback){
	var message = {
		'req method': res.statusCode,
		'req url': req.url
	}
	callback(message);
}*/
var getInfoMsg = function (msg){
	return '' + msg.time + ' ' + msg.type;
};
var formaters = {
	err: function (msg){  return getInfoMsg(msg) + ' ' + msg.error; },
	req: function (msg){ return getInfoMsg(msg) + ' ' + msg.reqMethod + ' ' + msg.reqUrl; },
	cache: function (msg){ return getInfoMsg(msg) + ' ' + msg.cacheOperation + ' ' + msg.data; }
};
var formatMessage = function (message) {
    return formaters[message.type](message);
};
var logger = function (type, obj) {
	logType[type](obj, function(message){
		message.type = type;
		message.time = new Date().toISOString();
		var msg = formatMessage(message);
		console.log(msg);
		fs.appendFile(logFile, msg);
	});
};

module.exports = {
	logger: logger
};