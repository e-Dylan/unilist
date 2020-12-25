import React, { useState, useEffect } from "react";
import axios from "axios";

import '../styles/AddUniversityModal.scss';
import '../styles/UniversityDataModal.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as api from '../../api';
import { setActiveUniversityState } from "../../redux/actions/setActiveUniversityState";

// Components

// Images/Icons
import unilistLogo from '../../resources/logo/unilist-logo.png';
import scoresTabIcon from '../../resources/search-area/uni-data-modal/tab-icons/scores-icon.png';
import schoolDataIcon from '../../resources/search-area/uni-data-modal/tab-icons/uni-data-icon.png';

export const showUniversityDataModal = ({bool, data, props}) => {
	const uniDataModal = document.getElementById('uni-data-modal');
	if (bool) {
		// Set active item data, show modal.
		if (!uniDataModal.classList.contains('active')) uniDataModal.classList.add('active');
		props.setActiveUniversityState(data);
	} else {
		// Hide modal.
		if (uniDataModal.classList.contains('active')) uniDataModal.classList.remove('active');
	}
}

function UniversityDataModal(props) {

	const [activeTabVar, setActiveTabVar] = useState("ratings-tab-button");

	const onSubmit = async e => {
		e.preventDefault();
		showUniversityDataModal({bool: false, item: null, props: props});
	}

	const setActiveTab = (tabId) => {
		document.querySelectorAll('.tab-button').forEach(ele => {
			if (ele.classList.contains('tab-button-active')) ele.classList.remove('tab-button-active');
		});

		const tabButton = document.getElementById(tabId);
		if (!tabButton.classList.contains('tab-button-active')) tabButton.classList.add('tab-button-active');
		setActiveTabVar(tabId)
		
	}

	return (
		<div className="modal flex-row" id="uni-data-modal">
			{ props.globalState.activeUniversityState.image_path &&
				<div className="main-image">
					<img style={{
						backgroundImage: `url(/assets/university-images/${props.globalState.activeUniversityState.image_path})`
					}} />
				</div>
			}
			<div className="data-col">
				<div className="tab-bar flex-row">
					<div className="tab-button tab-button-active" id="ratings-tab-button" onClick={() => setActiveTab("ratings-tab-button")}>
						Ratings
					</div>
					<div className="tab-button" id="data-tab-button" onClick={() => setActiveTab("data-tab-button")}>
						Data
					</div>
					<div className="tab-button" id="cost-tab-button" onClick={() => setActiveTab("cost-tab-button")}>
						Cost of Living
					</div>
					<div className="tab-button" id="campus-tab-button" onClick={() => setActiveTab("campus-tab-button")}>
						Campus Map
					</div>
					<div className="tab-button" id="talk-tab-button" onClick={() => setActiveTab("talk-tab-button")}>
						Talk
					</div>
				</div>

				<div className="header-message-container flex-row">
					<img src={unilistLogo} />
					<span> See anything you think needs updating? </span><a> Let me know.</a>
				</div>

				{/* Show each tab container depending on which is active */}

				{ activeTabVar === "ratings-tab-button" &&
					<div className="tab-container flex-row" id="ratings-container">
						<div className="rating-container flex-row">
							<span className="rating-title">Overall Rating</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Cost-Value</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Education</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Fun</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">COVID-19</span>
							<div className="rating-bar">
								<div className="rating-bar-row flex-row">
									<span className="bar-label">Cases</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
								<div className="rating-bar-row">
									<span className="bar-label">Quality of Living</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Campus</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">The City</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">People/Community</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Food</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Internet</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Ammenities</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Clubs/Extracirriculars</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Sports</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Restaurants</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Transit/Transportation</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Academic Services</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Academic Resources</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Fitness/Gym</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Parties</span>
							<div className="rating-bar">
								<div className="rating-bar-row flex-row">
									<span className="bar-label">Frequency</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
								<div className="rating-bar-row">
									<span className="bar-label">Quality</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Weather</span>
							<div className="rating-bar">
								<div className="rating-bar-row flex-row">
									<span className="bar-label">Now</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
								<div className="rating-bar-row">
									<span className="bar-label">Average</span><div className="rating-bar-container"><div className="rating-bar-fill"></div></div>
								</div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Online Resources</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Facilities</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Professors' Interaction</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
						<div className="rating-container flex-row">
							<span className="rating-title">Research</span>
							<div className="rating-bar-container">
								<div className="rating-bar-fill"></div>
							</div>
						</div>
					</div>
				}

				<div className="tab-container" id="data-container">

				</div>
				
				<div className="tab-container" id="cost-container">

				</div>
				
				<div className="tab-container" id="campus-container">

				</div>
				
				<div className="tab-container" id="talk-container">

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
		setActiveUniversityState: setActiveUniversityState,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UniversityDataModal);
