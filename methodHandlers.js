var fs = require('fs'),
    bL = require('./businessLogic.js'),
    cache = require('./cache.js');

var getPerson = function (req, res, callback) {
    cache.getFromCache(req.url, function(cacheResult){

        var head = {
            'Set-Cookie': 'mycookie=test',
            'Content-Type': 'text/html'
        };

        if (cacheResult == undefined) {
            fs.readFile('./person.json', function (err, data) {
                if (!err) {
                    bL.getParceData(data, function(){
                        cache.putInCache(req.url, data);
                        callback(200, head, data);
                    });
                } else {
                    log.logger('err', err);
                }
            });

        } else {
            callback(200, head, cacheResult);
        }
    });

};
var postPerson = function (req, res, callback) {
    var body = [];
    req.on('error', function () { console.log('error'); }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        bL.postParceData(body, function(data){
            cache.putInCache(req.url, data);
            bL.postBusinessLogic(data, callback);
        });
    });
};

module.exports = {
    getPerson: getPerson,
    postPerson: postPerson
};