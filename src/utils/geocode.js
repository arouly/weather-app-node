const request = require('request');

const geocode = (address, callback) => {
        
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3ZyaXZlaXIiLCJhIjoiY2p6cGpzajE1MDFkbDNpbzIwcTN3OHl4YyJ9.GVY17q5nc8LmsMfHH1SIvw&limit=1';

    request.get({ url, json: true}, (error, { body }) => {

        if(error) {
            callback('Unable to connect to mapbox.com', undefined);
        } else if (body.message) {
            callback(body.message, undefined);
        } else if (body.features.length === 0) {
            callback('The location does not exist', undefined);
        }  else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;