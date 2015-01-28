// Load the TCP Library
var net = require('net');
var redis = require('redis');
var redisCli;

// Initializers
require('./config/initializers/01_redis.js');
redisCli = redis.redisCli;

// Middlewares
// var middleware = require('./config/middleware');

// io.use(middleware.authorization());

// // Requests hanlding
// io.sockets.on('connection', function (socket) {
//   console.log('connection');
//   socket.on('my event', function (data) {
//     console.log('data received: ', data);
//   });
// });

var server = net.createServer(function(socket) {
  if (socket.remoteAddress !== '127.0.0.1') {
    return socket.destroy();
  }

  socket.write('Echo server\r\n');
  console.log('Remote ip: ', socket.remoteAddress);
  console.log('Remote port: ', socket.remotePort);

  socket.on('connect', function () {
    console.log('Remote ip: ', socket.remoteAddress);
    console.log('Remote port: ', socket.remotePort);
  });

  socket.on('data', function (chunk) {
    console.log('chunck: ', chunk);
  });

  sock.on('close', function(data) {
    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
  });
});

server.listen(3013, '127.0.0.1');
