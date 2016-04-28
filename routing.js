var handler = require('./handlers.js');

var exports = module.exports = {};

var routing = {
    '/': handler.createStartPage,
    '/person': handler.personHandler
};
exports.getRoute = function (key, callback) {
    console.log(key);
    console.log(routing[key]);
    callback(routing[key]);
};


//module.exports = getRoute;