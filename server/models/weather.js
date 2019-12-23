const request = require('request-promise');

const API_KEY = '282248386732ff4dec6c18013d83f6b6';

class Weather {
    static retrieveByCity (city, callback) {
      request({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`,
        json: true
      }).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err);
        callback({ error: 'Could not reach OpenWeatherMap API.' });
      });
    }
}
  
  module.exports = Weather;