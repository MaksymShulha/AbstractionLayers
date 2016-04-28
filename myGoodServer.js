var http = require('http'),
    fs = require('fs'),
    rt = require('./routing.js');


var cache = {};

var businessLogic = function (data) {
    var obj = JSON.parse(data);
    obj.birth = new Date(obj.birth);
    var difference = new Date() - obj.birth;
    obj.age = Math.floor(difference / 31536000000);
    delete obj.birth;
    var data = JSON.stringify(obj);
    return data;
}
/*
var createStartPage = function (req, res, callback) {
    var data = '<h1>Welcome</h1>Your IP: ' + req.connection.remoteAddress + '<br>' + req.cookies;
    var head = {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/html'
    };
    callback(200, head, data);
};
var getPerson = function (req, res, callback) {
    fs.readFile('./person.json', function (err, data) {
        if (!err) {
            var head = {
                'Set-Cookie': 'mycookie=test',
                'Content-Type': 'text/html'
            };
            callback(200, head, businessLogic(data));
        }
    });
};
var postPerson = function (req, res, callback) {
    var body = [];
    req.on('error', function () { console.log('error');}).on('data', function (chunk) {
        console.log(''+chunk);
        body.push(chunk);
    }).on('end', function () {
        var data = Buffer.concat(body).toString();
        var obj = JSON.parse(data);
        if (obj.name) obj.name = obj.name.trim();
        data = JSON.stringify(obj);
        //cache[req.url] = data;
        fs.writeFile('./person.json', data, function (err) {
            if (!err) {
                callback(200, 'File saved');
            } else {
                callback(500, 'Write error');
            }
        });
    });
};*/
/*
var personHandler = function (req, res, callback) {
    personMethods[req.method](req, res, callback);
};

var personMethods = {
    'GET': getPerson,
    'POST': postPerson,
};*/
/*var routing = {
    '/': createStartPage,
    '/person': personHandler,
};*/

var types = {
    object: function (o) { return JSON.stringify(o); },
    string: function (s) { return s; },
    undefined: function () { return 'not found'; },
    function: function (fn, req, res, callback) { return fn(req, res, callback) + ''; },
};

var logger = function (req) {
    var date = new Date().toISOString();
    console.log([date, req.method, req.url].join('  '));
}
var parseCookies = function (req) {
    var cookie = req.headers.cookie,
        cookies = {};
    if (cookie) cookie.split(';').forEach(function (item) {
        var parts = item.split('=');
        cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    req.cookies = JSON.stringify(cookies);
    return req;
}

http.createServer(function (req, res) {

    req = parseCookies(req);
    logger(req);

    //console.log(cache);
    var cacheResult = cache[req.url];

    if (cacheResult == undefined) {
        //console.log(req.url);
        rt.getRoute(req.url, function (func) {
            var data = func;
            //console.log(data);
            types[typeof (data)](data, req, res, function (code, header, data) {
                cache[req.url] = data;
                res.writeHead(code, header);
                res.end(data);
            });
        });
        
        //console.log('new');
    } else {
        res.writeHead(200);
        res.end(cacheResult);
        //console.log('cache');
    }

}).listen(80);

