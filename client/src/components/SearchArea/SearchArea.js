import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';
import theme from '../../styles/theme';
import '../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions (setters)
import { setUniversityListState } from '../../redux/actions/setUniversityListState';

// Components
import SearchFilters from "./SearchFilters/SearchFilters";
import SearchResults from "./SearchResults/SearchResults";

// Images/Icons

// Styled Components

const SearchAreaContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	background-color: ${theme.colors.brand.gray["main"]};

	${breakpoints("flex-direction", "", [
		{ 1300: "column" },
	])}
`;

function SearchArea(props) {

	return (
		<SearchAreaContainer>
			<SearchFilters />
			<SearchResults />

			{/* <div className="sidebar-container flex-col">
				<span>sidebar</span>
			</div> */}

		</SearchAreaContainer>
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
