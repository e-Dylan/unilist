import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import mapboxgl from 'mapbox-gl';
// Weather icons
import ReactAnimatedWeather from 'react-animated-weather';

// CSS
import '../../styles/AddUniversityModal.scss';
import '../../styles/UniversityDataModal.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uniApi from '../../../api/uniApi';
import { setActiveUniversityState } from "../../../redux/actions/setActiveUniversityState";
import { setEditingUniversityState } from "../../../redux/actions/setEditingUniversityState";

// Components
import { 
	FlexRow, UniversityDataModalContainer, RatingsContainer, FeedbackHeader,
	RatingContainer, RatingBarContainer, HalfRatingBar, HeaderMessageContainer,
	EditButton, MakeChangeText, TabButtonBar, NavButtons, FeedbackNavBurger,
} from './UniversityDataModal.components';
import RatingBar from './RatingBar';

import { getTotalCost } from '../../SearchArea/SearchResults/SearchResults';
import { getWeatherIcon } from '../../SearchArea/SearchResults/SearchResults';
import { showJoinModal } from "../../Modals/JoinModal/JoinModal";

// Images/Icons
import unilistLogo from '../../../resources/logo/unilist-logo.png';
import scoresTabIcon from '../../../resources/search-area/uni-data-modal/tab-icons/scores-icon.png';
import schoolDataIcon from '../../../resources/search-area/uni-data-modal/tab-icons/uni-data-icon.png';
import starIcon from '../../../resources/search-area/search-results/star.png';

const MAPBOX_KEY = 'pk.eyJ1Ijoic2VsZmRyaXZpbmdkcml2ZXIiLCJhIjoiY2tqYm1iazVqNXF3aDJ1cnh0Z240d3BsMSJ9.f5GWrDlAMUeKDf3m5mfEgw';

export const showUniversityDataModal = async (bool, data, props) => {
	// Authorize user scopes.
	// if (props.globalState.userState.isLoggedIn === false) {
	// 	// show user join modal, prevent access to data.
	// 	showJoinModal(true);
	// 	return false;
	// }

	const uniDataModal = document.getElementById('uni-data-modal');
	const modalBg = document.getElementById('data-modal-bg');
	if (bool) {

		// Set active item data, show modal.
		if (data.university_data.ratings === undefined) data.university_data.ratings = uniApi.nullUniData.university_data.ratings;
		if (data.university_data.data === undefined) data.university_data.data = uniApi.nullUniData.university_data.data;

		props.setActiveUniversityState(data);

		if (!uniDataModal.classList.contains('modal-active')) uniDataModal.classList.add('modal-active');
		if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
		
	} else {
		// Hide modal.
		if (uniDataModal.classList.contains('modal-active')) uniDataModal.classList.remove('modal-active');
		if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
	}
}

function UniversityDataModal(props) {

	const navDropdownRef = useRef(null);

	// const [activeTabVar, setActiveTabVar] = useState("data-modal-ratings-tab-button");

	// const setActiveTab = (tabId) => {
	// 	document.querySelectorAll('.data-modal-tab-button').forEach(ele => {
	// 		ele.classList.remove('tab-button-active');
	// 	});

	// 	const tabButton = document.getElementById(tabId);
	// 	tabButton.classList.add('tab-button-active');
	// 	setActiveTabVar(tabId)
		
	// }

	$(document).mouseup(e => {
		var modalBg = $("#data-modal-bg");
		// if target isnt in display window:
		if (modalBg.is(e.target))
			showUniversityDataModal(false, null, props);
	})

	const clearFeedbackModal = () => {
		// Clear university name
		document.getElementById('university-name-input').value = "";
		// Clear ratings
		document.querySelectorAll('.rating-slider').forEach(slider => {
			slider.value = 0;
		});
		document.querySelectorAll('.rating-slider-label').forEach(label => {
			label.innerHTML = "0";
		});

		// Clear tag buttons
		const tagButtons = document.querySelectorAll('.feedback-tag-button');
		tagButtons.forEach(button => {
			button.classList.remove('button-active');
		})
		// Clear feedback tags state.
		if (props !== null)
			props.setFeedbackTagsState([]);
	}

	const showFeedbackModal = (bool) => {
		// Authorize user scopes
		if (props.globalState.userState.isLoggedIn === false) {
			showJoinModal(true);
			return false;
		}

		const feedbackModal = document.getElementById('uni-feedback-modal');
		const modalBg = document.getElementById('feedback-modal-bg');
		const tagsMenu = document.querySelector('.tags-menu');
		if (bool) {
			// Set active item data, show modal.
			feedbackModal.classList.add('modal-active');
			modalBg.classList.add('modal-active');
		} else {
			// Hide modal.
			feedbackModal.classList.remove('modal-active');
			modalBg.classList.remove('modal-active');
			tagsMenu.classList.remove('modal-active');
			clearFeedbackModal();
		}
	}

	const setActiveTab = (tabId) => {
		document.querySelectorAll('.data-modal-tab-button').forEach(ele => {
			if (ele.classList.contains('tab-button-active')) ele.classList.remove('tab-button-active');
		});

		const tabButton = document.getElementById(tabId);
		tabButton.classList.add('tab-button-active');
		
		document.querySelectorAll('.data-modal-tab').forEach(item => {
			item.classList.remove('tab-active');
		});
		switch (tabId) {
			case "data-modal-ratings-tab-button": 
				if (document.getElementById('data-modal-ratings-tab-container') != null)	
					document.getElementById('data-modal-ratings-tab-container').classList.add('tab-active');
				break;
			case "data-modal-data-tab-button":
				if (document.getElementById('data-modal-data-tab-container') != null)
					document.getElementById('data-modal-data-tab-container').classList.add('tab-active');
				break;
			case "data-modal-cost-tab-button":
				if (document.getElementById('data-modal-cost-tab-container') != null)
					document.getElementById('data-modal-cost-tab-container').classList.add('tab-active');
				break;
		}
		
	}

	const fillFeedbackDataWithActiveData = () => {
		// Top university name input
		const nameInput = document.getElementById('university-name-input'); // Uni name for feedback modal.
		nameInput.value = activeUni.name;

		// Set values of each slider to parallel rating bar in data modal.
		// DATA BARS MUST BE IDENTICALLY PARALLEL WITH RATING SLIDERS TO WORK.
		const dataFillBars = document.querySelectorAll('.rating-bar-fill');
		const ratingSliders = document.querySelectorAll('.rating-slider');
		const ratingSliderLabels = document.querySelectorAll('.rating-slider-label');

		dataFillBars.forEach((item, index) => {
			const val = parseInt(item.style.width);
			ratingSliders[index].value = val
			ratingSliderLabels[index].innerHTML = val.toString();
		})

		// Data modal data values
		const dataValues = document.querySelectorAll('.datatab-data-value');
		// Feedback modal data values
		const dataInputs = document.querySelectorAll('.datatab-data-input')
		dataValues.forEach((item, index) => {
			if (item.innerHTML[0] === "$") item.innerHTML = item.innerHTML.slice(1, item.innerHTML.length);
			dataInputs[index].value = item.innerHTML;
		})

		// Set state editing university data object to active university data (make a copy)
		// const copy = {...props.globalState.activeUniversityState};
		const copy = JSON.parse(JSON.stringify(props.globalState.activeUniversityState));
		props.setEditingUniversityState(copy);
	}

	const toggleNav = (bool) => {
		if (bool === undefined) {
			navDropdownRef.current.classList.toggle('nav-active');
			return;
		}
		if (bool)
			navDropdownRef.current.classList.add('nav-active');
		else if (!bool) {
			navDropdownRef.current.classList.remove('nav-active');
		}
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

	const activeUni = props.globalState.activeUniversityState;
	var ratings = activeUni.university_data.ratings || uniApi.nullUniData.ratings;
	var data = activeUni.university_data.data || uniApi.nullUniData.data;

	return (
		<div className="modal-bg" id="data-modal-bg">
			<UniversityDataModalContainer className="modal" id="uni-data-modal">
				{ activeUni.image_path &&
					<div className="main-image">
						<img style={{
							backgroundImage: `url(/assets/university-images/${activeUni.image_path})`
						}} />
						<div className="thumbnail-data-container flex-col">
							<div className="cost-container flex-row">
								<div className="thumbnail-data-text-med flex-col" onClick={() => console.log(activeUni.university_data)}> 
									<span className="cost">${getTotalCost(activeUni.university_data.data.costs)}/year</span>
								</div>	
							</div>

							<div className="weather-container flex-row">
								<div className="thumbnail-data-text-large weather-text-container flex-col"> 
									<span className="temp">{activeUni.university_data.ratings.weather.now.temp.toFixed(0)} &#176;C</span>
									<span className="thumbnail-data-text-small">Feels {activeUni.university_data.ratings.weather.now.feels_like.toFixed(0)} &#176;C</span>
								</div>
								<ReactAnimatedWeather
									icon={getWeatherIcon(activeUni.university_data.ratings.weather.now.desc)} color="white" size={40} animate={true}
								/>	
							</div>

							<div className="location-container flex-row">
								<div className="thumbnail-data-text-med flex-col" onClick={() => console.log(activeUni.university_data)}> 
									<span className="temp">{activeUni.university_data.data.the_city.location}</span>
								</div>	
							</div>

							<div className="university-title">{activeUni.name}</div>
							<div className="overall-rating flex-row">
								<img src={starIcon} />
								<a>{activeUni.university_data.ratings.overall_rating.rating}</a>
							</div>
						</div>
					</div>
				}
				<div className="data-col">
					<FeedbackHeader>
						<TabButtonBar>
							<NavButtons ref={navDropdownRef}>
								<div className="data-modal-tab-button tab-button-active" id="data-modal-ratings-tab-button" onClick={() => {
									setActiveTab("data-modal-ratings-tab-button")
									toggleNav(false);	
								}}>
									Ratings
								</div>
								<div className="data-modal-tab-button" id="data-modal-data-tab-button" onClick={() => {
									setActiveTab("data-modal-data-tab-button");
									toggleNav(false);
								}}>
									Data
								</div>
								<div className="data-modal-tab-button" id="data-modal-cost-tab-button" onClick={() => {
									setActiveTab("data-modal-cost-tab-button")
									toggleNav(false);
								}}>
									Cost of Living
								</div>
								<div className="data-modal-tab-button" id="data-modal-map-tab-button" onClick={() => {
									setActiveTab("data-modal-map-tab-button")
									toggleNav(false);
								}}>
									Campus Map
								</div>
								<div className="data-modal-tab-button" id="data-modal-talk-tab-button" onClick={() => {
									setActiveTab("data-modal-talk-tab-button")
									toggleNav(false);
								}}>
									Talk
								</div>
							</NavButtons>
						</TabButtonBar>

						<HeaderMessageContainer>	
							<FlexRow>
								<FeedbackNavBurger onClick={() => {
										toggleNav();
									}}>
										<div className="burger-line" />
										<div className="burger-line" />
										<div className="burger-line" />
								</FeedbackNavBurger>
							</FlexRow>
							<FlexRow>
								<div className="uni-data-header-image">
									<img className="uni-data-header-image" src={unilistLogo} />
								</div>
								<span> See anything you think needs updating? </span>
								<MakeChangeText onClick={() => {
									showFeedbackModal(true);
									showUniversityDataModal(false, null, props);

									fillFeedbackDataWithActiveData();
								}}>
									Make a change.
								</MakeChangeText>
								<EditButton>
									<button className="unilist-button" onClick={() => {
										showFeedbackModal(true);
										showUniversityDataModal(false, null, props);

										fillFeedbackDataWithActiveData();
									}}>Edit</button>
								</EditButton>
							</FlexRow>
							
						</HeaderMessageContainer>
					</FeedbackHeader>

					{/* Show each tab container depending on which is active */}

					
					{/* RATINGS TAB */}
					{ ratings &&
						<div className="tab-container flex-row data-modal-tab tab-active" id="data-modal-ratings-tab-container">
							<RatingsContainer>
								<RatingBar title="Overall Rating" rating={ratings.overall_rating.rating} ratings={ratings} />
								<RatingBar title="Cost/Value" rating={ratings.cost_value.rating} ratings={ratings} />
								<RatingBar title="Education" rating={ratings.education.rating} ratings={ratings} />
								<RatingBar title="Fun" rating={ratings.fun.rating} ratings={ratings} />
								<RatingContainer>
									<span className="rating-title">COVID-19</span>
									<HalfRatingBar>
										<div className="rating-bar-row flex-row">
											<span className="bar-label">Cases</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.covid19.rating + "%"}} />
											</RatingBarContainer>
										</div>
										<div className="rating-bar-row">
											<span className="bar-label">QoL</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.covid19.qol.rating + "%"}} />
											</RatingBarContainer>
										</div>
									</HalfRatingBar>
								</RatingContainer>
								<RatingBar title="Campus" rating={ratings.campus.rating} ratings={ratings} />
								<RatingBar title="The City" rating={ratings.the_city.rating} ratings={ratings} />
								<RatingBar title="People/Community" rating={ratings.people_community.rating} ratings={ratings} />
								<RatingBar title="Food" rating={ratings.food.rating} ratings={ratings} />
								<RatingBar title="Internet" rating={ratings.internet.rating} ratings={ratings} />
								<RatingBar title="Amenities" rating={ratings.amenities.rating} ratings={ratings} />
								<RatingBar title="Clubs/Extracurriculars" rating={ratings.clubs_extracurriculars.rating} ratings={ratings} />
								<RatingBar title="Sports" rating={ratings.sports.rating} ratings={ratings} />
								<RatingBar title="Restaurants" rating={ratings.restaurants.rating} ratings={ratings} />
								<RatingBar title="Transportation" rating={ratings.transportation.rating} ratings={ratings} />
								<RatingBar title="Academic Services" rating={ratings.academic_services.rating} ratings={ratings} />
								<RatingBar title="Academic Resources" rating={ratings.academic_resources.rating} ratings={ratings} />
								<RatingBar title="Fitness/Gym" rating={ratings.fitness_gym.rating} ratings={ratings} />
								<RatingContainer>
									<span className="rating-title">Parties</span>
									<HalfRatingBar>
										<div className="rating-bar-row flex-row">
											<span className="bar-label">Frequency</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.parties.frequency.rating + "%"}} />
											</RatingBarContainer>
										</div>
										<div className="rating-bar-row">
											<span className="bar-label">Quality</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.parties.rating + "%"}} />
											</RatingBarContainer>
										</div>
									</HalfRatingBar>
								</RatingContainer>
								<RatingContainer>
									<span className="rating-title">Weather</span>
									<HalfRatingBar>
										<div className="rating-bar-row flex-row">
											<span className="bar-label">Now</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.weather.now.rating + "%"}} />
												<label className="rating-bar-label small-label">{ratings.weather.now.temp.toFixed(1)} &#176;C</label>
											</RatingBarContainer>
										</div>
										<div className="rating-bar-row">
											<span className="bar-label">Average</span>
											<RatingBarContainer className="half-bar">
												<div className="rating-bar-fill" style={{width: ratings.weather.average.rating + "%"}} />
											</RatingBarContainer>
										</div>
									</HalfRatingBar>
								</RatingContainer>
								<RatingBar title="Online Resources" rating={ratings.cost_value.rating} ratings={ratings} />
								<RatingBar title="Facilities" rating={ratings.facilities.rating} ratings={ratings} />
								<RatingBar title="Prof. Interaction" rating={ratings.professor_interaction.rating} ratings={ratings} />
								<RatingBar title="Research" rating={ratings.research.rating} ratings={ratings} />
							</RatingsContainer>
						</div>
					}

					{/* DATA TAB */}
					{ data &&

						<div className="tab-container data-modal-tab flex-row" id="data-modal-data-tab-container">
							<div className="rows-container flex-col">

								{/* Costs */}
								<div className="data-col flex-col">
									<span className="col-title">Costs (year)</span>
									<div className="data-row flex-row">
										<div className="data-key">Tuition</div>
										<div className="datatab-data-value">${data.costs.tuition}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Residence</div>
										<div className="datatab-data-value">${data.costs.residence}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Mealplan/Food</div>
										<div className="datatab-data-value">${data.costs.mealplan_food}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Books/Supplies</div>
										<div className="datatab-data-value">${data.costs.books_supplies}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Transportation</div>
										<div className="datatab-data-value">${data.costs.transportation}</div>
									</div>
								</div> 
								{/* The School */}
								<div className="data-col flex-col">
									<span className="col-title">The School</span>
									<div className="data-row flex-row">
										<div className="data-key">Known For</div>
										<div className="datatab-data-value">{data.the_school.known_for}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Size</div>
										<div className="datatab-data-value">{data.the_school.campus_size}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Type</div>
										<div className="datatab-data-value">{data.the_school.campus_type}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Equipment</div>
										<div className="datatab-data-value">{data.the_school.equipment}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Community</div>
										<div className="datatab-data-value">{data.the_school.community}</div>
									</div>
								</div> 
								{/* Class Types */}
								<div className="data-col flex-col">
									<span className="col-title">Class Types</span>
									<div className="data-row flex-row">
										<div className="data-key">Class Sizes (Avg)</div>
										<div className="datatab-data-value">{data.class_types.class_sizes}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classrooms</div>
										<div className="datatab-data-value">{data.class_types.classrooms}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classes</div>
										<div className="datatab-data-value">{data.class_types.classes}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* Culture */}
								<div className="data-col flex-col">
									<span className="col-title">Culture</span>
									<div className="data-row flex-row">
										<div className="data-key">Diversity</div>
										<div className="datatab-data-value">{data.culture.diversity}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Majority</div>
										<div className="datatab-data-value">{data.culture.majority}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Class</div>
										<div className="datatab-data-value">{data.culture.average_class}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Awards</span>
									<div className="data-row flex-row">
										<div className="data-key">Annual Value</div>
										<div className="datatab-data-value">{data.awards.annual_value}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Scholarships</div>
										<div className="datatab-data-value">{data.awards.scholarships}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bursaries</div>
										<div className="datatab-data-value">{data.awards.bursaries}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Applied/Auto</div>
										<div className="datatab-data-value">{data.awards.applied_auto}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Entrance/During</div>
										<div className="datatab-data-value">{data.awards.entrance_during}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Jobs/Co-op</span>
									<div className="data-row flex-row">
										<div className="data-key">Co-op Service</div>
										<div className="datatab-data-value">{data.jobs_coop.coop_service}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Reputation</div>
										<div className="datatab-data-value">{data.jobs_coop.reputation}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Salary</div>
										<div className="datatab-data-value">{data.jobs_coop.average_salary}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* The City */}
								<div className="data-col flex-col">
									<span className="col-title">The City</span>
									<div className="data-row flex-row">
										<div className="data-key">City Type</div>
										<div className="datatab-data-value">{data.the_city.city_type}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Population</div>
										<div className="datatab-data-value">{data.the_city.population}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Public Transit</div>
										<div className="datatab-data-value">{data.the_city.public_transit}</div>
									</div>
								</div>
								{/* Surroundings */}
								<div className="data-col flex-col">
									<span className="col-title">Surroundings</span>
									<div className="data-row flex-row">
										<div className="data-key">Restaurants</div>
										<div className="datatab-data-value">{data.surroundings.restaurants}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bars/Clubs</div>
										<div className="datatab-data-value">{data.surroundings.bars_clubs}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Nature</div>
										<div className="datatab-data-value">{data.surroundings.nature}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Near Water</div>
										<div className="datatab-data-value">{data.surroundings.near_water}</div>
									</div>
								</div> 
								{/* Environment */}
								<div className="data-col flex-col">
									<span className="col-title">Environment</span>
									<div className="data-row flex-row">
										<div className="data-key">Air Quality</div>
										<div className="datatab-data-value">{data.environment.air_quality}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Pollution</div>
										<div className="datatab-data-value">{data.environment.pollution}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Water Quality</div>
										<div className="datatab-data-value">{data.environment.water_quality}</div>
									</div>
								</div> 
							</div>
						</div>

					}
					
					{ false === "data-modal-map-tab-button" ?
							<div className="map-container" id="map"></div>
					:
						<div id="map" style={{width: 0+'px', height: 0+'px', display: 'none'}} />
					}

				</div>
			</UniversityDataModalContainer>
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
		setEditingUniversityState: setEditingUniversityState,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UniversityDataModal);
