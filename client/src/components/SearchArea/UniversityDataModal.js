import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import mapboxgl from 'mapbox-gl';

import '../styles/AddUniversityModal.scss';
import '../styles/UniversityDataModal.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as api from '../../api';
import { setActiveUniversityState } from "../../redux/actions/setActiveUniversityState";
import { showFeedbackModal } from './FeedbackModal';

// Components

// Images/Icons
import unilistLogo from '../../resources/logo/unilist-logo.png';
import scoresTabIcon from '../../resources/search-area/uni-data-modal/tab-icons/scores-icon.png';
import schoolDataIcon from '../../resources/search-area/uni-data-modal/tab-icons/uni-data-icon.png';

const MAPBOX_KEY = 'pk.eyJ1Ijoic2VsZmRyaXZpbmdkcml2ZXIiLCJhIjoiY2tqYm1iazVqNXF3aDJ1cnh0Z240d3BsMSJ9.f5GWrDlAMUeKDf3m5mfEgw';

export const showUniversityDataModal = async (bool, data, props) => {
	const uniDataModal = document.getElementById('uni-data-modal');
	const modalBg = document.getElementById('data-modal-bg');
	if (bool) {
		// Set active item data, show modal.
		if (data.university_data.ratings === undefined) data.university_data.ratings = api.nullUniData.university_data.ratings;
		if (data.university_data.data === undefined) data.university_data.data = api.nullUniData.university_data.data;

		props.setActiveUniversityState(data)

		if (!uniDataModal.classList.contains('modal-active')) uniDataModal.classList.add('modal-active');
		if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
		
	} else {
		// Hide modal.
		if (uniDataModal.classList.contains('modal-active')) uniDataModal.classList.remove('modal-active');
		if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
	}
}

$(document).mouseup(e => {
	var modalBg = $("#data-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showUniversityDataModal(false, null, null);

})

function UniversityDataModal(props) {

	const [activeTabVar, setActiveTabVar] = useState("ratings-tab-button");

	const setActiveTab = (tabId) => {
		document.querySelectorAll('.tab-button').forEach(ele => {
			if (ele.classList.contains('tab-button-active')) ele.classList.remove('tab-button-active');
		});

		const tabButton = document.getElementById(tabId);
		if (!tabButton.classList.contains('tab-button-active')) tabButton.classList.add('tab-button-active');
		setActiveTabVar(tabId)
		
	}

	useEffect(() => {
		mapboxgl.accessToken = MAPBOX_KEY;
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});

		map.on('load', () => {
			map.resize();
		});
	}, []);

	var ratings = props.globalState.activeUniversityState.university_data.ratings || api.nullUniData.ratings;
	var data = props.globalState.activeUniversityState.university_data.data || api.nullUniData.data;

	return (
		<div className="modal-bg" id="data-modal-bg">
			<div className="modal data-modal flex-col" id="uni-data-modal">
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
						<div className="tab-button" id="map-tab-button" onClick={() => setActiveTab("map-tab-button")}>
							Campus Map
						</div>
						<div className="tab-button" id="talk-tab-button" onClick={() => setActiveTab("talk-tab-button")}>
							Talk
						</div>
					</div>

					<div className="header-message-container flex-row">
						<img src={unilistLogo} />
						<span> See anything you think needs updating? </span>
						<a onClick={() => { 
							showFeedbackModal(true);
							showUniversityDataModal(false);
							const nameInput = document.getElementById('university-name-input'); // Uni name for feedback modal.
							nameInput.value = props.globalState.activeUniversityState.name;
						}}>
							Let me know.
						 	<button className="unilist-button">Edit</button>
						 </a>
					</div>

					{/* Show each tab container depending on which is active */}

					{ activeTabVar === "ratings-tab-button" && ratings &&
						<div className="tab-container flex-row" id="ratings-container">
							<div className="rating-container flex-row">
								<span className="rating-title">Overall Rating</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.overall_rating*10 + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Cost-Value</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.cost_value.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Education</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.education.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Fun</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.fun.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">COVID-19</span>
								<div className="rating-bar">
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Cases</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.covid19.rating + "%"}} />
										</div>
									</div>
									<div className="rating-bar-row">
										<span className="bar-label">Quality of Living</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.covid19.qol.rating + "%"}} />
										</div>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Campus</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill"  style={{width: ratings.campus.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">The City</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.the_city.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">People/Community</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.people_community.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Food</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.food.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Internet</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.internet.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Amenities</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.amenities.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Clubs/Extracirriculars</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.clubs_extracurriculars.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Sports</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.sports.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Restaurants</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.restaurants.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Transit/Transportation</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.transportation.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Academic Services</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.academic_services.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Academic Resources</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.academic_resources.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Fitness/Gym</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.fitness_gym.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Parties</span>
								<div className="rating-bar">
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Frequency</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.parties.frequency.rating + "%"}} />
										</div>
									</div>
									<div className="rating-bar-row">
										<span className="bar-label">Quality</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.parties.rating + "%"}} />
										</div>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Weather</span>
								<div className="rating-bar">
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Now</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.weather.now.rating + "%"}} />
										</div>
									</div>
									<div className="rating-bar-row">
										<span className="bar-label">Average</span>
										<div className="rating-bar-container half-bar">
											<div className="rating-bar-fill" style={{width: ratings.weather.average.rating + "%"}} />
										</div>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Online Resources</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill"  style={{width: ratings.online_resources.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Facilities</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.facilities.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Professors' Interaction</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.professor_interaction.rating + "%"}}></div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Research</span>
								<div className="rating-bar-container">
									<div className="rating-bar-fill" style={{width: ratings.research.rating + "%"}}></div>
								</div>
							</div>
						</div>
					}

					{ activeTabVar === "data-tab-button" && data &&

						<div className="tab-container flex-row" id="data-container">
							<div className="rows-container flex-col">

								{/* Costs */}
								<div className="data-col flex-col">
									<span className="col-title">Costs ($/year)</span>
									<div className="data-row flex-row">
										<div className="data-key">Tuition</div>
										<div className="data-value">{data.costs.tuition}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Residence</div>
										<div className="data-value">{data.costs.residence}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Mealplan/Food</div>
										<div className="data-value">{data.costs.mealplan_food}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Books/Supplies</div>
										<div className="data-value">{data.costs.books_supplies}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Transportation</div>
										<div className="data-value">{data.costs.transportation}</div>
									</div>
								</div> 
								{/* The School */}
								<div className="data-col flex-col">
									<span className="col-title">The School</span>
									<div className="data-row flex-row">
										<div className="data-key">Known For</div>
										<div className="data-value">{data.the_school.known_for}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Size</div>
										<div className="data-value">{data.the_school.campus_size}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Type</div>
										<div className="data-value">{data.the_school.campus_type}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Equipment</div>
										<div className="data-value">{data.the_school.equipment}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Community</div>
										<div className="data-value">{data.the_school.community}</div>
									</div>
								</div> 
								{/* Class Types */}
								<div className="data-col flex-col">
									<span className="col-title">Class Types</span>
									<div className="data-row flex-row">
										<div className="data-key">Class Sizes (Avg)</div>
										<div className="data-value">{data.class_types.class_sizes}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classrooms</div>
										<div className="data-value">{data.class_types.classrooms}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classes</div>
										<div className="data-value">{data.class_types.classes}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* Culture */}
								<div className="data-col flex-col">
									<span className="col-title">Culture</span>
									<div className="data-row flex-row">
										<div className="data-key">Diversity</div>
										<div className="data-value">{data.culture.diversity}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Majority</div>
										<div className="data-value">{data.culture.majority}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Class</div>
										<div className="data-value">{data.culture.average_class}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Awards</span>
									<div className="data-row flex-row">
										<div className="data-key">Annual Value</div>
										<div className="data-value">{data.awards.annual_value}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Scholarships</div>
										<div className="data-value">{data.awards.scholarships}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bursaries</div>
										<div className="data-value">{data.awards.bursaries}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Applied/Auto</div>
										<div className="data-value">{data.awards.applied_auto}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Entrance/During</div>
										<div className="data-value">{data.awards.entrance_during}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Jobs/Co-op</span>
									<div className="data-row flex-row">
										<div className="data-key">Co-op Service</div>
										<div className="data-value">{data.jobs_coop.coop_service}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Reputation</div>
										<div className="data-value">{data.jobs_coop.reputation}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Salary</div>
										<div className="data-value">{data.jobs_coop.average_salary}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* The City */}
								<div className="data-col flex-col">
									<span className="col-title">The City</span>
									<div className="data-row flex-row">
										<div className="data-key">City Type</div>
										<div className="data-value">{data.the_city.city_type}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Population</div>
										<div className="data-value">{data.the_city.population}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Public Transit</div>
										<div className="data-value">{data.the_city.public_transit}</div>
									</div>
								</div>
								{/* Surroundings */}
								<div className="data-col flex-col">
									<span className="col-title">Surroundings</span>
									<div className="data-row flex-row">
										<div className="data-key">Restaurants</div>
										<div className="data-value">{data.surroundings.restaurants}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bars/Clubs</div>
										<div className="data-value">{data.surroundings.bars_clubs}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Nature</div>
										<div className="data-value">{data.surroundings.nature}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Near Water</div>
										<div className="data-value">{data.surroundings.near_water}</div>
									</div>
								</div> 
								{/* Environment */}
								<div className="data-col flex-col">
									<span className="col-title">Environment</span>
									<div className="data-row flex-row">
										<div className="data-key">Air Quality</div>
										<div className="data-value">{data.environment.air_quality}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Pollution</div>
										<div className="data-value">{data.environment.pollution}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Water Quality</div>
										<div className="data-value">{data.environment.water_quality}</div>
									</div>
								</div> 
							</div>
						</div>

					}
					
					{ activeTabVar === "map-tab-button" ?
							<div className="map-container" id="map"></div>
					:
						<div id="map" style={{width: 0+'px', height: 0+'px', display: 'none'}} />
					}

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
