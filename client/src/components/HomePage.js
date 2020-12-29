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
import JoinModal, { showJoinModal } from "./JoinModal";
import LoginModal, { showLoginModal } from "./LoginModal";

// Images/Icons
import unilistLogo from '../resources/logo/unilist-logo.png';
import cityIcon from '../resources/homepage/city-icon.png';
import networkIcon from '../resources/homepage/network-icon.svg';

function HomePage(props) {

	const [vantaEffect, setVantaEffect] = useState(0)
	const vantaRef = useRef(null)

	useEffect(() => {
		// Init Vanta
		if (!vantaEffect) {
			setVantaEffect(BIRDS({
				el: vantaRef.current,
				THREE: THREE,
				minHeight: 200.00,
				minWidth: 200.00,
				color1: 0xffc1df,
				color2: 0xe1bea6,
				colorMode: "lerpGradient",
				birdSize: 0.80,
				wingSpan: 35.00,
				speedLimit: 3.00,
				separation: 75.00,
				alignment: 11.00,
				cohesion: 7.00,
				quantity: 3.00,
				backgroundAlpha: 0.00
			}))
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy()
		}
	}, [vantaEffect])

  return (
    <div className="homepage-container">
		<JoinModal />
		<LoginModal />
		<div className="homepage-image-container flex-col" ref={vantaRef}>
			<a className="homepage-logo" href="/" >
				<img src={unilistLogo} />
			</a>
			<button className="login-button unilist-button" onClick={() => showLoginModal(true)}>
				Login
			</button>
			<div className="main-content-container container-center flex-row">
				<div className="main-text flex-col">
					<span className="title-text">
						<img className="in-text-image" src={cityIcon} /> Find your spot.
					</span>
					<span className="desc-text">Join the community of students and broaden your opportunities.</span>
				</div>
				<div className="main-signup flex-row">
					<div className="signup-form flex-col">
						<div className="signup-container flex-col">
							<div className="main-image flex-col">
								<img src={networkIcon} />
							</div>
							<div className="signup-text">Join your community.</div>
							<input className="signup-input" placeholder="enter your email" />
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