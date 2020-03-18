const request = require('request');

const forecast = (d, callback) => {
    const latitude = d.latitude;
    const longitude = d.longitude;
    const location = d.location;

    const url = `https://api.darksky.net/forecast/054cf92079f9d11ccce737447ed60ccf/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to Connect!', undefined);
        }
        else if(response.body.error){
            callback('Unable to find Location', undefined);
        }else {
            const data = response.body.daily.data[0].summary +` It is currently ${response.body.currently.temperature} degrees out. There's ${100*response.body.currently.precipProbability.toPrecision(2)}% chance of rain.`;
            callback(undefined, data);
        }
    })
} 

module.exports = forecast