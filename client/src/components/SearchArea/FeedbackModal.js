import React, { useState, useEffect } from "react";
import $ from "jquery";

import '../styles/AddUniversityModal.scss';
import '../styles/UniversityDataModal.scss';
import '../styles/FeedbackModal.scss';
import '../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as api from '../../api';
import { setActiveUniversityState } from "../../redux/actions/setActiveUniversityState";

// Components
import SearchFilters from './SearchFilters';
import RatingSlider from './RatingSlider';

// Images/Icons
import unilistLogo from '../../resources/logo/unilist-logo.png';

import { searchTagFilters } from '../SearchArea/SearchFilters';

export const showFeedbackModal = async (bool) => {
	const feedbackModal = document.getElementById('uni-feedback-modal');
	const modalBg = document.getElementById('feedback-modal-bg');
	if (bool) {
		// Set active item data, show modal.
		feedbackModal.classList.add('modal-active');
		modalBg.classList.add('modal-active');
		
		
	} else {
		// Hide modal.
		feedbackModal.classList.remove('modal-active');
		modalBg.classList.remove('modal-active');
	}
}

$(document).mouseup(e => {
	var modalBg = $("#feedback-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
	showFeedbackModal(false, null);
})

function FeedbackModal(props) {

	const [tags, setTags] = useState([]);

	const setActiveTab = (tabId) => {
		document.querySelectorAll('.tab-button').forEach(ele => {
			if (ele.classList.contains('tab-button-active')) ele.classList.remove('tab-button-active');
		});

		const tabButton = document.getElementById(tabId);
		if (!tabButton.classList.contains('tab-button-active')) tabButton.classList.add('tab-button-active');
		
		document.querySelectorAll('.tab-container').forEach(item => {
			item.classList.remove('tab-active');
		});
		switch (tabId) {
			case "ratings-tab-button": 
				document.getElementById('ratings-tab-container').classList.add('tab-active');
				break;
			case "data-tab-button": 
				document.getElementById('data-tab-container').classList.add('tab-active');
				break;
			case "cost-tab-button": 
				document.getElementById('cost-tab-container').classList.add('tab-active');
				break;
		}
		
	}

	const showTagsMenu = (bool) => {
		const tagsMenu = document.querySelector('.tags-menu');
		if (bool)
			tagsMenu.classList.add('modal-active');
		else
			tagsMenu.classList.remove('modal-active');
	}
	
	const addTag = async(tag) => {
		await tags.push(tag.toLowerCase());
	}

	const removeTag = (tag) => {
		const i = tags.indexOf(tag.toLowerCase());
		if (i > -1) 
			tags.splice(i, 1);
	}

	const toggleButton = (buttonId, filterTag) => {
		const filterButton = document.getElementById(buttonId);
		if (filterButton.classList.contains('button-active')) {
			// disable button
			filterButton.classList.remove('button-active');
			// remove its tag value from the tags array
			removeTag(filterTag);
		} else {
			// enable this button.
			filterButton.classList.add('button-active');
			addTag(filterTag);
		}
		console.log(tags);
	}

	return (
		<div className="modal-bg" id="feedback-modal-bg">
			<div className="modal feedback-modal flex-row" id="uni-feedback-modal">
				<div className="feedback-col flex-col">
					
					<div className="title-text">Send Me Feedback</div>
					<p className="desc-text">
						This app works by crowdsourcing information from the people who know it best: students.
					<br /> <br />
						If you know a school that isn't on the list, 
						or you know information that is missing or out-of-date, 
						simply fix it with what you know.
					</p>

				</div>
				<div className="data-modal flex-col">
					<div className="data-col">
						<div className="header-content">
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
							</div>

							<div className="header-message-container flex-row">
								<img src={unilistLogo} />
								<span>Update any fields and submit them to keep them up to date.</span>
							</div>

							<div className="uni-info flex-row">
								<div className="data-row flex-row">
									<span className="uni-label">University</span>
									<input className="feedback-input" id="university-name-input" placeholder="University name"></input>
								</div>
								<div className="data-row flex-row">
									{/* <span className="uni-label">Tags</span> */}
									<button className="unilist-button" onClick={() => {
										showTagsMenu(true);
									}}>Add Tags</button>
								</div>
							</div>
						</div>

						<div className="tab-container tag-container flex-col">
							<div className="tags-menu flex-col">
								<div className="search-filters flex-col">
									<button className="tags-close-button" onClick={() => showTagsMenu(false)}></button>
									<span className="tags-title-text">Tags</span>
									<div className="filter-section flex-col">
										<span className="filter-title">Location</span>
										<div className="filter-options flex-row">
											{ Object.keys(searchTagFilters.location_filters).map((item, index) => {
												return (
													<div className="filter-button location-button flex-col" key={item} id={"locationButton"+index}>{searchTagFilters.location_filters[item]}</div>
												)
											})}
										</div>
									</div>
									<div className="filter-section flex-col">
										<span className="filter-title">Costs</span>
										<div className="filter-options flex-row">
											<div className="filter-button location-button flex-col">Low</div>
											<div className="filter-button location-button flex-col">Moderate</div>
											<div className="filter-button location-button flex-col">High</div>
										</div>
									</div>
									<div className="filter-section flex-col">
										<span className="filter-title">Community</span>
										<div className="filter-options flex-row">
											{ Object.keys(searchTagFilters.community_filters).map((item, index) => {
												return (
													<div className="filter-button flex-col" key={item} id={"communityButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("communityButton"+index, searchTagFilters.community_filters[item]);
														// addTag(location_filters[item]);
													}}>{searchTagFilters.community_filters[item]}</div>
												)
											})}
										</div>
									</div>
									<div className="filter-section flex-col">
										<span className="filter-title">Surrounding City</span>
										<div className="filter-options flex-row">
											{ Object.keys(searchTagFilters.area_filters).map((item, index) => {
												return (
													<div className="filter-button flex-col" key={item} id={"areaButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("areaButton"+index, searchTagFilters.area_filters[item]);
														// addTag(location_filters[item]);
													}}>{searchTagFilters.area_filters[item]}</div>
												)
											})}
										</div>
									</div>
									<div className="filter-section flex-col">
										<span className="filter-title">Qualities of Life</span>
										<div className="filter-options flex-row">
											{ Object.keys(searchTagFilters.qualities_filters).map((item, index) => {
												return (
													<div className="filter-button flex-col" key={item} id={"qualitiesButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("qualitiesButton"+index, searchTagFilters.qualities_filters[item]);
														// addTag(location_filters[item]);
													}}>{searchTagFilters.qualities_filters[item]}</div>
												)
											})}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Show each tab container depending on which is active */}

						{/* RATINGS TAB */}
						<div className="tab-container flex-row" id="ratings-tab-container">
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Overall Rating" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Cost/Value" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Education" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Fun" />
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">COVID-19</span>
								<div className="rating-bar">
								<div className="rating-bar-row flex-row">
										<span className="bar-label">Cases</span>
										<input className="rating-slider half-height" type="range" id="covid19-cases-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('covid19-cases-slider');
											document.getElementById("covid19-cases-label").innerHTML = slider.value;
										}} />
										<label id="covid19-cases-label">0</label>
									</div>
									<div className="rating-bar-row flex-row">
										<span className="bar-label">QoL</span>
										<input className="rating-slider half-height" type="range" id="covid19-qol-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('covid19-qol-slider');
											document.getElementById("covid19-qol-label").innerHTML = slider.value;
										}} />
										<label id="covid19-qol-label">0</label>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Campus" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="The City" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="People/Community" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Food" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Internet" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Amenitites" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Clubs/Ext. Currs." />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Sports" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Restaurants" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Transportation" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Academic Services" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Academic Resources" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Fitness/Gym" />
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Parties</span>
								<div className="rating-bar">
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Frequency</span>
										<input className="rating-slider half-height" type="range" id="parties-freq-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('parties-freq-slider');
											document.getElementById("parties-freq-label").innerHTML = slider.value;
										}} />
										<label id="parties-freq-label">0</label>
									</div>
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Quality</span>
										<input className="rating-slider half-height" type="range" id="parties-quality-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('parties-quality-slider');
											document.getElementById("parties-quality-label").innerHTML = slider.value;
										}} />
										<label id="parties-quality-label">0</label>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<span className="rating-title">Weather</span>
								<div className="rating-bar">
									<div className="rating-bar-row flex-row">
										<span className="bar-label">Now</span>
										<input className="rating-slider half-height" type="range" id="weather-now-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('weather-now-slider');
											document.getElementById("weather-now-label").innerHTML = slider.value;
										}} />
										<label id="weather-now-label">0</label>
									</div>
									<div className="rating-bar-row">
										<span className="bar-label">Average</span>
										<input className="rating-slider half-height" type="range" id="weather-average-slider" min="0" max="100" onChange={() => {
											const slider = document.getElementById('weather-average-slider');
											document.getElementById("weather-average-label").innerHTML = slider.value;
										}} />
										<label id="weather-average-label">0</label>
									</div>
								</div>
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Online Resources" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Facilities" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Prof. Interaction" />
							</div>
							<div className="rating-container flex-row">
								<RatingSlider labelTitle="Research" />
							</div>
						</div>
						
						{/* DATA TAB */}
						<div className="tab-container flex-row" id="data-tab-container">
							<div className="rows-container flex-col">

								{/* Costs */}
								<div className="data-col flex-col">
									<span className="col-title">Costs ($/year)</span>
									<div className="data-row flex-row">
										<div className="data-key">Tuition</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Residence</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Mealplan/Food</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Books/Supplies</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Transportation</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
								{/* The School */}
								<div className="data-col flex-col">
									<span className="col-title">The School</span>
									<div className="data-row flex-row">
										<div className="data-key">Known For</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Size</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Campus Type</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Equipment</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Community</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
								{/* Class Types */}
								<div className="data-col flex-col">
									<span className="col-title">Class Types</span>
									<div className="data-row flex-row">
										<div className="data-key">Class Sizes (Avg)</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classrooms</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Classes</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* Culture */}
								<div className="data-col flex-col">
									<span className="col-title">Culture</span>
									<div className="data-row flex-row">
										<div className="data-key">Diversity</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Majority</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Class</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Awards</span>
									<div className="data-row flex-row">
										<div className="data-key">Annual Value</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Scholarships</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bursaries</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Applied/Auto</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Entrance/During</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
								{/* Awards */}
								<div className="data-col flex-col">
									<span className="col-title">Jobs/Co-op</span>
									<div className="data-row flex-row">
										<div className="data-key">Co-op Service</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Reputation</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Average Salary</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
							</div>
							<div className="rows-container flex-col">
								{/* The City */}
								<div className="data-col flex-col">
									<span className="col-title">The City</span>
									<div className="data-row flex-row">
										<div className="data-key">City Type</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Population</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Public Transit</div>
										<div className="data-value">{}</div>
									</div>
								</div>
								{/* Surroundings */}
								<div className="data-col flex-col">
									<span className="col-title">Surroundings</span>
									<div className="data-row flex-row">
										<div className="data-key">Restaurants</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Bars/Clubs</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Nature</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Near Water</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
								{/* Environment */}
								<div className="data-col flex-col">
									<span className="col-title">Environment</span>
									<div className="data-row flex-row">
										<div className="data-key">Air Quality</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Pollution</div>
										<div className="data-value">{}</div>
									</div>
									<div className="data-row flex-row">
										<div className="data-key">Water Quality</div>
										<div className="data-value">{}</div>
									</div>
								</div> 
							</div>
						</div>

						<div className="tab-container flex-row" id="cost-tab-container">
							Coming soon.
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
		
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedbackModal);
