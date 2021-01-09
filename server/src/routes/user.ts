import { getRepository, getConnection, getManager } from "typeorm";
import { Request, Response, Next } from "express";
import { User } from '../entity/User';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const register_schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ca', 'co', 'io', 'app', 'shop', 'xyz']}})
        .required(),
		
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{3,30}$'))
		.required(),
});

router.post('/isLoggedIn', async (req: Request, res: Response, next: Next) => {
	if (req.session) {
		if (req.session.userID) {

			const manager = getManager();
			const user = await manager.findOne(User, req.session.userID); 

			res.json({
				success: true,
				username: user.username,
				email: user.email,
				message: `Welcome ${user.username}`
			});

			console.log(`[/api/isLoggedIn]: User ${user.username} has connected.`);
			return;
		} else {
			res.json({
				success: false,
				message: "User is not logged in.",
			});
			console.log(`[/api/isLoggedIn]: Guest user Anon has connected.`);
			return;
		}
	} else {
		res.json({
			success: false,
			msg: "User is not logged in, no session is available."
		});
		return;
	}
});

router.post('/register', async (req: Request, res: Response, next: Next) => {

	console.log(req.body);

	var { username, email, password, customerId } = req.body;

	const valid = await register_schema.validate(req.body);
	if (valid.error === undefined) {
		var hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		getConnection().transaction(async connection => {

			const userRepo = getRepository(User);
			const user = await userRepo.create({
				username,
				email,
				password: hashed_password,
				stripe_customer_id: customerId,
			});
			await userRepo.save(user)
			.then(data => {
				if (customerId === undefined) {
					// Must be free membership
					console.log(`[/api/register]: Successfully registered FREE user: ${username}.\nCustomerId: None.\n\n`);
					res.json({
						success: true,
						msg: `Successfully registered user ${username}.`,
						username: username,
					});
					return;
				} else {
					// Either paid or free.
					console.log(`[/api/register]: Successfully registered user: ${username}.\nCustomerId: ${customerId}.\n\n`);
					res.json({
						success: true,
						msg: `Successfully registered user ${username}.`,
						username: username,
					});
					return;
				}
			})
			.catch((error: any) => {
				console.log(error);
				res.json({
					success: false,
					msg: `[/api/register]: Failed to register user ${username}. Database insertion error.`
				})
				return;
			});
		})

	} else {
		// JOI schema failed.
		if (customerId) {
			// Paid user, failed joi schema -> front-end handles assistance.
			console.log(`[/register]: Customer id token failed JOI auth schema.`);
			res.json({
				success: false,
				msg: "Registration unsuccessful: customerId broke joi schema",
			})
			return;
		} else {
			// Free user -> form invalid.
			console.log(`[/register]: Failed to register user. Invalid field credientials.`);
			res.json({
				success: false,
				msg: "Registration unsuccessful, all fields must be alphanumeric and between 3-30 characters."
			});
			return;
		}
		
	}
});

router.post('/login', async (req: Request, res: Response) => {
	console.log("session id: " + req.session.id);

	var { username, password } = req.body;
	console.log(`[/login] Attempting to login user:\n\nusername: ${username}\n`);
	username = username.toLowerCase();

	// User login info validation
	if (username.length > 35 || password.length > 45) {
		res.json({
			success: false,
			msg: 'Fields must be shorter than 35 characters and must be alphanumeric (no special characters).'
		});
		return;
	}

	const userRepo = getRepository(User);
	const user = userRepo.findOne({
		where: [
			{ username: username }
		]
	})
	.then(user => {
		if (user) {
			// Compare passwords.
			console.log(user);

			bcrypt.compare(password, JSON.parse(user.password), (bcryptErr, verified) => {
				if (verified) {
					// User validated
					req.session.userID = user.id;
					req.session.save(err => {
						if (err) console.log(err);
					});
					const userData = {
						username: user.username,
						email: user.email,
						session: req.session,
					}
					console.log(`User successfully logging in: ${JSON.stringify(userData, null, 4)}`);

					res.json({
						success: true,
						msg: `Welcome ${username}.`,
						username: username
					});
					return;
				} else {
					// Wrong password/username
					res.json({
						success: false,
						msg: 'Password is not correct for this username',
					});
				}
			})
		} else {
			// User doesn't exist.
			res.json({
				success: false,
				msg: "User doesn't exist, this username is available to register."
			});
			return;
		}
	})
});

router.post('/logout', (req: Request, res: Response, next: Next) => {
	if (req.session && req.session.userID) {
		// User is logged in, terminate session
		const sessionId = req.session.userID;
		req.session.destroy();
		console.log(`[/api/logout]: User successfully logged out.`);
		
		res.json({
			success: true,
			msg: "Successfully logged out.",
		});
		return true;
	} else {
		console.log('Guest user tried and failed to logout: no session ID.');
		res.json({
			success: false,
			msg: "Not logging out: user was not logged in.",
		});
		return false;
	}
});

router.post('/getCustomerId', async (req: Request, res: Response) => {
	if (req.session) {
		if (req.session.userID) {

			const manager = getManager();
			const user = await manager.findOne(User, req.session.userID); 

			if (user) {
				console.log(`[/api/getCustomerId]: Returning customerId for user ${user.username}.`);

				res.json({
					success: true,
					username: user.username,
					customerId: user.stripe_customer_id,
					msg: `Returned Stripe customer id for ${user.username}.`
				});
				return;
			} else {
				res.json({
					success: false,
					msg: `Couldn't find user with this userId. No customer exists.`
				});
				return;
			}
		} else {
			// No user id, user is not logged in.
			res.json({
				success: false,
				msg: "Could not return customerId, user is not logged in."
			});
			return;
		}
		
	} else {
		// Session doesn't exist, error occured.
		res.json({
			success: false,
			msg: "User session didn't exist, error occured.",
		})
	}
})

module.exports = router;