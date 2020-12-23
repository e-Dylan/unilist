// API URLS
const API_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_API_URL : process.env.REACT_APP_PRODUCTION_API_URL

const DOMAIN_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_DOMAIN_URL : process.env.REACT_APP_PRODUCTION_DOMAIN_URL

export function addUniversityToDb(uniData) {
	var universities = fetch(`${API_URL}/addUniversity`, {
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