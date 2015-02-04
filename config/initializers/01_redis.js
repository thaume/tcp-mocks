var Promise = require('bluebird');
var redis = require('redis');
var redisCli = redis.createClient();

module.exports = function () {

  return new Promise(function (resolve, reject) {
    redisCli.on('error', function (err) {
      console.log('error event - ' + redisCli.host + ':' + redisCli.port + ' - ' + err);
      return reject(err);
    });

    // Cleanup the redis database on start
    redisCli.flushall();

    // BIVs ids
    var bivIps = [
      'biv-ips',
      '0.0.0.0', 'connected',
      '0.0.0.1', 'connected'
    ];

    // Inject base data in redis and resolve the function
    redisCli.hmset(bivIps, function () {
      redis.redisCli = redisCli;
      return resolve();
    });

  });

}
