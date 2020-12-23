import React, { useState, useEffect } from "react";
import $ from 'jquery';

import '../../App.scss';
import '../styles/SearchArea.scss';

// Components;

const location_filters = {
	continent: "Continent",
	country: "Country",
	province_state: "Province/State",
};
const where_filters = {
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
};

const community_filters = {
	school_spirit: "School spirit",
	lots_clubs: "Lots of clubs",
	student_senate: "Student senate",
	outreach_programs: "Outreach programs",
	virtual_meets: "Virtual meets",
	sports_spirit: "Sports spirit"
};

const area_filters = {
	lots_of_restaurants: "Lots of restaurants",
	student_city: "Student city",
	low_covid_cases: "Low COVID cases",
	metropolitan_city: "Big city",
	lots_of_nature: "Lots of nature",
	good_transit: "Good transit",
}

const qualities_filters = {
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
};

// import { universities } from '../../universities.js';

function SearchFilters() {
	const [tags, setTags] = useState([]);
	const [unilist, setUnilist] = useState([
		{
			name: "University of Waterloo",
			country: "Canada",
			province: "Ontario",
			city: "Waterloo",
			cost: "High",
		},
		{
			name: "University of Toronto",
			country: "Canada",
			province: "Ontario",
			city: "Toronto",
			cost: "High",
		},
	]);
	
	const addTag = async(tag) => {
		await tags.push(tag.toLowerCase());
		fetchUniversities(JSON.stringify(tags));
	}

	const removeTag = (tag) => {
		const i = tags.indexOf(tag.toLowerCase());
		if (i > -1) 
			tags.splice(i, 1);
		fetchUniversities(JSON.stringify(tags));
	}

	// Move to api
	const fetchUniversities = async (tags) => {
		var universities = fetch('http://localhost:1337/api/searchUniversities', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: tags
		})
		.then(res => res.json())
		.then(result => {
			console.log(result);
		})
	}

	const toggleButton = (buttonId, filterTag) => {
		const filterButton = document.getElementById(buttonId);
		if (filterButton.classList.contains('active')) {
			// disable button
			filterButton.classList.remove('active');
			// remove its tag value from the tags array
			removeTag(filterTag);
		} else {
			// enable this button.
			filterButton.classList.add('active');
			addTag(filterTag);
		}
		
	}

	return (
		<div className="search-filters flex-col">
			<div className="filters-title flex-col">
				{/* <span className="title-text">Add filters [+]</span> */}
				<span className="desc-text">Narrow down your results to see what fits for you.</span>
			</div>
			<div className="filter-section flex-col">
				<span className="filter-title">Location</span>
				<div className="filter-options flex-row">
					{ Object.keys(location_filters).map((item, index) => {
						return (
							<div className="filter-button location-button flex-col" key={item} id={"locationButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("locationButton"+index, location_filters[item]);
								// addTag(location_filters[item]);
							}}>{location_filters[item]}</div>
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
					{ Object.keys(community_filters).map((item, index) => {
						return (
							<div className="filter-button flex-col" key={item} id={"communityButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("communityButton"+index, community_filters[item]);
								// addTag(location_filters[item]);
							}}>{community_filters[item]}</div>
						)
					})}
				</div>
			</div>
			<div className="filter-section flex-col">
				<span className="filter-title">Surrounding City</span>
				<div className="filter-options flex-row">
					{ Object.keys(area_filters).map((item, index) => {
						return (
							<div className="filter-button flex-col" key={item} id={"areaButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("areaButton"+index, area_filters[item]);
								// addTag(location_filters[item]);
							}}>{area_filters[item]}</div>
						)
					})}
				</div>
			</div>
			<div className="filter-section flex-col">
				<span className="filter-title">Qualities of Life</span>
				<div className="filter-options flex-row">
					{ Object.keys(qualities_filters).map((item, index) => {
						return (
							<div className="filter-button flex-col" key={item} id={"qualitiesButton"+index} onClick={ async() => {
								// var tempTags = tags;
								toggleButton("qualitiesButton"+index, qualities_filters[item]);
								// addTag(location_filters[item]);
							}}>{qualities_filters[item]}</div>
						)
					})}
				</div>
			</div>
		</div>
	);
}

export default SearchFilters;
