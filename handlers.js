var methods = require('./personMethods.js');

var startPageHandler = function (req, res, callback) {
    var data = '<h1>Welcome</h1>Your IP: ' + req.connection.remoteAddress + '<br>' + req.cookies;
    var head = {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/html'
    };
    callback(200, head, data);
};
var personHandler = function (req, res, callback) {
    methods.personMethods[req.method](req, res, callback);
};

module.exports = {
    startPageHandler: startPageHandler,
    personHandler: personHandler
};