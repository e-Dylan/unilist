import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../redux/actions/setUserState';

import './styles/JoinModal.scss';

// Components
import SignupForm from './form/SignupForm';

// Images/Icons
// Free
import ratingsIcon from '../resources/join-modal/free-membership/ratings-icon.svg';
import readPostsIcon from '../resources/join-modal/free-membership/read-posts-icon.svg';
import addDataIcon from '../resources/join-modal/free-membership/add-data.svg';
// Active
import makePostsIcon from '../resources/join-modal/active-membership/make-posts-icon.svg';
// Premium
import featuresIcon from '../resources/join-modal/premium-membership/features-icon.svg';
import premiumIcon from '../resources/join-modal/premium-membership/premium-icon.svg';
import additionalConnectionsIcon from '../resources/join-modal/premium-membership/additional-connections.svg';
import mapIcon from '../resources/join-modal/premium-membership/map-icon.svg';
import checkmarkIcon from '../resources/join-modal/premium-membership/checkmark-icon.svg';

// STRIPE MEMBERSHIP PRICE ID'S
const freePriceId = 'price_1I5cSXBwwOafHU1RVnITRrD8';
const activePriceId = 'price_1I5c5GBwwOafHU1RaqmF4g6d';
const premiumPriceId = 'price_1I5c6FBwwOafHU1RrFlNcYXr';

export function showJoinModal(bool) {
	const modalBg = document.getElementById('join-modal-bg');
	const modal = document.getElementById('join-modal');
	
	const emailInput = document.getElementById('signup-form-joinbutton');
	const emailInputModal = document.getElementById('email-input');

	if (modalBg === undefined || modal === undefined) return;

	if (bool) {
		if (!modal.classList.contains('modal-active')) modal.classList.add('modal-active');
		if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
	} else {
		if (modal.classList.contains('modal-active')) modal.classList.remove('modal-active');
		if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
	}
	
	if (emailInput.value.length > 0)
		emailInputModal.value = emailInput.value;
		emailInput.value = "";
}

$(document).mouseup(e => {
	var modalBg = $("#join-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showJoinModal(false);

})

function JoinModal(props) {

	const [activeTab, setActiveTab] = useState('free-membership-button');
	const [stripePriceId, setStripePriceId] = useState(freePriceId);

	const setActiveMembershipTab = (buttonId) => {
		const clicked = document.getElementById(buttonId);
		
		const tabItems = document.querySelectorAll('.membership-button');
		tabItems.forEach(btn => {
			if (btn.classList.contains('button-active')) btn.classList.remove('button-active');
		});
	
		// enable this button.
		clicked.classList.add('button-active');
		
		setActiveTab(buttonId)
		
		// Set active price id when changing membership tabs.
		switch(buttonId) {
			case "free-membership-button": setStripePriceId(freePriceId); break;
			case "active-membership-button": setStripePriceId(activePriceId); break;
			case "premium-membership-button": setStripePriceId(premiumPriceId); break;
		}

		// const joinButton = document.querySelector('.join-button');
		// joinButton.disabled = (buttonId !== "free-membership-button");
		// if (joinButton.disabled) 
		// 	joinButton.classList.add('button-disabled') 
		// else 
		// 	joinButton.classList.remove('button-disabled');

		// console.log(joinButton.disabled);
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
							<div className="membership-button button-active flex-col" id="free-membership-button" onClick={() => {setActiveMembershipTab("free-membership-button")}}>
								<span className="title-text">Free User: $0/month (free)</span>
								<span className="desc-text">Use limited features</span>
							</div>
							<div className="membership-button flex-col" id="active-membership-button" onClick={() => {setActiveMembershipTab("active-membership-button")}}>
								<span className="title-text">Active User: $7/month</span>
								<span className="desc-text">Many features, cancel at any time.</span>
							</div>
							<div className="membership-button flex-col" id="premium-membership-button" onClick={() => {setActiveMembershipTab("premium-membership-button")}}>
								<span className="title-text">Premium User: $15/month</span>
								<span className="desc-text">Full-access and support capabilities.</span>
							</div>
						</div>

						<SignupForm stripePriceId={stripePriceId} />
						
					</div>

					<div className="divider-center" />

					<div className="membership-col flex-col">
						<div className="membership-container">
							<div className="membership-tab-content flex-col">

								{ activeTab === "free-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">FREE MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Limited access to live data and social posts.
										</div>
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" src={ratingsIcon} alt="" />
												<span className="li-text">View school information and data ratings.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={readPostsIcon} alt="" />
												<span className="li-text">Read posts and comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={addDataIcon} alt="" />
												<span className="li-text">Add your relevant updated data!</span>
											</li>
										</ul>
									</div>

								: activeTab === "active-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">ACTIVE MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Talk and share in a community of the like-minded.
										</div>

										{/* <div className="not-available-bar">
											NOT CURRENTLY AVAILABLE.<br /><br />
											APP IS FREE WHILE I DEVELOP USER INTERACTION, SOCIAL ABILITIES, AND ADDITIONAL FEATURES.<br /><br />
											ENJOY FREEMIUM WHILE IT LASTS.
										</div> */}
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" alt="" />
												<span className="li-text">Customize your own profile photo, bio, and more.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt="" />
												<span className="li-text">Instant access to live information.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={makePostsIcon} alt="" />
												<span className="li-text">Make public posts and leave comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt="" src={checkmarkIcon} />
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

										{/* <div className="not-available-bar">
											NOT CURRENTLY AVAILABLE.<br /><br />
											APP IS FREE WHILE I DEVELOP USER INTERACTION, SOCIAL ABILITIES, AND ADDITIONAL FEATURES.<br /><br />
											ENJOY FREEMIUM WHILE IT LASTS.
										</div> */}
										
										<ul className="feature-list">
											<li className="li-feature flex-row">
												<img className="li-image" alt="" src={featuresIcon} />
												<span className="li-text">Premium access to all features.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt=""  src={mapIcon} />
												<span className="li-text">Live-map access for all universities.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt="" src={additionalConnectionsIcon} />
												<span className="li-text">Additional profile connections.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt="" src={premiumIcon} />
												<span className="li-text">Premium badge on forum posts and comments.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" alt="" src={checkmarkIcon} />
												<span className="li-text">All features of active member.</span>
											</li>
										</ul>
									</div>
								
								:
									''
								}

								{/* <div className="profile-photo-bar">
									Profiles:
								</div> */}
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
