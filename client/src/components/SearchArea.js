import React, { useState, useEffect } from "react";
import './styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions (setters)
import { setUniversityListState } from '../redux/actions/setUniversityListState';

// Components
import SearchFilters from "./SearchArea/SearchFilters";
import SearchResults from "./SearchArea/SearchResults";

// Images/Icons

function SearchArea(props) {

	return (
		<div className="search-area-container">
			
			<SearchFilters />

			<SearchResults />

			<div className="search-sidebar flex-col">
				<span>sidebar</span>
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
		setUniversityListState: setUniversityListState
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchArea);
