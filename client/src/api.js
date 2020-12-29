// API URLS
export const API_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_API_URL : process.env.REACT_APP_PRODUCTION_API_URL

export const DOMAIN_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_DOMAIN_URL : process.env.REACT_APP_PRODUCTION_DOMAIN_URL

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
		console.log(result);
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
		return result;
	})
}

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

// USER AUTH
export function registerUser(userData) {
	if (!userData || !userData.username || !userData.email || !userData.password) {
		 console.log('nulled, none');
		 alert('One or more of your fields is empty.');
		 return;
	}

	return fetch(`${API_URL}/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: userData.username,
			email: userData.email,
			password: userData.password
		}),
	})
	.then(res => res.json())
	.then(result => {
		// handle response wherever called.
		return result;
	});
}

export function loginUser(userData) {
	if (!userData || !userData.username || !userData.password) {
		alert('One or more of your fields is empty.');
		return;
	}

	try {
		return fetch(`${API_URL}/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: userData.username,
					password: userData.password
				})
			})
		.then(res => res.json())
		.then(result => {
			return result;
		})	
	} catch (e) {
		console.log(e);
		return;
	}
}