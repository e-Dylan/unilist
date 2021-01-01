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

router.post('/isLoggedIn', (req: Request, res: Response, next: Next) => {
	
});

router.post('/register', (req: Request, res: Response, next: Next) => {

	console.log(req.body);

	var { username, email, password } = req.body;

	const valid = register_schema.validate(req.body);
	if (valid.error === undefined) {
		var hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		getConnection().transaction(async connection => {

			const userRepo = getRepository(User);
			const user = await userRepo.create({
				username,
				email,
				password: hashed_password
			});
			await userRepo.save(user)
			.catch((error: any) => {
				console.log(error);
				res.json({
					success: false,
					msg: `[/register]: Failed to register user ${username}. Database insertion error.`
				})
				return;
			});

			console.log(`[/register]: Successfully registered user: ${username}\n\n`);
			res.json({
				success: true,
				msg: `Successfully registered user ${username}.`,
				username: username,
			});
			return;
		})

	} else {
		console.log(`[/register]: Failed to register user. Invalid field credientials.`);
		res.json({
			success: false,
			msg: "Registration unsuccessful, all fields must be alphanumeric and between 3-30 characters."
		});
		return;
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


module.exports = router;