const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieHl6dHVzaCIsImEiOiJjazdzcW56OG8wZm52M3JwZ25hZHJqN2xtIn0.ELYw0NI35mbU9SpP5JD0FQ&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to conect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode
