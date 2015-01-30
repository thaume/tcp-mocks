var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var CronJob = require('cron').CronJob;
var redis = require('redis');
var redisCli = redis.createClient();

// Departures API settings
var apiDownMock = 0;

var stopPoint1 = 'stop_point:RTP:SP:3926296';
var stopPoint2 = 'stop_point:RTP:SP:3926329';

// Put your API key in an env vars
var departuresPollAuth = process.env.API_POLL_KEY || '';
var departuresPollUrl = 'http://api.navitia.io/v1/journeys';

// Execute 'pollApi' every minute
new CronJob('* * * * *', function() {
  console.log('minute ', new Date().getMinutes());
  if (apiDownMock < 4) {
    pollApi();
  }
}, null, true);

// function pollApi () {
//   request({
//     url: departuresPollUrl, // Refresh date everytime
//     qs: {
//       from: stopPoint1,
//       to: stopPoint2,
//       datetime: getCurrDate()
//     },
//     headers: {
//       'Authorization': departuresPollAuth // Auth for the API
//     },
//     timeout: 1500
//   }).spread(function(response, body) {
//     try {
//       var results = JSON.parse(body);
//       console.log('Body: ', results.journeys[0].sections[0].departure_date_time);
//       updateRedisData(results.journeys[0].sections[0].departure_date_time);
//     } catch (e) {
//       console.log('Raw body: ', response);
//       console.log('Error while parsing JSON: ', e);
//     }

//   }).catch(function(err) {
//     console.error('Error: ', err);
//   });
// };

// Could be used for testing purpose
function pollApi () {
  if (!apiDownMock) {
    updateRedisData('20150130T101500');
  }
  if (apiDownMock === 1) {
    updateRedisData('20150130T101500');
  }
  if (apiDownMock === 2) {
    updateRedisData('20150130T103000');
  }
  if (apiDownMock === 3) {
    updateRedisData('20150130T103700');
  }
  apiDownMock++;
}

function getCurrDate () {
  var d = new Date();
  var currMins = ('0' + d.getMinutes()).substr(-2);
  var currHours = ('0' + d.getHours()).substr(-2);
  var currDate = ('0' + d.getDate()).substr(-2);
  var currMonth = ('0' + (d.getMonth() + 1)).substr(-2);
  var currYear = d.getFullYear();
  var currDate = currYear + currMonth + currDate + 'T' + currHours + currMins + '00';
  console.log('Log: ', currDate);
  return currDate;
};

function updateRedisData (nextDeparture) {
  // There's an update! Send the new departure time!
  redisCli.hget('last-dep', 'last', function (err, res) {
    if (nextDeparture === res) {
      // If next departure didn't change, don't publish to the channel
      return;
    }
    // If the next departure changed, push it to the channel
    console.log('There\'s an update');
    redisCli.hset('last-dep', 'last', nextDeparture, redis.print);
    redisCli.publish("pysae::traffic-update", JSON.stringify({
      id: '1',
      nextDeparture: nextDeparture
    }));
  });
};
