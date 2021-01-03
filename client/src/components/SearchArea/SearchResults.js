import React, { useState, useEffect, useRef, createRef } from "react";
import '../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions (setters)
import { setUniversityListState } from '../../redux/actions/setUniversityListState';
import { setActiveUniversityState } from '../../redux/actions/setActiveUniversityState';

// Weather icons
import ReactAnimatedWeather from 'react-animated-weather';

// Components
import UniversityDataModal from "./UniversityDataModal";
import { showUniversityDataModal } from './UniversityDataModal';
import AddUniversityModal from './AddUniversityModal';
import { showAddUniModal } from './AddUniversityModal';
import { showFeedbackModal } from './FeedbackModal';

// Images/Icons
import starIcon from '../../resources/search-area/search-results/star.png';

function SearchResults(props) {

	const nullUniversityData = {
		id: 0,
		name: undefined,
		tags: undefined,
		university_data: {
			education: {
				rating: 0,
				desc: "undefined",
			},
			covid19: {
				rating: 0,
				cases: {
					rating: 0,
					total: 0,
					past_week: 0,
				},
				qol: {
					rating: 0,
					desc: "undefined",
				}
			},
			the_city: {
				rating:	0
			},
			food: {
				rating: 0,
			},
			amenities: {
				rating: 0,
			},
			sports: {
				rating: 0,
				desc: "undefined",
			},
			transportation: {
				rating: 0,
			},
			academic_resources: {
				rating: 0,
			},
			parties: {
				rating: 0,
				frequency: { rating: 0, desc: "Uncertain" },
			},
			online_resources: {
				rating: 0,
			},
			professor_interaction: {
				rating: 0,
				desc: "Uncertain",
			},
			cost_value: {
				rating: 0,
			},
			fun: {
				rating: 0
			},
			campus: {
				rating: 0
			},
			people_community: {
				rating: 0
			},
			internet: {
				rating: 0,
				desc: "High speed"
			},
			clubs_extracurriculars: {
				rating: 0,
			},
			restaurants: {
				rating: 0,
			},
			academic_services: {
				rating: 0,
			},
			fitness_gym: {
				rating: 0
			},
			weather: {
				rating: 0,
				now: {
					rating: 0,
					desc: "Snowing",
				},
				average: {
					rating: 0,
					desc: "Warm summers, cold winters.",
				}
			},
			facilities: {
				rating: 0
			},
			research: {
				rating: 0
			},
		},
		image_path: "University_of_Toronto.png"
	};

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

	const getWeatherIcon = (weatherDesc) => {
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

	const weatherAPIKey = '50d9b938ed3fb013a16ec3ed594ea7dc';

	// useEffect(() => {
	// 	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=5&lon=32.79899394383519&appid=${weatherAPIKey}`)
	// 			.then(res => res.json())
	// 			.then(async res => {
	// 				console.log(res)
	// 			});
	// }, [])

	const getTotalCost = (cost) => {
		if (cost !== null) {
			var total = 0;
			const keys = Object.keys(cost);
			for (var i = 0; i < keys.length; i++) {
				total += parseInt(cost[keys[i]]);
			}
			return total || 0;
		}
	}

	return (
		<div className="search-results-container flex-col">
				<div className="search-results-nav flex-row">
					{/* <button className="unilist-button" onClick={() => showAddUniModal(true)}>Add University</button> */}
					<button className="unilist-button" onClick={() => showFeedbackModal(true)}>Make Edit</button>
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
											item.university_data = nullUniversityData.university_data;
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
										<a>{item.university_data.ratings.overall_rating}</a>
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
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchResults);
