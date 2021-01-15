import React, { useState, useEffect } from "react";
import $ from 'jquery';

import * as uniApi from '../../../api/uniApi';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions (setters)
import { setUniversityListState } from '../../../redux/actions/setUniversityListState';

import '../../../App.scss';
import '../../styles/SearchArea.scss';

// Styled Components
import { SearchFiltersContainer } from './SearchFilters.components';
import { FilterSectionContainer } from './SearchFilters.components';
import { FilterOptionsContainer } from './SearchFilters.components';

// Components;
export const searchTagFilters = {
	location_filters: {
		continent: "Continent",
		country: "Country",
		province_state: "Prov./State",
	},
	where_filters: {
		north_america: "North America",
		europe: "Europe",
		asia: "Asia",
		oceania: "Oceana",
		canada: "Canada",
		united_states: "United States",
		north_america2: "North America",
		europe2: "Europe",
		asia2: "Asia",
		oceania2: "Oceana",
		canad2a: "Canada",
		united_states2: "United States",
	},
	community_filters: {
		school_spirit: "School spirit",
		lots_clubs: "Lots of clubs",
		student_senate: "Student senate",
		outreach_programs: "Outreach programs",
		virtual_meets: "Virtual meets",
		sports_spirit: "Sports spirit"
	},
	area_filters: {
		lots_of_restaurants: "Lots of restaurants",
		student_city: "Student city",
		low_covid_cases: "Low COVID cases",
		metropolitan_city: "Metropolitan city",
		lots_of_nature: "Lots of nature",
		good_transit: "Good transit",
	},
	qualities_filters: {
		good_internet: "Good internet",
		obtainable_scholarships: "Obtainable scholarships",
		good_food: "Good food",
		great_parties: "Great parties",
		lots_of_parties: "Lots of parties",
		good_night_life: "Good night life", // show night-life in a rating bar -> bad, okay, good, great w/ colours and divided bars.
		entrance_awards: "Entrance awards",
		big_dorms: "Big dorms",
		privacy: "Privacy",
		has_gym: "Has gym",
		beautiful_buildings: "Beautiful buildings",
	}
}

// import { universities } from '../../universities.js';

function SearchFilters(props) {
	const [tags, setTags] = useState([]);

	const setAllUniversities = () => {
		uniApi.fetchAllUniversities()
			.then(universities => {
				for (var i = 0; i < universities.length; i++) {
					if (typeof universities[i].university_data == "string")
						universities[i].university_data = JSON.parse(universities[i].university_data);
				}
				// console.log(universities)
				props.setUniversityListState(universities);
			})
	}

	// Initialize state with all universities.
	useEffect(() => {
		// console.log('Setting search results to ALL universities at [SearchFilters.js] useEffect init.');
		setAllUniversities();
	}, [])

	const addTag = async(tag) => {
		await tags.push(tag.toLowerCase());
		uniApi.fetchUniversities(tags)
			.then(universities => {
				for (var i = 0; i < universities.length; i++) {
					if (typeof universities[i].university_data == "string")
						universities[i].university_data = JSON.parse(universities[i].university_data);
				}
				console.log(universities);
				props.setUniversityListState(universities);
			})
	}

	const removeTag = (tag) => {
		if (tags.length === 1)
			// last tag being removed, go back to all universities.
			setAllUniversities();
		else
			uniApi.fetchUniversities(tags)
				.then(universities => {
					for (var i = 0; i < universities.length; i++) {
						if (typeof universities[i].university_data == "string")
							universities[i].university_data = JSON.parse(universities[i].university_data);
					}
					props.setUniversityListState(universities);
				})

		const i = tags.indexOf(tag.toLowerCase());
		if (i > -1) 
			tags.splice(i, 1);
	}

	const toggleButton = (buttonId, filterTag) => {
		const filterButton = document.getElementById(buttonId);
		if (filterButton.classList.contains('button-active')) {
			// disable button

			filterButton.classList.remove('button-active');
			// console.log(filterButton.classList)
			// remove its tag value from the tags array
			removeTag(filterTag);
		} else {
			// enable this button.
			filterButton.classList.add('button-active');
			addTag(filterTag);
			// console.log('added class');
			// console.log(filterButton.classList)
		}
		console.log(tags);
		
	}

	return (
		<SearchFiltersContainer>
			<div className="filters-title flex-col">
				{/* <span className="title-text">Add filters [+]</span> */}
				<span className="desc-text">Narrow down your results to see what fits for you.</span>
			</div>

			<FilterSectionContainer>
				<span className="filter-title">Location</span>
				<FilterOptionsContainer>
					{ Object.keys(searchTagFilters.location_filters).map((item, index) => {
						return (
							<div className="filter-button location-button flex-col" key={item} id={"locationButton"+index}>{searchTagFilters.location_filters[item]}</div>
						)
					})}
				</FilterOptionsContainer>
			</FilterSectionContainer>

			<FilterSectionContainer>
				<span className="filter-title">Costs</span>
				<FilterOptionsContainer>
					<div className="filter-button location-button flex-col">Low</div>
					<div className="filter-button location-button flex-col">Moderate</div>
					<div className="filter-button location-button flex-col">High</div>
				</FilterOptionsContainer>
			</FilterSectionContainer>

			<FilterSectionContainer>
				<span className="filter-title">Community</span>
				<FilterOptionsContainer>
					{ Object.keys(searchTagFilters.community_filters).map((item, index) => {
						return (
							<div className="filter-button flex-col" key={item} id={"communityButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("communityButton"+index, searchTagFilters.community_filters[item]);
								// addTag(location_filters[item]);
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
							<div className="filter-button flex-col" key={item} id={"areaButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("areaButton"+index, searchTagFilters.area_filters[item]);
								// addTag(location_filters[item]);
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
							<div className="filter-button flex-col" key={item} id={"qualitiesButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("qualitiesButton"+index, searchTagFilters.qualities_filters[item]);
								// addTag(location_filters[item]);
							}}>{searchTagFilters.qualities_filters[item]}</div>
						)
					})}
				</FilterOptionsContainer>
			</FilterSectionContainer>
		</SearchFiltersContainer>
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
		setUniversityListState: setUniversityListState
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchFilters);
