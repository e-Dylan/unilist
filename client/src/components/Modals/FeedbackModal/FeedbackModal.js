import React, { useState, useRef } from "react";
import $ from "jquery";

import '../../styles/AddUniversityModal.scss';
import '../../styles/UniversityDataModal.scss';
import '../../styles/FeedbackModal.scss';
import '../../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { setActiveUniversityState } from "../../../redux/actions/setActiveUniversityState";
import { setEditingUniversityState } from "../../../redux/actions/setEditingUniversityState";
import { setFeedbackTagsState } from '../../../redux/actions/setFeedbackTagsState';

// api
import * as uniApi from '../../../api/uniApi'; 

// Components
import RatingSlider from './RatingSlider';
import RatingSliderHalf from "./RatingSliderHalf";
import DataRow from './DataRow';
import DataTable from './DataTable';

import IconButton from '../../Button/IconButton';
import { AiOutlineCloseCircle } from "react-icons/ai";

// Styled Components
import { FilterSectionContainer, FilterOptionsContainer } from '../../SearchArea/SearchFilters/SearchFilters.components';
import { TitleSection, FeedbackCards, FeedbackColumn, FeedbackDataColumn,
	 	 FeedbackModalContainer, InfoCard, UniversityInfoNav, RatingSlidersWrapper, 
	 	 RatingSliderContainer 
} from './FeedbackModal.components';
import { HeaderMessageContainer, TableColumn } from '../UniversityDataModal/UniversityDataModal.components';
import { CloseButtonContainer } from '../JoinModal/JoinModal.components';

// Images/Icons
import unilistLogo from '../../../resources/logo/unilist-logo.png';
import loadingIcon from '../../../resources/feedback-modal/loading.svg';

import { searchTagFilters } from '../../SearchArea/SearchFilters/SearchFilters';

function FeedbackModal(props) {

	const feedbackColRef = useRef(null)
	const dataColRef = useRef(null);

	const editingRatings = props.globalState.editingUniversityState.university_data.ratings;
	const tags = props.globalState.feedbackTagsState;

	const [loading, setLoading] = useState(false);

	$(document).mouseup(e => {
		var modalBg = $("#feedback-modal-bg");
		// if target isnt in display window:
		if (modalBg.is(e.target))
			showFeedbackModal(false);
	
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
			if (button.classList.contains('button-active')) button.classList.remove('button-active');
		})
		// Clear feedback tags state.
		props.setFeedbackTagsState([]);	
	}

	const showFeedbackModal = (bool) => {
		const feedbackModal = document.getElementById('uni-feedback-modal');
		const modalBg = document.getElementById('feedback-modal-bg');
		const tagsMenu = document.querySelector('.tags-menu');
		try {
			if (bool) {
				// Set active item data, show modal.
				if (!feedbackModal.classList.contains('modal-active')) feedbackModal.classList.add('modal-active');
				if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
			} else {
				// Hide modal.
				if (feedbackModal.classList.contains('modal-active')) feedbackModal.classList.remove('modal-active');
				if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
				if (tagsMenu.classList.contains('modal-active')) tagsMenu.classList.remove('modal-active');
				// clearFeedbackModal();
			}
		} catch (err) {
			
		}
	}

	// const updateEditingStateValues = () => {
	// 	const ratingSliders = document.querySelectorAll('.rating-slider')
	// 	ratingSliders.forEach(slider => {

	// 	})
	// }

	const setActiveTab = (tabId) => {
		document.querySelectorAll('.feedback-modal-tab-button').forEach(ele => {
			if (ele.classList.contains('tab-button-active')) ele.classList.remove('tab-button-active');
		});

		const tabButton = document.getElementById(tabId);
		tabButton.classList.add('tab-button-active');
		
		document.querySelectorAll('.feedback-modal-tab').forEach(item => {
			item.classList.remove('tab-active');
		});
		switch (tabId) {
			case "feedback-modal-ratings-tab-button": 
				document.getElementById('feedback-modal-ratings-tab-container').classList.add('tab-active');
				break;
			case "feedback-modal-data-tab-button": 
				document.getElementById('feedback-modal-data-tab-container').classList.add('tab-active');
				break;
			case "feedback-modal-cost-tab-button": 
				document.getElementById('feedback-modal-cost-tab-container').classList.add('tab-active');
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
		var editingState = {...props.globalState.editingUniversityState};
		editingState.tags = tags;
		props.setEditingUniversityState(editingState);
		console.log(props.globalState.editingUniversityState);
	}

	const removeTag = (tag) => {
		const i = tags.indexOf(tag.toLowerCase());
		if (i > -1) 
			tags.splice(i, 1);

		var editingState = {...props.globalState.editingUniversityState};
		editingState.tags = tags;
		props.setEditingUniversityState(editingState);
		console.log(tags);
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
		// console.log(tags);
	}

	const showModalContent = (bool) => {
		const feedbackCol = feedbackColRef.current;
		const dataCol = dataColRef.current;

		if (bool) {
			feedbackCol.classList.remove('hidden');
			dataCol.classList.remove('hidden');
		} else {
			feedbackCol.classList.add('hidden');
			dataCol.classList.add('hidden');
		}
	}

	const setLoadState = (bool) => {
		const feedbackModal = document.getElementById('uni-feedback-modal')
		const loadingBox = document.querySelector('.loading-box');
		if (bool) {
			showModalContent(false);
			feedbackModal.classList.add('loading-modal');
			loadingBox.classList.remove('hidden');
		} else {
			showFeedbackModal(false);
			// Wait until feedback modal isn't showing to reshow hidden content.
			setTimeout(() => {
				loadingBox.classList.add('hidden');
				// Remove success state styles.
				$('.checkmark').toggle(false);
				$('.loading-box').removeClass('loading-success');
				$('.loading-box').removeClass('loading-failure');
				$('.result-text').text("");
				// $('.result-text').addClass("hidden");
				document.querySelector('.result-text').classList.add('hidden');
				// Remove loading state modal dimensions.
				feedbackModal.classList.remove('loading-modal');
				showModalContent(true);
			}, 500)
			
		}
	}

	const setLoadSuccess = (bool) => {
		console.log("SUCCES");
		if (bool) {
			setTimeout(() => {
				$('.result-text').text("Successfully saved.");
				$('.checkmark').toggle();
				// $('.result-text').removeClass("hidden");
				document.querySelector('.result-text').classList.remove('hidden');
				$('.loading-box').addClass('loading-success')
				setTimeout(() => {
					setLoadState(false);
				}, 1000);
			}, 1000)
		} else {
			// enable failure animation.
			setTimeout(() => {
				$('.result-text').text("Save was unsuccessful.\nPlease try again.");
				$('.ui-error').toggle(); // x animation (when I get one)
				$('.result-text').removeClass("hidden");
				$('.loading-box').addClass('loading-failure')
				setTimeout(() => {
					setLoadState(false);
				}, 1000);
			}, 1000)
		}
	}

	return (
		<div className="modal-bg" id="feedback-modal-bg">
			<FeedbackModalContainer className="modal" id="uni-feedback-modal">
				<div className="loading-box hidden">
					<img src={loadingIcon} />

					<div className="checkmark draw" />

					<div className="ui-error">

					</div>
					
					<div className="result-text hidden">
						
					</div>
				</div>

				<CloseButtonContainer>
					<IconButton pos="absolute" right="30px" top="10px" icon={AiOutlineCloseCircle} size="40px" color="#a83256" onClick={() => {
						showFeedbackModal(false);
					}} />
				</CloseButtonContainer>

				<FeedbackColumn className="flex-col" ref={feedbackColRef}>
					<TitleSection>Update the Data</TitleSection>
					{/* <CloseButton>
						<img src={closeButton} />
					</CloseButton> GET A CLOSE BUTTON ICON BUTTON CHAKRA? */}
					<FeedbackCards>
						<InfoCard className="shadow-light">
							<p className="info-desc-text">
								This app works by crowdsourcing information from the people who know it best: <span style={{color: 'rgba(235, 69, 110, 1)'}}><br/>students.</span>
							</p>
						</InfoCard>
						<InfoCard className="shadow-light">
							<p className="info-desc-text">
								Know a missing school? <span style={{color: 'rgba(235, 69, 110, 1)'}}><br/>Add it to our list.</span>
							</p>
						</InfoCard>
						<InfoCard className="shadow-light">
							<p className="info-desc-text">
								Know anything more accurate about an existing school? <span style={{color: 'rgba(235, 69, 110, 1)'}}><br/>Update it.</span>
							</p>
						</InfoCard>
					</FeedbackCards>
				</FeedbackColumn>
				<FeedbackDataColumn className="flex-col" ref={dataColRef}>
					<div className="data-col">
						<div className="header-content">
							<div className="tab-bar flex-row">
								<div className="feedback-modal-tab-button tab-button-active" id="feedback-modal-ratings-tab-button" onClick={() => setActiveTab("feedback-modal-ratings-tab-button")}>
									Ratings
								</div>
								<div className="feedback-modal-tab-button" id="feedback-modal-data-tab-button" onClick={() => setActiveTab("feedback-modal-data-tab-button")}>
									Data
								</div>
								<div className="feedback-modal-tab-button" id="feedback-modal-cost-tab-button" onClick={() => setActiveTab("feedback-modal-cost-tab-button")}>
									Costs
								</div>
							</div>

							<HeaderMessageContainer disappear={false}>
								<div className="uni-data-header-image">
									<img src={unilistLogo} />
								</div>
								<span>Update any fields to keep them up to date.</span>
							</HeaderMessageContainer>

							<UniversityInfoNav>
								<div className="data-row flex-row">
									<span className="uni-label">University</span>
									<input className="feedback-input" id="university-name-input" placeholder="University name" onChange={e => {
										props.globalState.editingUniversityState.name = e.target.value;
										props.setEditingUniversityState(props.globalState.editingUniversityState);
									}} />
								</div>
								<div className="data-row flex-row">
									{/* <span className="uni-label">Tags</span> */}
									<button className="unilist-button tags-tab-button" onClick={() => {
										showTagsMenu(true);
									}}>Add Tags</button>
								</div>
							</UniversityInfoNav>
						</div>

						{/* TAGS DROP MENU */}
						<div className="tab-container tag-container flex-col">
							<div className="tags-menu flex-col">
								<div className="search-filters flex-col">
									<button className="tags-close-button" onClick={() => showTagsMenu(false)}></button>
									<FilterSectionContainer>
										<span className="filter-title">Location</span>
										<FilterOptionsContainer>
											{ Object.keys(searchTagFilters.location_filters).map((item, index) => {
												return (
													<div className="filter-button feedback-tag-button location-button flex-col" key={item} id={"locationButton"+index}>{searchTagFilters.location_filters[item]}</div>
												)
											})}
										</FilterOptionsContainer>
									</FilterSectionContainer>
									<FilterSectionContainer>
										<span className="filter-title">Costs</span>
										<FilterOptionsContainer>
											{Object.keys(searchTagFilters.cost_filters).map((item, index) => {
												return (
													<div className="filter-button flex-col" key={item} id={"costButton"+index} onClick={() => {
														toggleButton("costButton"+index, searchTagFilters.cost_filters[item]);
														// addTag(location_filters[item]);
													}}>{searchTagFilters.cost_filters[item]}</div>
												)
											})}
										</FilterOptionsContainer>
									</FilterSectionContainer>
									<FilterSectionContainer>
										<span className="filter-title">Community</span>
										<FilterOptionsContainer>
											{ Object.keys(searchTagFilters.community_filters).map((item, index) => {
												return (
													<div className="filter-button feedback-tag-button flex-col" key={item} id={"feedbackModalCommunityButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("feedbackModalCommunityButton"+index, searchTagFilters.community_filters[item]);
														// addTag(searchTagFilters.location_filters[item]);
													}}>{searchTagFilters.community_filters[item]}</div>
												)
											})}
										</FilterOptionsContainer>
									</FilterSectionContainer>
									<FilterSectionContainer>
										<span className="filter-title">Surrounding City</span>
										<FilterOptionsContainer>
											{ Object.keys(searchTagFilters.area_filters).map((item, index) => {
												return (
													<div className="filter-button feedback-tag-button flex-col" key={item} id={"feedbackModalAreaButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("feedbackModalAreaButton"+index, searchTagFilters.area_filters[item]);
														// addTag(searchTagFilters.location_filters[item]);
													}}>{searchTagFilters.area_filters[item]}</div>
												)
											})}
										</FilterOptionsContainer>
									</FilterSectionContainer>
									<FilterSectionContainer>
										<span className="filter-title">Qualities of Life</span>
										<FilterOptionsContainer>
											{ Object.keys(searchTagFilters.qualities_filters).map((item, index) => {
												return (
													<div className="filter-button feedback-tag-button flex-col" key={item} id={"feedbackModalQualitiesButton"+index} onClick={ async() => {
														// var tempTags = tags;
														toggleButton("feedbackModalQualitiesButton"+index, searchTagFilters.qualities_filters[item]);
														// addTag(searchTagFilters.location_filters[item]);
													}}>{searchTagFilters.qualities_filters[item]}</div>
												)
											})}
										</FilterOptionsContainer>
									</FilterSectionContainer>
								</div>
							</div>
						</div>

						{/* Show each tab container depending on which is active */}

						{/* RATINGS TAB */}
						<RatingSlidersWrapper className="tab-container feedback-modal-tab tab-active" id="feedback-modal-ratings-tab-container">
							<RatingSlider stateVal={"overall_rating"} labelTitle="Overall Rating" />
							<RatingSlider stateVal={"cost_value"} labelTitle="Cost/Value" />
							<RatingSlider stateVal={"education"} labelTitle="Education" />
							<RatingSlider stateVal={"fun"} labelTitle="Fun" />
							<RatingSliderContainer>
								<span className="rating-title">COVID-19</span>
								<div className="rating-bar">
									<RatingSliderHalf stateVal={"covid19"} labelTitle="Cases" />
									<RatingSliderHalf stateVal={"covid19"} labelTitle="QoL" />
								</div>
							</RatingSliderContainer>
							<RatingSlider stateVal={"campus"} labelTitle="Campus" />
							<RatingSlider stateVal={"the_city"} labelTitle="The City" />
							<RatingSlider stateVal={"people_community"} labelTitle="People/Community" />
							<RatingSlider stateVal={"food"} labelTitle="Food" />
							<RatingSlider stateVal={"internet"} labelTitle="Internet" />
							<RatingSlider stateVal={"amenities"} labelTitle="Amenitites" />
							<RatingSlider stateVal={"clubs_extracurriculars"} labelTitle="Clubs/Ext. Currs." />
							<RatingSlider stateVal={"sports"} labelTitle="Sports" />
							<RatingSlider stateVal={"restaurants"} labelTitle="Restaurants" />
							<RatingSlider stateVal={"transportation"} labelTitle="Transportation" />
							<RatingSlider stateVal={"academic_services"} labelTitle="Academic Services" />
							<RatingSlider stateVal={"academic_resources"} labelTitle="Academic Resources" />
							<RatingSlider stateVal={"fitness_gym"} labelTitle="Fitness/Gym" />
							<RatingSliderContainer>
								<span className="rating-title">Parties</span>
								<div className="rating-bar">
									<RatingSliderHalf stateVal={"parties"} labelTitle="Frequency" />
									<RatingSliderHalf stateVal={"parties"} labelTitle="Quality" />
								</div>
							</RatingSliderContainer>
							<RatingSliderContainer>
								<span className="rating-title">Weather</span>
								<div className="rating-bar">
									<RatingSliderHalf stateVal={"weather"} labelTitle="Now" />
									<RatingSliderHalf stateVal={"weather"} labelTitle="Average" />
								</div>
							</RatingSliderContainer>
							<RatingSlider stateVal={"online_resources"} labelTitle="Online Resources" />
							<RatingSlider stateVal={"facilities"} labelTitle="Facilities" />
							<RatingSlider stateVal={"professor_interaction"} labelTitle="Prof. Interaction" />
							<RatingSlider stateVal={"research"} labelTitle="Research" />
						</RatingSlidersWrapper>
						
						{/* DATA TAB */}
						<div className="tab-container feedback-modal-tab flex-row" id="feedback-modal-data-tab-container">
							<TableColumn>
								<DataTable title="Costs ($/year)" table="costs" rows={[
									["Tuition", "tuition"], 
									["Residence", "residence"],
									["Mealplan/Food", "mealplan_food"],
									["Books/Supplies", "books_supplies"],
									["Transportation", "transportation"],
								]} />
								<DataTable title="The School" table="the_school" rows={[
									["Known For", "known_for"],
									["Campus Size", "campus_size"],
									["Campus Type", "campus_type"],
									["Students", "students"],
									["Equipment", "equipment"],
									["Community", "community"],
								]} />
								<DataTable title="Class Types" table="class_types" rows={[
									["Class Sizes (Avg)", "class_sizes"],
									["Classrooms", "classrooms"],
									["Classes", "classes"],
								]} />
							</TableColumn>
							<TableColumn>
								<DataTable title="Culture" table="culture" rows={[
									["Diversity", "diversity"],
									["Majority", "majority"],
									["Average Class", "average_class"],
								]} />
								<DataTable title="Awards" table="awards" rows={[
									["Annual Value", "annual_value"], 
									["Scholarships", "scholarships"],
									["Bursaries", "bursaries"],
									["Applied/Auto", "applied_auto"],
									["Entrance/During", "entrance_during"],
								]} />
								<DataTable title="Jobs/Co-op" table="jobs_coop" rows={[
									["Co-op Service", "coop_service"], 
									["Reputation", "reputation"],
									["Average Salary", "average_salary"],
								]} />
							</TableColumn>
							<TableColumn>
								<DataTable title="The City" table="the_city" rows={[
									["City Type", "city_type"], 
									["Population", "popultion"], 
									["Public Transit", "public_transit"],
								]} />
								<DataTable title="Surroundings" table="surroundings" rows={[
									["Restaurants", "restaurants"], 
									["Bars/Clubs", "bars_clubs"],
									["Nature", "nature"],
									["Near Water", "near_water"],
								]} />
								<DataTable title="Environment" table="environment" rows={[
									["Air Quality", "air_quality"],
									["Pollution", "pollution"],
									["Water Quality", "water_quality"],
								]} />
							</TableColumn>
						</div>

						<div className="tab-container feedback-modal-tab flex-row" id="feedback-modal-cost-tab-container">
							Coming soon.
						</div>
						
						<div className="modal-footer flex-row">
							<button className="unilist-button cancel-button" onClick={() => {
								showFeedbackModal(false);
							}}>Cancel</button>
							<button className="unilist-button" onClick={() => {
								// Enter loading state
								setLoadState(true);

								uniApi.editUniversity(props.globalState.editingUniversityState)
								// uniApi.addUniversityToDb(props.globalState.editingUniversityState)
									.then(res => {
										if (res && res.success) {
											setLoadSuccess(true);
											if (res.data) {
												// Update client redux state with changed uni data instead of refreshing page to call db.

											} else {
												// University didn't exist, added a new one -> no data returned

											}
										} else {
											setLoadSuccess(false);
										}
										
									})
							}}>Save</button>
						</div>
					</div>
				</FeedbackDataColumn>
			</FeedbackModalContainer>
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
		setFeedbackTagsState: setFeedbackTagsState,
		setEditingUniversityState: setEditingUniversityState,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedbackModal);
