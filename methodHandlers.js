var fs = require('fs');

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
    req.on('error', function () { console.log('error'); }).on('data', function (chunk) {
        console.log('' + chunk);
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
};

module.exports = {
    getPerson: getPerson,
    postPerson: postPerson
};