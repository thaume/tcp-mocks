var net = require('net');
var clientPort = 3013;
var clientIP = '127.0.0.1';

var net = require('net');

var client = new net.Socket();

client.connect(clientPort, clientIP, function() {
  console.log('Connected');
  client.write('Hello, server! Love, Client.');

  setTimeout(function() {
    client.write('Hello, server 2! Love, Client.');
  }, 800);
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  // client.destroy(); // kill client after server's response
});

client.on('close', function() {
  console.log('Connection closed');
});
