import { getRepository, getConnection, getManager } from "typeorm";
import { University } from './entity/University';

const torData = {
	ratings: {
		overall_rating: { rating: 7.7 },
		education: {
			rating: 92,
			desc: "Superior",
		},
		covid19: {
			rating: 25,
			cases: {
				rating: 65,
				total: 133,
				past_week: 14,
			},
			qol: {
				rating: 50,
				desc: "Good",
			}
		},
		the_city: {
			rating:	90
		},
		food: {
			rating: 84,
		},
		amenities: {
			rating: 85,
		},
		sports: {
			rating: 80,
			desc: "44 teams in 26 sports",
		},
		transportation: {
			rating: 97,
		},
		academic_resources: {
			rating: 89,
		},
		parties: {
			rating: 0,
			frequency: { rating: 0, desc: "Uncertain" },
			quality: { rating: 73, desc: "Uncertain" },
		},
		online_resources: {
			rating: 90,
		},
		professor_interaction: {
			rating: 0,
			desc: "Uncertain",
		},
		cost_value: {
			rating: 80,
		},
		fun: {
			rating: 50
		},
		campus: {
			rating: 87
		},
		people_community: {
			rating: 87
		},
		internet: {
			rating: 90,
			desc: "High speed"
		},
		clubs_extracurriculars: {
			rating: 76,
		},
		restaurants: {
			rating: 95,
		},
		academic_services: {
			rating: 90,
		},
		fitness_gym: {
			rating: 75
		},
		weather: {
			rating: 60,
			now: {
				rating: 40,
				temp: 0,
				feels_like: 0,
				desc: "Snowing",
			},
			average: {
				rating: 83,
				temp: 0,
				feels_like: 0,
				desc: "Warm summers, cold winters.",
			}
		},
		facilities: {
			rating: 90
		},
		research: {
			rating: 97
		},
	},
	location_data: {
		lat: 43.66301198062148, lng: -79.39574759717516
	},
	data: {
		costs: {
			tuition: "$6,590",
			residence: "~$9,500",
			mealplan_food: "$5,300",
			books_supplies: "$1,000",
			transportation: "$210",
		},
		the_school: {
			known_for: "Biotech & AI",
			campus_size: "Very large",
			campus_type: "Big city",
			students: "87083",
			equipment: "High tech",
			community: "Large, diverse",
		},
		class_types: {
			class_sizes: "< 50 students",
			classrooms: "Lecture halls",
			classes: "Lectures, labs",
		},
		culture: {
			diversity: "Complex",
			majority: "Uncertain",
			average_class: "Uncertain",
		},
		awards: {
			annual_value: "$23 million",
			scholarships: "Yes",
			bursaries: "Yes",
			applied_auto: "Both",
			entrance_during: "Both",
		},
		jobs_coop: {
			coop_service: "Yes",
			reputation: "Supportive",
			average_salary: "$50,000",
		},
		the_city: {
			city_type: "Big city",
			population: "2,819,723",
			public_transit: "Bus, rail, cabs",
		},
		surroundings: {
			restaurants: "Tons.",
			bars_clubs: "Lots, all styles.",
			nature: "Lots: parks, paths.",
			near_water: "Lake Ontario",
		},
		environment: {
			// https://aqicn.org/city/toronto/ AUTOMATE
			air_quality: "Moderate (55)",
			pollution: "Low (37)",
			water_quality: "Safe (tap)",
		},
	},
}

const calcActiveOverallRating = (data) => {
	var total = 0;
	var iters = 0;
	// Every top-level data object has a rating, sum them all.
	var keys = Object.keys(data);
	for (var i = 1; i < keys.length; i++) { // start at idx=1 to skip overall rating field.
		total += data[keys[i]].rating;
		iters += 1;
	}
	var average = total / iters;
	return (average/10).toFixed(1);
}

export function updateUniOverallRating() {
	getConnection().transaction(async connection => {

		const manager = getManager();
		const uni = await manager.findOne(University, 2)

		try {
			let newData = torData;

			var average = calcActiveOverallRating(newData.ratings);
			newData.ratings.overall_rating.rating = parseInt(average);
			var finalData = JSON.stringify(newData);
			
			uni.university_data = finalData;

			console.log('[database]: Inserting university into table: university. Data: \n\n', JSON.parse(finalData));
			console.log(`+1 column changed: [${uni.name}].`);

			await manager.save(uni);
		} catch (error) {
			console.log("\n\nCaught error: \n\n", error);
		}
	});
}

export function insertUniversityDataRatings() {
	getConnection().transaction(async connection => {
		const manager = getManager();
		const numUniversities = await manager.count(University);
		const newRatings = torData.ratings;
		for (var i: number = 1; i <= numUniversities; i++) {
			var uni = await manager.findOne(University, i);
			
			const copy = JSON.parse(uni.university_data);
			copy.ratings = newRatings;
			uni.university_data = JSON.stringify(copy);
			manager.save(uni);
		}
	});
}

export function insertUniversityDataData() {
	// RIGHT NOW, FOR TESTING, ALL UNIVERSITIES HAVE TORONTO'S DATA (university_data).
	getConnection().transaction(async connection => {
		const manager = getManager();
		const torUni = await manager.findOne(University, 1);
		const torData = JSON.parse(torUni.university_data).data;

		const uni = await manager.findOne(University, 4);
		var newData = JSON.parse(uni.university_data);
		newData.data = torData;
		uni.university_data = JSON.stringify(newData);

		// await manager.save(uni);
	});
}

export function insertCityName() {
	getConnection().transaction(async connection => {
		const manager = getManager();
		const uni = await manager.findOne(University, 4);

		const cityName = "Ottawa, ON";

		try {
			var newData = JSON.parse(uni.university_data);
			newData.data.the_city.location = cityName;
			newData = JSON.stringify(newData);
			uni.university_data = newData;

			console.log(`[database]: Inserting city name ${cityName} into table: university. Data: \n\n`, JSON.parse(newData));
			console.log(`+1 column changed: [${uni.name}].`);

			await manager.save(uni);
		} catch (e) {
			console.log(e);
		}
	})
}