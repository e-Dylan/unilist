import React from "react";

import './styles/SearchArea.scss';

// Images/Icons

const where_filters = {
	north_america: "North America",
	europe: "Europe",
	asia: "Asia",
	oceania: "Oceana",
	canada: "Canada",
	united_states: "United States",
}
const what_filters = {
	north_america: "North America",
	europe: "Europe",
	asia: "Asia",
	oceania: "Oceana",
	canada: "Canada",
	united_states: "United States",
}

function SearchArea(props) {
  return (
    <div className="search-area-container">
		<div className="search-filters flex-col">
			<div className="filters-title flex-col">
				<span className="title-text">Add filters [+]</span>
				<span className="desc-text">Narrow down your results to see what fits for you.</span>
			</div>
			<div className="filter-section flex-col">
				<span className="filter-title">WHERE</span>
				<div className="filter-options flex-row">
					{ Object.keys(where_filters).map((item, index) => {
						return (
							<div className="filter-div flex-col">{where_filters[item]}</div>
						)
					})}
				</div>
			</div>
			<div className="filter-section flex-col">
				<span className="filter-title">WHAT</span>
				<div className="filter-options flex-row">
					{ Object.keys(where_filters).map((item, index) => {
						return (
							<div className="filter-div flex-col">{where_filters[item]}</div>
						)
					})}
				</div>
			</div>
		</div>
		<div className="search-results flex-col">
			<span>results</span>
		</div>
		<div className="search-sidebar flex-col">
			<span>sidebar</span>
		</div>
	</div>
  );
}

export default SearchArea;
