import React from "react";
import $ from "jquery";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../redux/actions/setUserState';

// CSS
import './styles/LoginModal.scss';
import './styles/JoinModal.scss';

import * as userApi from '../api/userApi';

// Components

import { showJoinModal } from './JoinModal';

// Images/Icons

export function showLoginModal(bool) {
	const modalBg = document.getElementById('login-modal-bg');
	const modal = document.getElementById("login-modal");
	if (modalBg === undefined || modal === undefined) return;

	if (bool) {
		if (!modal.classList.contains('modal-active')) modal.classList.add('modal-active');
		if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
	} else {
		if (modal.classList.contains('modal-active')) modal.classList.remove('modal-active');
		if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
	}
}

$(document).mouseup(e => {
	var modalBg = $("#login-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showLoginModal(false);

})

function LoginModal(props) {

	const clearForm = () => {
		document.querySelectorAll('.login-input').forEach(input => {
			input.value = "";
		});
	}

	return (
		<div className="modal-bg" id="login-modal-bg">
			<div className="login-modal modal flex-col" id="login-modal">
	
				<div className="header-bar" />

				<div className="signup-form-col">
					<div className="title-text-container flex-col">
						<span className="title-text">LOGIN</span>
						<div className="underline" />
					</div>
					<div className="signup-form-container flex-col">
						<div className="input-field flex-col">
							<span className="signup-header">USERNAME</span>
							<input className="login-input" id="login-username-input" placeholder="Username" />
						</div>
						<div className="input-field flex-col">
							<span className="signup-header">PASSWORD</span>
							<input className="login-input" type="password" id="login-password-input" placeholder="Password" />
						</div>
						<button className="join-button" onClick={() => {
							const username = document.getElementById('login-username-input').value;
							const password = document.getElementById('login-password-input').value;

							if (username.length >= 3 && password.length >= 3) {
								const userData = {
									username,
									password,
								};
								try {
									userApi.loginUser(userData)
										.then(userState => {
											console.log(userState);
											props.setUserState(userState);
											window.location.reload();
										});
										clearForm();
									}
								catch (error) {
									// console.log(error);
								}
							} else {
								alert('Username and password must be 3-30 characters.')
							}
							}}
						>LOGIN</button>
					</div>

					<div className="login-modal-footer flex-col">
						<div className="no-account-signup">Not a member? 
							<span onClick={() => {
								showJoinModal(true);
								showLoginModal(false);
							}}>
								Join.
							</span>
						</div>
					</div>
				</div>
				<div className="footer-bar" />
			</div>
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

export default connect(mapStateToProps, matchDispatchToProps)(LoginModal);