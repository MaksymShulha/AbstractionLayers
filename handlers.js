var methods = require('./methods.js');

var exports = module.exports = {};

exports.createStartPage = function (req, res, callback) {
    var data = '<h1>Welcome</h1>Your IP: ' + req.connection.remoteAddress + '<br>' + req.cookies;
    var head = {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/html'
    };
    callback(200, head, data);
};

exports.personHandler = function (req, res, callback) {
    console.log(req.method);
    console.log(methods.personMethods[req.method]);
    console.dir(methods);
    methods.personMethods[req.method](req, res, callback);
};