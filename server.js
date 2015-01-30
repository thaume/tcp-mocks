// Load the TCP Library
var net = require('net');
var redis = require('redis');
var binary = require('binary');
// var Struct = require('struct').Struct;

// Initializers
require('./config/initializers/01_redis.js')()

.then(function () {

  var redisCli = redis.redisCli;

  // Redis channels bindings
  redisCli.on('message', function (channel, message) {
    console.log('client1 channel ' + channel + ': ' + message);
  });
  redisCli.subscribe('pysae::traffic-update');

  net.createServer(function(socket) {
    if (socket.remoteAddress !== '127.0.0.1') {
      return socket.destroy();
    }

    // On connection, send this Buffer to the BIV, asking for authentication
    socket.write(new Buffer([0x02, 0x00, 0x05, 0x49, 0xFF, 0xFF, 0x03], 'hex'));

    socket.on('data', function (chunk) {
      var vars = binary.parse(chunk)
        .word8('entete')
        .word16bu('longueur')
        .word8('typeMessage')
        .word16bu('idBiv')
        .word8('timeout')
        .tap(function(vars){
          console.dir(vars)
        });
    });

    socket.on('close', function(data) {
      console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });
  }).listen(3013, '127.0.0.1');

}).catch(function (e) {
  console.log('Global error: ', e);
});
