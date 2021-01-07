import React, { useState, useEffect, useRef } from "react";
import '../styles/SearchArea.scss';
import '../styles/JoinModal.scss';

import * as yup from 'yup'; // Form validation
import { Formik, Form, Field, ErrorMessage } from 'formik';

// API
import * as userApi from '../../api/userApi';
import * as paymentApi from '../../api/paymentApi';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../../redux/actions/setUserState';

// Stripe
import { loadStripe } from '@stripe/stripe-js';


// Components
import ValidationInput from './ValidationInput';
import Checkbox from './Checkbox';

// Images/Icons

const stripePromise = loadStripe('pk_test_51I5ZHZBwwOafHU1RJC8oNmWQ0aTRjppGhPlkUYVz3FQolukVYg3GqHyUKyQigreTwkGIirEVu4aa6I7DI9jkLvT600WMlqeFQi');

export const clearSignupForm = () => {
	const signupInputs = document.querySelectorAll(item => {
		item.value = "";
	});
}

var registerSchema = yup.object().shape({
	username: yup.string().required('Enter a username to be known by.')
		.matches(
			/^[a-zA-Z0-9-_]{3,30}$/,
			"Must contain 3-30 characters and may only be alphanumeric."
		),
	email: yup.string().email().required('Please enter an email.'),
	password: yup.string().required()
	.matches(
		/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{3,30}$/,
		"Password must contain 3-30 characters and can be alphanumeric with special characters."
	),
	createdOn: yup.date().default(() => { return new Date() }),
});

function SignupForm(props) {

	const handleRegister = (userData) => {
		userApi.registerUser(userData)
		.then(res => {
			if (res && res.success) {
				var userData = { username: userData.username, password: userData.password }
				userApi.loginUser(userData)
					.then(userState => {
						props.setUserState(userState);
						console.log(userState);
					});
				clearSignupForm();
				window.location.reload();
			} else if (res && !res.success) {
				console.log('failed to register');
				alert(res.msg);
			}
		});
	}

	return (
		<div className="signup-form-container flex-col">
			<ValidationInput title="USERNAME" placeholder="Username" type="text" id="username-input" />
			<ValidationInput title="EMAIL" placeholder="Email" type="email" id="email-input" />
			<ValidationInput title="PASSWORD" placeholder="Password" type="password" id="password-input" />

			<Checkbox title={"Email me with live updates."} />
			<button className="join-button" onClick={ async() => {
				try {
					const userData = {
						username: document.getElementById('username-input').value,
						email: document.getElementById('email-input').value,
						password: document.getElementById('password-input').value,
					};
					// Validate registration form
					registerSchema.isValid(userData)
						.then(valid => {
							if (valid) {

							}
						})

					// Handle registration
					// handleRegister(userData);
					
					const stripe = await stripePromise;

					paymentApi.createCheckoutSession(props.stripePriceId)
						.then(session => {
							console.log(session);
							stripe.redirectToCheckout({
								sessionId: session.sessionId,
							})
							.then(stripe.handleResult);
						})
				} catch (error) {
					console.log(error);
					clearSignupForm();
				}}}
			>SIGNUP</button>
		</div>
	);
}

function mapStateToProps(globalState) {
	// Retrieve any data contained in redux global store.
	return {
		globalState
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ 
		setUserState: setUserState, 
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignupForm)