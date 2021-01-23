import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import theme from '../../../styles/theme';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../../../redux/actions/setUserState';

import '../../styles/JoinModal.scss';

// Components
import SignupForm from '../../form/SignupForm';

import IconButton from '../../Button/IconButton';
import { Icon } from '@chakra-ui/react';
import { AiOutlineCloseCircle } from "react-icons/ai";

// Styled Components
import { JoinModalContainer, ModalBodyContainer, SignupTitleContainer, 
		 ModalColumn, HeaderBar, CloseButtonContainer, 
		 FooterBar, DisclaimerCard 
} from './JoinModal.components';

// API
import * as paymentApi from '../../../api/paymentApi';

// Images/Icons
// Free
import ratingsIcon from '../../../resources/join-modal/free-membership/ratings-icon.svg';
import readPostsIcon from '../../../resources/join-modal/free-membership/read-posts-icon.svg';
import addDataIcon from '../../../resources/join-modal/free-membership/add-data.svg';
// Active
import makePostsIcon from '../../../resources/join-modal/active-membership/make-posts-icon.svg';
import liveInformationIcon from '../../../resources/join-modal/active-membership/live-data.svg';
import profileIcon from '../../../resources/join-modal/active-membership/profile-icon.svg';
// Premium
import featuresIcon from '../../../resources/join-modal/premium-membership/features-icon.svg';
import premiumIcon from '../../../resources/join-modal/premium-membership/premium-icon.svg';
import additionalConnectionsIcon from '../../../resources/join-modal/premium-membership/additional-connections.svg';
import mapIcon from '../../../resources/join-modal/premium-membership/map-icon.svg';
import checkmarkIcon from '../../../resources/join-modal/premium-membership/checkmark-icon.svg';

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
	
	if (emailInput.value.length > 0) {
		if (window.signupFormRef !== null && window.signupFormRef.current) {
			window.signupFormRef.current.setFieldValue("email", emailInput.value, true);
			emailInput.value = "";
		}
	}
}

$(document).mouseup(e => {
	var modalBg = $("#join-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showJoinModal(false);

	return;
})

function JoinModal(props) {

	const [activeTab, setActiveTab] = useState('free-membership-button');
	const [priceId, setPriceId] = useState(paymentApi.priceIds.freePriceId);

	const setActiveMembershipTab = (buttonId) => {
		const clicked = document.getElementById(buttonId);
		
		const tabItems = document.querySelectorAll('.signup-membership-button');
		tabItems.forEach(btn => {
			if (btn.classList.contains('button-active')) btn.classList.remove('button-active');
		});
	
		// enable this button.
		clicked.classList.add('button-active');
		
		setActiveTab(buttonId)
		
		// Set active price id when changing membership tabs.
		switch(buttonId) {
			case "free-membership-button": setPriceId(paymentApi.priceIds.freePriceId); break;
			case "active-membership-button": setPriceId(paymentApi.priceIds.activePriceId); break;
			case "premium-membership-button": setPriceId(paymentApi.priceIds.premiumPriceId); break;
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
			<JoinModalContainer className="modal" id="join-modal">
	
				<HeaderBar />

				<ModalBodyContainer>
					<ModalColumn>
						<SignupTitleContainer>
							<span className="signup-title-text">JOIN UNILIST</span>
							<CloseButtonContainer>
								<IconButton pos="absolute" right="30px" top="20px" icon={AiOutlineCloseCircle} size="40px" color="#a83256" onClick={() => {
									showJoinModal(false);
								}} />
							</CloseButtonContainer>
							<div className="signup-underline" />
							<span className="signup-desc-text">CONNECT INTERNATIONALLY</span>
							
						</SignupTitleContainer>
						<div className="signup-membership-types">
							<div className="signup-membership-button button-active flex-col" id="free-membership-button" onClick={() => {setActiveMembershipTab("free-membership-button")}}>
								<span className="signup-title-text">Free User: $0/month (free)</span>
								<span className="signup-desc-text">Use limited features</span>
							</div>
							<div className="signup-membership-button flex-col" id="active-membership-button" onClick={() => {setActiveMembershipTab("active-membership-button")}}>
								<span className="signup-title-text">Active User: $7/month</span>
								<span className="signup-desc-text">Many features, cancel at any time.</span>
							</div>
							<div className="signup-membership-button flex-col" id="premium-membership-button" onClick={() => {setActiveMembershipTab("premium-membership-button")}}>
								<span className="signup-title-text">Premium User: $15/month</span>
								<span className="signup-desc-text">Full-access and support capabilities.</span>
							</div>
						</div>

						<SignupForm priceId={priceId} priceIds={paymentApi.priceIds} />
						
					</ModalColumn>

					<div className="divider-center" />

					<ModalColumn bg={theme.colors.brand.gray["light"]}>
						<div className="membership-container">
							<div className="membership-tab-content flex-col">

								{ activeTab === "free-membership-button" ?
									<div className="membership-tab-content flex-col">
										<span className="title-text">FREE MEMBERSHIP</span>
										<div className="membership-subtitle flex-row">
											Limited access to live data and social posts.
										</div>
										<div className="info-bar">
											No credit card. Upgrade whenever.
										</div>
										<ul className="feature-list shadow">
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

										<DisclaimerCard />

										{/* <div className="not-available-bar">
											NOT CURRENTLY AVAILABLE.<br /><br />
											APP IS FREE WHILE I DEVELOP USER INTERACTION, SOCIAL ABILITIES, AND ADDITIONAL FEATURES.<br /><br />
											ENJOY FREEMIUM WHILE IT LASTS.
										</div> */}
										
										<ul className="feature-list shadow">
											<li className="li-feature flex-row">
												<img className="li-image" src={profileIcon} alt="" />
												<span className="li-text">Customize your own profile photo, bio, and more.</span>
											</li>
											<li className="li-feature flex-row">
												<img className="li-image" src={liveInformationIcon} alt="" />
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

										<DisclaimerCard />
										
										<ul className="feature-list shadow">
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
											{/* <li className="li-feature flex-row">
												<img className="li-image" alt="" src={checkmarkIcon} />
												<span className="li-text">All features of active member.</span>
											</li> */}
										</ul>
									</div>
								
								:
									''
								}

								{/* <div className="profile-photo-bar">
									Profiles:
								</div> */}
							</div>
						</div>
					</ModalColumn>
				</ModalBodyContainer>
				<FooterBar />
			</JoinModalContainer>
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
