import { Request, Response } from "express";

const fetch = require('node-fetch');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51I5ZHZBwwOafHU1RLxwJmdLILEJczx2LBRhXDuFptzHsDj0R9pSXBNBKbbmUa1AgnqNi9BmwI1esI5MKwzuRbDZq00yLbT81aV');

const express = require('express');
const router = express.Router();

router.post("/createCheckoutSession", async (req: Request, res: Response) => {
	const { priceId, customerEmail } = req.body;

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
			customer_email: customerEmail,
			// {CHECKOUT_SESSION_ID}
			// sessionId is returned in the query parameter when customer is redirected to success page.
			success_url: `${process.env.DOMAIN_DEVELOPMENT_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`, // change to prod domain
			cancel_url: `${process.env.DOMAIN_DEVELOPMENT_URL}/cancel.html?session_id={CHECKOUT_SESSION_ID}`,
		});

		console.log('[/api/payment]: Received request to checkout, redirecting to stripe checkout portal.');
		res.send({
			sessionId: session.id,
		});
	} catch (e) {
		console.log(e);
		res.status(400);
	}
});

router.get('/getCheckoutSession', async (req: Request, res: Response) => {
	const { sessionId } = req.query;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	res.json(session);
});

router.post('/customerPortal', async (req: Request, res: Response) => {
	const { customerId } = req.body;

	const portalsession = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: process.env.DOMAIN_DEVELOPMENT_URL,
	});

	res.send({
		url: portalsession.url,
	});
});

router.post('/checkUserSubscription', async (req: Request, res: Response) => {

	// fetch()

});

module.exports = router;