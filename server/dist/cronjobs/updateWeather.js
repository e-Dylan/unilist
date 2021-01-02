var cron = require('node-cron');
var fetch = require('node-fetch');
var weatherAPIKey = '50d9b938ed3fb013a16ec3ed594ea7dc';
console.log("Initializing [updateWeather] cronjob - running every [1 minute].");
cron.schedule('* * * * *', function () {
    console.log('running a task every minute');
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=45&lon=-70&appid={weatherAPIKey}')
        .then(function (res) { return res.json(); })
        .then(function (res) { return console.log(res); });
});
//# sourceMappingURL=updateWeather.js.map