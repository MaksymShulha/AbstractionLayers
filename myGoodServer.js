var http = require('http'),
    fs = require('fs'),
    rt = require('./routing.js'),
    log = require('./logger.js'),
    cookies = require('./cookies.js');

var types = {
    object: function (o) { return JSON.stringify(o); },
    string: function (s) { return s; },
    undefined: function () { return 'not found'; },
    function: function (fn, req, res, callback) { return fn(req, res, callback) + ''; },
};

http.createServer(function (req, res) {

    cookies.parseCookies(req, function(req){
        log.logger('req', req);

        rt.getRoute(req.url, function (data) {
            types[typeof (data)](data, req, res, function (code, header, data) {
                res.writeHead(code, header);
                res.end(data);
            });
        });
    });
}).listen(80);