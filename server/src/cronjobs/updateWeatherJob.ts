import { getRepository, getConnection, getManager } from "typeorm";
import { University } from '../entity/University';

const cron = require('node-cron');
const fetch = require('node-fetch');

const weatherAPIKey = '50d9b938ed3fb013a16ec3ed594ea7dc';

console.log("Initializing [updateWeather] cronjob - running every [7 days (Sundays)].")

/**
 * updateWeather cron job: updates weather data for every row (university) in the university table.
 * updates at: uni.university_data.ratings.now. [temp], [feels_like], [desc]
 * 			   uni.university_data.ratings.average. [temp], [feels_like], [desc] <-- TO MAKE. GET DATA FROM API.
 */

// cron.schedule('0 0 * * 0', () => { // 7 days, sunday
cron.schedule('*/10 * * * *', () => {
	console.log('RUNNING: [updateWeather] cronjob - running every [10 minutes].');
// cron.schedule('* * * * *', () => { // 1 minute
	// console.log('RUNNING: [updateWeather] cronjob - running every [7 days (Sundays)].');
	
	getConnection().transaction(async connection => {
		
		const manager = getManager();

		const entity = University;
		const numRows = await manager.count(entity);

		for (var i = 1; i <= numRows; i++) {
			const uni = await manager.findOne(entity, i);

			const lat = JSON.parse(uni.university_data).location_data.lat;
			const lng = JSON.parse(uni.university_data).location_data.lng;
			

			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${weatherAPIKey}`)
				.then(res => res.json())
				.then(async res => {
					// console.log(res);
					const nowCurrentTemp = res.current.temp - 273.15; // Kelvin to Celcius
					const nowFeelsLikeTemp = res.current.feels_like - 273.15;
					const nowWeatherDesc = res.current.weather[0].main; // "Rain", or "..." -> used to map icons on front-end.

					const avgCurrentTemp = nowCurrentTemp;
					const avgFeelsLikeTemp = nowFeelsLikeTemp;

					var newData = JSON.parse(uni.university_data);

					newData.ratings.weather.now.temp = nowCurrentTemp;
					newData.ratings.weather.now.feels_like = nowFeelsLikeTemp;
					newData.ratings.weather.now.desc = nowWeatherDesc;

					newData = JSON.stringify(newData);

					uni.university_data = newData;

					await manager.save(uni);
			});
		}
		console.log(`Finished updating weather data for all (${numRows}) rows for ${entity}.`);
		
	});
});