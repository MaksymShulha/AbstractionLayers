var parseCookies = function (req, callback) {
    var cookie = req.headers.cookie,
        cookies = {};
    if (cookie) cookie.split(';').forEach(function (item) {
        var parts = item.split('=');
        cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    req.cookies = JSON.stringify(cookies);
    callback(req);
}

module.exports = {
	parseCookies: parseCookies
}