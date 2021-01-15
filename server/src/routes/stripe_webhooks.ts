import { Request, Response } from "express";
import { getRepository, getConnection, getManager } from "typeorm";
import { isThisTypeNode } from "typescript";
import { User } from '../entity/User';

const fetch = require('node-fetch');

const express = require('express');
const router = express.Router();

router.post('/webhook', (req: Request, res: Response ) => {
	try {
		var event = req.body;

		getConnection().transaction(async connection => {
			const manager = getManager();
			// // Handle the event
			switch (event.type) {
				case 'payment_intent.succeeded':
					// const paymentIntent = event.data.object;
					// console.log(paymentIntent);
					// Then define and call a method to handle the successful payment intent.
					// handlePaymentIntentSucceeded(paymentIntent);
					break;
				case 'payment_method.attached':
					// const paymentMethod = event.data.object;
					// console.log(paymentMethod);
					// Then define and call a method to handle the successful attachment of a PaymentMethod.
					// handlePaymentMethodAttached(paymentMethod);
					break;
				
				// Handle completed subscription checkout, store customerId in database.
				case 'checkout.session.completed':
					console.log("CHECKOUT SESSION COMPLETED")
					const checkoutSession = event.data.object;
					console.log(checkoutSession);
					const customerId = checkoutSession.customer;
					const subscriptionId = checkoutSession.subscription;
					const email = checkoutSession.customer_email;

					manager.findOne(User, { email: email })
						.then(user => {
							if (user && customerId && subscriptionId) {
								// user exists in database with this email that was successfully subscribed with,
								// insert customerId for them.
								user.stripe_customer_id = customerId;
								user.stripe_sub_id = subscriptionId;
								manager.save(user)
									.then(data => {
										console.log('[STRIPE_WEBHOOK]: Saving new member as user:\n\n', data);
									})
							} else {
							}
					})

					break;

				default:
					console.log(`Unhandled event type ${event.type}`);
			}

		});
	} catch (err) {
		console.log(err);
	}
  
	// Return a response to acknowledge receipt of the event
	res.json({received: true});
});

module.exports = router;