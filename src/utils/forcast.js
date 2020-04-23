const request = require('request');


const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=28b3e2a954ef3b14f91c852e8d041d00&query='+ latitude + ',' + longitude;

    request.get({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to wheather service', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const {current} = body;
            const {weather_descriptions, temperature, precip} = current;
            callback(undefined, `${weather_descriptions[0]}, It is currently ${temperature}, The precip is  ${precip}%`);
        }
    
    });
}

module.exports = forecast;