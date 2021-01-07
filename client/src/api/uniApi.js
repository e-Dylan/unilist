import { API_URL } from './userApi';
import { DOMAIN_URL } from './userApi';

export const nullUniData = {
	id: 0,
	name: undefined,
	tags: undefined,
	university_data: {
		ratings: {
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
				rating: 73,
				frequency: { rating: 0, desc: "Uncertain" },
			},
			online_resources: {
				rating: 90,
			},
			professor_interaction: {
				rating: 0,
				desc: "Uncertain",
			},
			cost_value: {
				rating: 0,
			},
			fun: {
				rating: 0
			},
			campus: {
				rating: 0
			},
			people_community: {
				rating: 0
			},
			internet: {
				rating: 0,
				desc: "High speed"
			},
			clubs_extracurriculars: {
				rating: 0,
			},
			restaurants: {
				rating: 0,
			},
			academic_services: {
				rating: 0,
			},
			fitness_gym: {
				rating: 0
			},
			weather: {
				now: {
					rating: 0,
					temp: 0,
					feels_like: 0,
					desc: "Snowing",
				},
				average: {
					rating: 0,
					temp: 0,
					feels_like: 0,
					desc: "Warm summers, cold winters.",
				}
			},
			facilities: {
				rating: 0
			},
			research: {
				rating: 0
			},
		},
		data: {
			costs: {
				tuition: "",
				residence: "",
				mealplan_food: "",
				books_supplies: "",
				transportation: "",
			},
			the_school: {
				known_for: "",
				campus_size: "",
				campus_type: "",
				equipment: "",
				community: "",
			},
			class_types: {
				class_sizes: "",
				classrooms: "",
				classes: "",
			},
			culture: {
				diversity: "",
				majority: "",
				average_class: "",
			},
			awards: {
				annual_value: "",
				scholarships: "",
				bursaries: "",
				applied_auto: "",
				entrance_during: "",
			},
			jobs_coop: {
				coop_service: "",
				reputation: "",
				average_salary: "",
			},
			the_city: {
				city_type: "",
				population: "",
				public_transit: "",
				location: "",
			},
			surroundings: {
				restaurants: "",
				bars_clubs: "",
				nature: "",
				near_water: "",
			},
			environment: {
				air_quality: "",
				pollution: "",
				water_quality: "",
			},
		},
		location_data: {
			lat: 0,
			lng: 0,
		},
	},
	image_path: "University_of_Toronto.jpg"
};

// UNIVERSITY API CALLS

export const fetchUniversities = async (tags) => {
	return fetch(`${API_URL}/searchUniversities`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			tags: tags,
		}),
	})
	.then(res => res.json())
	.then(result => {
		return result;
		// console.log(result);
		// console.log(props.globalState.universityListState.universityList);
	})
}

export const fetchAllUniversities = async() => {
	return fetch(`${API_URL}/getAllUniversities`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
	.then(res => res.json())
	.then(result => {
		// console.log(result);
		return result;
	})
}

export function addUniversityToDb(uniData) {
	fetch(`${API_URL}/addUniversity`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: uniData
		})
		.then(res => res.json())
		.then(result => {
			console.log(result);
		})
}