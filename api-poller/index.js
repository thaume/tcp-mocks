var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
// Departures API settings
var departuresPollUrl = 'https://api.navitia.io/v1/coverage/fr-idf/coords/2.328245;48.878772/departures';
var departuresPollAuth = 'aac2820a-38f7-46ba-9d71-5c3e4b06a0a8';

setInterval(function() {
  pollApi();
}, 3000);

function pollApi () {
  request({
    url: departuresPollUrl,
    headers: {
      'Authorization': departuresPollAuth
    }
  }).spread(function(response, body) {
    var results = JSON.parse(body);
    console.log('Body: ', results.departures[0].stop_date_time.departure_date_time);
  }).catch(function(err) {
    console.error('Error: ', err);
  });
};
