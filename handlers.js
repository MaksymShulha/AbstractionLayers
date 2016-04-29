var methods = require('./personMethods.js'),
    cache = require('./cache.js');

var startPageHandler = function (req, res, callback) {
    cache.getFromCache(req.url, function(cacheResult){
        var head = {
            'Set-Cookie': 'mycookie=test',
            'Content-Type': 'text/html'
        };
        if (cacheResult == undefined) {
            var data = '<h1>Welcome</h1>Your IP: ' + req.connection.remoteAddress + '<br>' + req.cookies;
            cache.putInCache(req.url, data);
            callback(200, head, data);
        } else {
            callback(200, head, cacheResult);
        }
    });   
};
var personHandler = function (req, res, callback) {
    methods.personMethods[req.method](req, res, callback);
};

module.exports = {
    startPageHandler: startPageHandler,
    personHandler: personHandler
};