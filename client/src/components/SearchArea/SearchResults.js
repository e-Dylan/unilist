import React, { useState, useEffect, useRef, createRef } from "react";
import '../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions (setters)
import { setUniversityListState } from '../../redux/actions/setUniversityListState';
import { setActiveUniversityState } from '../../redux/actions/setActiveUniversityState';
import { setEditingUniversityState } from "../../redux/actions/setEditingUniversityState";
import { setFeedbackTagsState } from "../../redux/actions/setFeedbackTagsState";

// API
import * as uniApi from '../../api/uniApi';

// Weather icons
import ReactAnimatedWeather from 'react-animated-weather';

// Components
import UniversityDataModal from "../Modals/UniversityDataModal/UniversityDataModal";
import { showUniversityDataModal } from '../Modals/UniversityDataModal/UniversityDataModal';
import AddUniversityModal from './AddUniversityModal';
import { showAddUniModal } from './AddUniversityModal';
import { showJoinModal } from '../JoinModal';

// Images/Icons
import starIcon from '../../resources/search-area/search-results/star.png';

export const getTotalCost = (cost) => {
	if (cost !== null) {
		var total = 0;
		const keys = Object.keys(cost);
		for (var i = 0; i < keys.length; i++) {
			total += parseInt(cost[keys[i]]);
		}
		return total || 0;
	}
}

export const getWeatherIcon = (weatherDesc) => {
	const hours = new Date().getHours();
	const isDayTime = hours > 6 && hours < 20;

	switch (weatherDesc) {
		case "Rain": return "RAIN"; break;
		case "Snow": return "SNOW"; break;
		case "Clear": return "CLEAR_DAY"; break;
		case "Clouds": return "CLOUDY"; break;
		case "Mist": return "FOG"; break;
		case "Sun": return "CLEAR_DAY"; break;
		case "Wind": return "WIND"; break;
		case "Windy": return "WIND"; break;
		default:
			if (isDayTime) {
				return "CLEAR_DAY";
				break;
			} else {
				return "CLEAR_NIGHT";
				break;
			} 
	}
}

function SearchResults(props) {

	// Not working since data for some schools are empty.
	const calcOverallRating = (universityData) => {
		if (universityData === null || universityData === undefined) {
			console.log(universityData);
			return 0;
		}

		var total = 0;
		var iters = 0;
		// Every top-level data object has a rating, sum them all.
		var keys = Object.keys(universityData);
		console.log(keys);
		for (var i = 0; i < keys.length; i++) {
			total += universityData[keys[i]].rating;
			console.log(total);
			// console.log(total);
			iters += 1;
		}
		var average = total / iters;
		return (average/10).toFixed(1);
	}

	const weatherAPIKey = '50d9b938ed3fb013a16ec3ed594ea7dc';

	// useEffect(() => {
	// 	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=5&lon=32.79899394383519&appid=${weatherAPIKey}`)
	// 			.then(res => res.json())
	// 			.then(async res => {
	// 				console.log(res)
	// 			});
	// }, [])

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
	
		// Clear data inputs
		document.querySelectorAll('.datatab-data-input').forEach(input => {
			input.value = "";
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
		// Authorize user scopes.
		if (props.globalState.userState.isLoggedIn === false) {
			// show user join modal, prevent access to data.
			showJoinModal(true);
			return false;
		}

		const feedbackModal = document.getElementById('uni-feedback-modal');
		const modalBg = document.getElementById('feedback-modal-bg');
		const tagsMenu = document.querySelector('.tags-menu');
		if (bool) {
			// Opening by "Add University" button, needs to be empty.
			clearFeedbackModal();
			feedbackModal.classList.add('modal-active');
			modalBg.classList.add('modal-active');
		} else {
			// Hide modal.
			feedbackModal.classList.remove('modal-active');
			modalBg.classList.remove('modal-active');
			tagsMenu.classList.remove('modal-active');
		}
	}

	return (
		<div className="search-results-container flex-col">
				<div className="search-results-nav flex-row">
					{/* <button className="unilist-button" onClick={() => showAddUniModal(true)}>Add University</button> */}
					<button className="unilist-button" onClick={() => {
						showFeedbackModal(true)
						// PREVENT THIS FROM APPENDING THE CURRENT OBJECT
						// WITH A NEW UNIDATA OBJECT.
						// HAS A REFERENCE TO ITSELF - CREATES "CIRCULAR".
						// OVERWRITE STATE, DON'T ADD A LOOPING OBJECT.
						// IDK WHY IT IS. -> stringifying works with nested objects - overwriting strings works.
						// fix by stringifying when overwriting? takes parsing everywhere though.
						// GET A DEEPCOPY LIBRARY?
						
						// props.setEditingUniversityState(uniApi.nullUniData);
					}}
					>Add University</button>
				</div>

				{ props.globalState.universityListState != null && props.globalState.universityListState.length > 0 &&
					<div className="search-results-items flex-row">
						{ props.globalState.universityListState.map((item, index) => {
							return (
								<div className="search-results-item flex-col" key={item.name}
									style={{
										backgroundImage: `url(/assets/university-images/${item.image_path})`,
									}}
									onClick={() => {

										// console.log(item.university_data);

										if (Object.keys(item.university_data).length > 0) {
											if (typeof item.university_data !== "object") {
												item.university_data = JSON.parse(item.university_data);
											}
											
											showUniversityDataModal(true, item, props);
											// console.log(item);
										} else {
											// If there's no valid data on the item being given,
											// set its university_data object to zeros.
											// All the rest will be used, img etc.
											item.university_data = uniApi.nullUniData.university_data;
											showUniversityDataModal(true, item, props);
										}
									}}
								>

									<div className="cost-container flex-row">
										<div className="thumbnail-data-text-med flex-col" onClick={() => console.log(item.university_data)}> 
											<span className="cost">${getTotalCost(item.university_data.data.costs)}/year</span>
										</div>	
									</div>

									<div className="weather-container flex-row">
										<div className="thumbnail-data-text-large flex-col"> 
											<span className="temp">{item.university_data.ratings.weather.now.temp.toFixed(0)} &#176;C</span>
											<span className="thumbnail-data-text-small">Feels {item.university_data.ratings.weather.now.feels_like.toFixed(0)} &#176;C</span>
										</div>
										<ReactAnimatedWeather
											icon={getWeatherIcon(item.university_data.ratings.weather.now.desc)} color="white" size={40} animate={true}
										/>	
									</div>

									<div className="location-container flex-row">
										<div className="thumbnail-data-text-med flex-col" onClick={() => console.log(item.university_data)}> 
											<span className="temp">{item.university_data.data.the_city.location}</span>
										</div>	
									</div>

									<div className="university-title">{item.name}</div>
									<div className="overall-rating flex-row">
										<img src={starIcon} />
										<a>{item.university_data.ratings.overall_rating.rating}</a>
									</div>
								</div>
							);
						}) }
					</div>
				}

				{/* Absolute positioned */}
				<UniversityDataModal />
				<AddUniversityModal />
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
		setUniversityListState: setUniversityListState,
		setActiveUniversityState: setActiveUniversityState,
		setEditingUniversityState: setEditingUniversityState,
		setFeedbackTagsState: setFeedbackTagsState,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchResults);
