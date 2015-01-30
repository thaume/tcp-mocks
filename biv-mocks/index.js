var net = require('net');
var clientPort = 3013;
var clientIP = '127.0.0.1';
var binary = require('binary');

var net = require('net');
var client = new net.Socket();

client.connect(clientPort, clientIP, function() {
  console.log('Connected!');
});

client.on('data', function(chunk) {
  console.log('Received: ', chunk);

  var vars = binary.parse(chunk)
    .word8('entete')
    .word16bu('longueur')
    .word8('typeMessage')
    .word16bu('idBiv')
    .tap(function(vars) {
      console.dir(vars);
      if (vars.typeMessage === 73) {
        respondToAuth(client);
      }
    });
});

client.on('close', function() {
  console.log('Connection closed');
});

function respondToAuth (client) {
  // Not configured BIV
  client.write(new Buffer([0x02, 0x00, 0x05, 0x49, 0x00, 0x00, 0x03], 'hex'));

  // Configured BIV
  if (false) {
    client.write(new Buffer([0x02, 0x00, 0x0B, 0x49, 0x00, 0x00, 0x03], 'hex'));
  }
};
