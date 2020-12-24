import React, { useState, useEffect } from "react";
import '../styles/SearchArea.scss';

// Components
import AddUniversityModal from './AddUniversityModal';
import { showAddUniModal } from './AddUniversityModal';

// Images/Icons

function SearchResults(props) {
  return (
    <div className="search-results-container flex-col">
			<div className="search-results-nav flex-row">
				<button className="unilist-button" onClick={() => showAddUniModal(true)}>Add University</button>
				<button className="unilist-button">Send Feedback</button>
			</div>
			<div className="search-results-items">

				

			</div>

			{/* Absolute positioned */}
			<AddUniversityModal />
	</div>
  );
}

export default SearchResults;
