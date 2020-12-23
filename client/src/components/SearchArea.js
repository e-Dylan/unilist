import React, { useState, useEffect } from "react";
import './styles/SearchArea.scss';

// Components
import SearchFilters from "./SearchArea/SearchFilters";
import AddUniversityModal from './SearchArea/AddUniversityModal';
import { showAddUniModal } from './SearchArea/AddUniversityModal';

// Images/Icons

function SearchArea(props) {
  return (
    <div className="search-area-container">
		<SearchFilters />
		<div className="search-results flex-col">
			<div className="search-results-nav flex-row">
				<button className="unilist-button" onClick={() => showAddUniModal(true)}>Add University</button>
				<button className="unilist-button">Send Feedback</button>
			</div>
			<span>results</span>
			<AddUniversityModal />
		</div>
		<div className="search-sidebar flex-col">
			<span>sidebar</span>
		</div>
	</div>
  );
}

export default SearchArea;
