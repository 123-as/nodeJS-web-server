const request = require("request");

const forecast = (latitude, longitude, fn) => {
  const url = `http://api.weatherstack.com/current?access_key=bb97dbbf822b8301a5f822ed02146f00&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      fn("Unable to connect to weather service.");
    } else if (response.body.error) {
      fn("Unable to find location.");
    } else {
      const { temperature, feelslike, weather_descriptions } =
        response.body.current;

      fn(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
