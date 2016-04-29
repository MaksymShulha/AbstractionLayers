var methodHandlers = require('./methodHandlers.js');

var personMethods = {
    'GET': methodHandlers.getPerson,
    'POST': methodHandlers.postPerson
};

module.exports = {
    personMethods: personMethods
};