import React, { useEffect, useState, useRef } from "react";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserState } from '../redux/actions/setUserState';

// CSS
import './styles/HomePage.scss';

import * as THREE from 'three'
import BIRDS from 'vanta/dist/vanta.birds.min'

// Components
import JoinModal, { showJoinModal } from "./Modals/JoinModal/JoinModal";
import LoginModal, { showLoginModal } from "./Modals/LoginModal/LoginModal";
import FeedbackModal from './Modals/FeedbackModal/FeedbackModal';

import * as userApi from '../api/userApi';
import * as paymentApi from '../api/paymentApi';

// Images/Icons
import unilistLogo from '../resources/logo/unilist-logo.png';
import cityIcon from '../resources/homepage/city-icon.png';
import networkIcon from '../resources/homepage/network-icon.svg';
import floatingUniversity from '../resources/homepage/university-svgs/floating-university.png';
// account
import profileIcon from '../resources/homepage/account/empty-profile-photo.png';

function HomePage(props) {

	const [vantaEffect, setVantaEffect] = useState(0)
	const vantaRef = useRef(null)

	const subData = props.globalState.userState.subscriptionData;

	const toggleAccountDropdown = () => {
		const accDropdown = document.querySelector('.user-account-dropdown');
		const userAccButton = document.querySelector('.user-account-button');

		if (accDropdown.classList.contains('user-account-dropdown-open')) {
			accDropdown.classList.remove('user-account-dropdown-open');
			userAccButton.classList.remove('user-account-button-open')
		} else {
			accDropdown.classList.add('user-account-dropdown-open');
			userAccButton.classList.add('user-account-button-open')
		}
	}

	useEffect(() => {
		// Init Vanta
		if (!vantaEffect) {
			setVantaEffect(BIRDS({
				el: vantaRef.current,
				THREE: THREE,
				color1: 0xffc1df,
				color2: 0xe1bea6,
				birdSize: 0.80,
				speedLimit: 3.00,
				separation: 75.00,
				alignment: 11.00,
				cohesion: 7.00,
				quantity: 2.00,
				backgroundAlpha: 0,
			}))
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy()
		}
	}, [vantaEffect])

	useEffect(() => {
		userApi.checkIsLoggedIn()
			.then(userState => {
				props.setUserState(userState);

				// Authenticate membership
				userApi.getMembership(userState)
					.then(subscriptionData => {
						props.setUserState({
							...userState,
							subscriptionData,
						});
						// console.log({
						// 	...userState,
						// 	...subscriptionData,
						// });
					});
			});
	}, [])

  return (
    <div className="homepage-container">
		<JoinModal />
		<LoginModal />
		<FeedbackModal />
		<div className="vanta-bg" ref={vantaRef}></div>
		<div className="homepage-image-container flex-col">
			<a className="homepage-logo" href="/" >	
				<img src={unilistLogo} alt="Logo" />
			</a>
			{ !props.globalState.userState.isLoggedIn ?
				<button className="login-button unilist-button" onClick={() => showLoginModal(true)}>
					Login
				</button>
			:
				<div className="user-account flex-col">
					<div className="user-account-button flex-row" onClick={() => {
						toggleAccountDropdown();
					}}>
						<span className="user-account-username">{props.globalState.userState.username}</span>
						<img className="user-account-image" src={profileIcon} />
					</div>
					<div className="user-account-dropdown flex-col">
						<div className="dropdown-item">Settings</div>
						<div className="dropdown-item">Profile</div>

						{ subData !== undefined && subData.subscription_status === "active" ?
							<div className="dropdown-item" onClick={() => {
								// implement once fetching user customer id is implemented
								// save to db with webhook on register.
								// only show this for paid members.
								userApi.getCustomerId()
								.then(data => {
									paymentApi.goCustomerPortal(data.customerId)
									.then(data => {
										// console.log('Getting customer portal...');
										window.location.href = data.url;
									})
								})
							}}>Manage Subscriptions</div>

						: subData !== undefined && subData.subscription_status !== "active" ?
							// User must be logged in to see this window, therefore they are a free member.
							<div className="dropdown-item" onClick={() => {
								
							}}>Signup for a Membership</div>
						:
								''
						}

						<div className="dropdown-item" onClick={() => {
							userApi.logoutUser()
								.then(userState => {
									props.setUserState(userState);
									window.location.reload();
								})
						}}>Logout</div>
					</div>
				</div>
			}
			{/* <div className="floating-background">
				<img src={floatingUniversity} />
			</div> */}
			<div className="main-content-container container-center flex-row">
				<div className="main-text flex-col">
					<span className="title-text">
						<img className="in-text-image" src={cityIcon} alt="title logo" /> Find your spot.
					</span>
					<span className="desc-text">Join the community of students and broaden your opportunities.</span>
				</div>
				<div className="main-signup flex-row">
					<div className="signup-form flex-col">
						<div className="signup-container flex-col">
							<div className="main-image flex-col">
								<img src={networkIcon} alt="network icon" />
							</div>
							<div className="signup-text">Join your community.</div>
							<input className="signup-input" id="signup-form-joinbutton" placeholder="enter your email" />
							<button className="signup-button" onClick={() => showJoinModal(true)}>Join</button>
						</div>
						
					</div>
				</div>
			</div>
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

export default connect(mapStateToProps, matchDispatchToProps)(HomePage)