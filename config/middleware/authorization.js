var redis = require('redis');
var redisCli = redis.redisCli;

module.exports = function () {

  return function (socket, next) {
    var handshakeData = socket.request;

    redisCli.hgetall('biv-ips', function (err, replies) {
      if (err) {
        return console.error('error response - ' + err);
      }
      console.log('Replies:', replies);
    });

    if (false) {
      return next(new Error('Not authorized'));
    }
    // BIV authorized
    next();
  }

};
