var log = require('./logger.js');

var cache = {};

var getFromCache = function(url, callback){
	var cacheResult = cache[url];
	log.logger('cache', cacheResult);
	callback(cacheResult);
}

var putInCache = function(url, data){
	cache[url] = data;
}

module.exports = {
	getFromCache: getFromCache,
	putInCache: putInCache
}