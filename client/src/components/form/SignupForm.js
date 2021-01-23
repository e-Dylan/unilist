import React, { useState, useEffect, useRef, createRef } from "react";
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
import { showJoinModal } from "../Modals/JoinModal/JoinModal";

// Images/Icons

const stripePromise = loadStripe('pk_test_51I5ZHZBwwOafHU1RJC8oNmWQ0aTRjppGhPlkUYVz3FQolukVYg3GqHyUKyQigreTwkGIirEVu4aa6I7DI9jkLvT600WMlqeFQi');

export const clearSignupForm = () => {
	const signupInputs = document.querySelectorAll('.signup-input');
	signupInputs.forEach(item => {
		item.value = "";
	});
}

var signupSchema = yup.object().shape({
	username: yup.string().required('Enter a username to be known by.')
		.matches(
			/^[a-zA-Z0-9-_]{3,30}$/,
			"Must contain 3-30 characters and may only be alphanumeric."
		),
	email: yup.string().email('Invalid emails are forbidden - fakes are fine.').required('Please enter an email.'),
	password: yup.string().required('Please enter a password.')
	.matches(
		/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{3,30}$/,
		"Password must contain 3-30 characters and can be alphanumeric with special characters."
	),
	createdOn: yup.date().default(() => { return new Date() }),
});

window.signupFormRef = createRef();

function SignupForm(props) {

	const handleRegister = (userData) => {
		return new Promise((resolve, reject) => {
			userApi.registerUser(userData)
			.then(res => {
				// Register user
				// alert(`[/api/register]: RESPONSE: ${res.msg}`);
				if (res && res.success) {
					showJoinModal(false);
					clearSignupForm();
					userApi.loginUser(userData)
						.then(userState => {
							// Automatically login when registerd
							props.setUserState(userState);
							console.log(userState);
							resolve();
						});
					// window.location.reload();
				} else if (res && !res.success) {
					console.log('failed to register');
					alert(res.msg);
					reject();
				} else {
					reject();
				}
			});
		})
		
	}

	const initialValues = {
		username: "",
		email: "",
		password: ""
	};

	const successfulSubmit = async (userData) => {
			try {
				// Check if user is signing up for free -> register them without stripe session
				if (props.priceId === props.priceIds.freePriceId ) {
					
					handleRegister(userData);
				} else {
					// User signing up with paid price id, make stripe session.
					const stripe = await stripePromise;
					paymentApi.createCheckoutSession({
						priceId: props.priceId,
						customerEmail: userData.email,
					})
					.then(session => {
						// Register user with just user data, email matches the stripe customer email.
						// Find completed checkout event by webhook, assign their customerid to
						// their user in db by this email.
						handleRegister(userData)
							.then(() => {
								// Wait for registration, then auto-logging in to complete, then checkout
								stripe.redirectToCheckout({ sessionId: session.sessionId })
								.then(stripe.handleResult);
							})

						
					})
				}
			} catch (error) {
				console.log(error);
				clearSignupForm();
			}
	}

	return (
		<Formik 
			initialValues={initialValues}
			validationSchema={signupSchema}
			onSubmit={successfulSubmit}
			innerRef={window.signupFormRef}
		>

			{(formik) => {

				const { errors, touched, isValid, dirty, setFieldValue } = formik;
				return (
					<div className="signup-form-container flex-col">
						<Form className="signup-form flex-col">
							{/* <ValidationInput title="USERNAME" placeholder="Username" type="text" id="username-input" />
							<ValidationInput title="EMAIL" placeholder="Email" type="email" id="email-input" />
							<ValidationInput title="PASSWORD" placeholder="Password" type="password" id="password-input" /> */}

							<div className="form-row">
								{/* <label htmlFor="username" className="signup-header">USERNAME</label> */}
								<Field type="text" placeholder="Username" name="username" id="username-input" className="signup-input" />
								<ErrorMessage name="username" component="span" className="error" />
							</div>
							<div className="form-row">
								{/* <label htmlFor="username" className="signup-header">EMAIL</label> */}
								<Field type="email" placeholder="Email" name="email" id="email-input" className="signup-input" />
								<ErrorMessage name="email" component="span" className="error" />
							</div>
							<div className="form-row">
								{/* <label htmlFor="username" className="signup-header">PASSWORD</label> */}
								<Field type="password" placeholder="Password" name="password" id="password-input" className={errors.password && touched.password ? "signup-input input-error" : "signup-input"} />
								<ErrorMessage name="password" component="span" className="error" />
							</div>


							<Checkbox title={"Email me with live updates."} />
							<button className={!(dirty && isValid) ? "button-disabled join-button" : "join-button"} disabled={!(dirty && isValid)} type="submit">SIGNUP</button>
						</Form>
					</div>
				);
			}}
		</Formik>
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