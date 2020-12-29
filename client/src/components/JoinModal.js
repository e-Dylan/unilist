import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../redux/actions/setUserState';

import './styles/JoinModal.scss';

import * as api from '../api';

// Components

// Images/Icons
import featuresIcon from '../resources/join-modal/premium-membership/features-icon.svg';
import premiumIcon from '../resources/join-modal/premium-membership/premium-icon.svg';
import additionalConnectionsIcon from '../resources/join-modal/premium-membership/additional-connections.svg';
import mapIcon from '../resources/join-modal/premium-membership/map-icon.svg';
import checkmarkIcon from '../resources/join-modal/premium-membership/checkmark-icon.svg';

export function showJoinModal(bool) {
	const modalBg = document.getElementById('join-modal-bg');
	const modal = document.getElementById("join-modal");
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
	var modalBg = $("#join-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showJoinModal(false);

})

function JoinModal(props) {

	const [activeTab, setActiveTab] = useState('free');

	const setActiveMembershipTab = (buttonId) => {
		const clicked = document.getElementById(buttonId);
		
		const tabItems = document.querySelectorAll('.membership-button');
		tabItems.forEach(btn => {
			if (btn.classList.contains('button-active')) btn.classList.remove('button-active');
		});
	
		// enable this button.
		clicked.classList.add('button-active');
		
		setActiveTab(buttonId)
	}

	const clearForm = () => {
		document.querySelectorAll('.signup-input').forEach(input => {
			input.value = "";
		});
	}

	return (
		<div className="modal-bg" id="join-modal-bg">
			<div className="join-modal modal flex-row" id="join-modal">
	
				<div className="header-bar" />

				<div className="body-container flex-row">
					<div className="signup-form-col">
						<div className="title-text-container flex-col">
							<span className="title-text">JOIN UNILIST</span>
							<div className="underline" />
							<span className="desc-text">CONNECT INTERNATIONALLY</span>
						</div>
						<div className="membership-types">
							<div className="membership-button flex-col" id="free-membership-button" onClick={() => {setActiveMembershipTab("free-membership-button")}}>
								<span className="title-text">Free User: $0/month (free)</span>
								<span className="desc-text">Use limited features</span>
							</div>
							<div className="membership-button flex-col" id="active-membership-button" onClick={() => {setActiveMembershipTab("active-membership-button")}}>
								<span className="title-text">Active User: $7/month</span>
								<span className="desc-text">Many features, cancel at any time.</span>
							</div>
							<div className="membership-button flex-col" id="premium-membership-button" onClick={() => {setActiveMembershipTab("premium-membership-button")}}>
								<span className="title-text">Premium User: $12/month</span>
								<span className="desc-text">Full-access and support capabilities.</span>
							</div>
						</div>
						<div className="signup-form-container flex-col">
							<div className="input-field flex-col">
								<span className="signup-header">USERNAME</span>
								<input className="signup-input" id="username-input" placeholder="Username" />
							</div>
							<div className="input-field flex-col">
								<span className="signup-header">EMAIL</span>
								<input className="signup-input" id="email-input" placeholder="Email" />
							</div>
							<div className="input-field flex-col">
								<span className="signup-header">PASSWORD</span>
								<input className="signup-input" type="password" id="password-input" placeholder="Password" />
							</div>
							<div className="email-sub flex-row">
								<input className="input-checkbox" type="checkbox"></input>
								<span className="desc-text">Send me emails with live updates.</span>
							</div>
							<button className="join-button" onClick={() => {
								const username = document.getElementById('username-input').value;
								const email = document.getElementById('email-input').value;
								const password = document.getElementById('password-input').value;

								const userData = {
									username,
									email,
									password,
								};

								try {
									api.registerUser(userData)
										.then(res => {
											if (res && res.success) {
												api.loginUser({ username, password })
												.then(lres => {
													if (lres && lres.success) {
														props.setUserState({
															isLoggedIn: true,
															username: username,
															email: email,
															loading: false,
														});
														window.location.replace(api.DOMAIN_URL);
													} else if (lres && !lres.success) {
														alert(lres.msg);
													}
												})
												clearForm();
											} else if (res && !res.success) {
												alert(res.msg);
											}
										});
								} catch (error) {
									console.log(error);
									clearForm();
								}}}
							>JOIN</button>
						</div>
					</div>

					<div className="divider-center" />

					<div className="membership-col flex-col">
						<div className="membership-container">
							<div className="membership-tab-content flex-col">

								{ activeTab === "free-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">FREE MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Limited access to data and social posts.
										</div>
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">View school information and data ratings.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Read posts and comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Add your relevant updated data!</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Make account connections.</span>
											</li>
										</ul>
									</div>

								: activeTab === "active-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">ACTIVE MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Talk and share in a community of the like-minded.
										</div>
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Customize your own profile photo, bio, and more.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Instant access to live information.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" />
												<span className="li-text">Make public posts and leave comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={checkmarkIcon} />
												<span className="li-text">All features of free member.</span>
											</li>
										</ul>
									</div>

								: activeTab === "premium-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">PREMIUM MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Full access to live data and social networking.
										</div>
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" src={featuresIcon} />
												<span className="li-text">Premium access to all features.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image"  src={mapIcon} />
												<span className="li-text">Live-map access for all universities.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={additionalConnectionsIcon} />
												<span className="li-text">Additional profile connections.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={premiumIcon} />
												<span className="li-text">Premium badge on forum posts and comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={checkmarkIcon} />
												<span className="li-text">All features of active member.</span>
											</li>
										</ul>
									</div>
								
								:
									''
								}

								<div className="profile-photo-bar">
									Profiles:
								</div>
								<div className="payment-form">
									Payment:
								</div>
							</div>
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

export default connect(mapStateToProps, matchDispatchToProps)(JoinModal)
