import { Request, Response } from "express";

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51I5ZHZBwwOafHU1RLxwJmdLILEJczx2LBRhXDuFptzHsDj0R9pSXBNBKbbmUa1AgnqNi9BmwI1esI5MKwzuRbDZq00yLbT81aV');
const express = require('express');
const router = express.Router();

router.post("/createCheckoutSession", async (req: Request, res: Response) => {
	const { priceId } = req.body;

	try {
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
			  {
				price: priceId,
				quantity: 1,
			  },
			],
			// {CHECKOUT_SESSION_ID} is a string literal; do not change it!
			// the actual Session ID is returned in the query parameter when your customer
			// is redirected to the success page.
			// success_url: 'https://unilisted.com/success.html?session_id={CHECKOUT_SESSION_ID}',
			// cancel_url: 'https://unilisted.com/canceled.html',
			success_url: 'http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}',
			cancel_url: 'http://localhost:3000',
		});

		res.send({
			sessionId: session.id,
		});
	} catch (e) {
		res.status(400);
		return res.send({
			error: { 
				message: e.message,
			}
		});
	}
});

module.exports = router;