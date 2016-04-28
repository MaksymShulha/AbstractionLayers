var methodHandlers = require('./methodHandlers.js');

var personMethods = {
    'GET': methodHandlers.getPerson,
    'POST': methodHandlers.postPerson
};

module.exports = {
    personMethods: personMethods
};

//exports.personMethods = personMethods;
//module.exports = personHandler;
//exports.getPerson = getPerson;
