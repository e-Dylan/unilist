import { API_URL } from './userApi';
import { DOMAIN_URL } from './userApi';

export function createCheckoutSession({ priceId, customerEmail }) {
	return fetch(`${API_URL}/createCheckoutSession`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			priceId,
			customerEmail,
		}),
	})
	.then(result => {
		console.log(result);
		return result.json();
	})
}

export function getCheckoutSession(sessionId) {
	return fetch(`${API_URL}/getCheckoutSession?sessionId=`+sessionId, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then(res => {
		return res.json();
	});
}

export function goCustomerPortal(customerId) {
	return fetch(`${API_URL}/customerPortal`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({ customerId })
	})
	.then(res => res.json())
	.then(data => {
		return data;
	})
	.catch(err => console.log(err));	
}