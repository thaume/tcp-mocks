var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var CronJob = require('cron').CronJob;

// Departures API settings
var departuresPollUrl = 'https://api.navitia.io/v1/coverage/fr-idf/coords/2.328245;48.878772/departures';
var departuresPollAuth = process.env.API_POLL_KEY || '';

// Execute 'pollApi' every minute
new CronJob('* * * * * *', function(){
  pollApi();
}, null, true);

function pollApi () {
  request({
    url: departuresPollUrl,
    headers: {
      'Authorization': departuresPollAuth // Auth for the API
    }
  }).spread(function(response, body) {
    var results = JSON.parse(body);
    console.log('Body: ', results.departures[0].stop_date_time.departure_date_time);
  }).catch(function(err) {
    console.error('Error: ', err);
  });
};
