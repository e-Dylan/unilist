// API URLS
export const API_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_API_URL : process.env.REACT_APP_PRODUCTION_API_URL

export const DOMAIN_URL = process.env.NODE_ENV === "development" ?
	process.env.REACT_APP_DEVELOPMENT_DOMAIN_URL : process.env.REACT_APP_PRODUCTION_DOMAIN_URL
	
console.log("NODE_ENV: ", process.env.NODE_ENV);	
console.log('API_URL: ', API_URL);
console.log('DOMAIN_URL: ', DOMAIN_URL);

// USER AUTH API CALLS
export function registerUser(userData) {

	// FORM WAS INVALID -> SHOULDN'T BE ABLE TO HAPPEN
	if (!userData || !userData.username || !userData.email || !userData.password) {			// User signed up free membership, no stripe session, had invalid registration info.
		console.log('nulled, none');
		alert('Registration information was invalid. Contact support at unilistmail@gmail.com if needed.');
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
			password: userData.password,
			customerId: userData.customerId,
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
		var userState;
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
			alert(result.msg);
			if (result && result.success === true) {
				userState = {
					isLoggedIn: true,
					username: result.username,
					loading: false,
				}
			} else {
				userState = {
					loading: false,
				};
			}
			console.log(userState);
			return userState;
		})	
	} catch (e) {
		console.log(e);
		return;
	}
}

export function logoutUser() {
	console.log('logging');
	try {
		var userState;
		return fetch(`${API_URL}/logout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(res => res.json())
		.then(result => {
			try {
				if (result && result.success) {
					// user is logged in
					userState = {
						username: "",
						email: "",
						isLoggedIn: false,
						loading: false,
					}
				} else { 
					// user isn't logged in on the page
					userState = {
						loading: false,
					}
				}
			} catch(e) {
				userState = {
					loading: false,
				}
			}
			return userState;
		});
	} catch (e) {
		console.log(e);
		return;
	}
}

export const checkIsLoggedIn = () => {
	return fetch(`${API_URL}/isLoggedIn`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
	.then(res => res.json())
	.then(result => {
		var userState;
		if (result.success) {
			// User is logged in.
			userState = {
				isLoggedIn: true,
				username: result.username,
				email: result.email,
				loading: false,
			}
		} else {
			// Not logged in.
			userState = {
				isLoggedIn: false,
				username: "",
				email: "",
				loading: false, 
			};
		}
		return userState;
	})
}

export function getCustomerId() {
	return fetch(`${API_URL}/getCustomerId`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
	.then(res => res.json())
	.then(data => {
		return data;
	})
}

export function getMembership(user) {
	return fetch(`${API_URL}/getMembership`, {
		method: "POST",
		credentials: 'include',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user),
	})
	.then(res => {
		return res.json();
	})
}
