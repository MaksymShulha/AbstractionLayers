var fs = require('fs'),
    log = require('./logger.js');

var getParceData = function (data, callback) {
    var obj = JSON.parse(data);
    obj.birth = new Date(obj.birth);
    var difference = new Date() - obj.birth;
    obj.age = Math.floor(difference / 31536000000);
    delete obj.birth;
    var data = JSON.stringify(obj);
    callback(data);
};
var postParceData = function(body, callback){
	var data = Buffer.concat(body).toString();
    var obj = JSON.parse(data);
    if (obj.name) obj.name = obj.name.trim();
    data = JSON.stringify(obj);
    callback(data);
};
var postBusinessLogic = function (data, callback) {
    fs.writeFile('./person.json', data, function (err) {
        if (!err) {
            callback(200, 'File saved');
        } else {
            log.logger('err', err);
            callback(500, 'Write error');
        }
    });
};

module.exports = {
	getParceData: getParceData,
    postParceData: postParceData,
    postBusinessLogic: postBusinessLogic
};