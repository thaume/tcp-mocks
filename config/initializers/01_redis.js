var redis = require('redis');
var redisCli = redis.createClient();

redisCli.flushall();
redisCli.on('error', function (err) {
  console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});
var bivIps = [
  'biv-ips',
  '0.0.0.0', 'connected',
  '0.0.0.1', 'connected'
];
redisCli.hmset(bivIps, redis.print);

redis.redisCli = redisCli;
