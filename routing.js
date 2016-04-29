var handler = require('./handlers.js');

var routing = {
    '/': handler.startPageHandler,
    '/person': handler.personHandler
};
var getRoute = function (key, callback) {
    callback(routing[key]);
};

module.exports = {
	getRoute: getRoute
}