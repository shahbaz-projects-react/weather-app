const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d90bcccd5963892b38b23143fcf6f047/' + latitude + ',' + longitude+'?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree celsius out. High is '+ body.daily.data[0].temperatureHigh+' degree celsius and low is ' +body.daily.data[0].temperatureLow+ ' degree celsius. There is a ' + body.currently.precipProbability * 100 + '% chance of rain.')
        }
    })
}

module.exports = forecast