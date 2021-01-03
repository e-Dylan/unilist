import { API_URL } from './userApi';
import { DOMAIN_URL } from './userApi';

export function createCheckoutSession(priceId) {
	return fetch(`${API_URL}/createCheckoutSession`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			priceId: priceId,
		}),
	})
	.then(result => {
		return result.json();
	})
}