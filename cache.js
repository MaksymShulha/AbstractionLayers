var log = require('./logger.js');

var cache = {};

var getFromCache = function(url, callback){
	var cacheResult = cache[url];
	log.logger('cache', {method: 'GET', data: cacheResult});
	callback(cacheResult);
};

var putInCache = function(url, data){
	cache[url] = data;
	log.logger('cache', {method: 'PUT', data: data});
};

module.exports = {
	getFromCache: getFromCache,
	putInCache: putInCache
};