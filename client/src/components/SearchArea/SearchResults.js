import React, { useState, useEffect } from "react";
import '../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions (setters)
import { setUniversityListState } from '../../redux/actions/setUniversityListState';

// Components
import AddUniversityModal from './AddUniversityModal';
import { showAddUniModal } from './AddUniversityModal';

// Images/Icons
import uniImage from '../../resources/university-images/uoft.jpg';
import starIcon from '../../resources/search-area/search-results/star.png';

function SearchResults(props) {
  return (
    <div className="search-results-container flex-col">
			<div className="search-results-nav flex-row">
				<button className="unilist-button" onClick={() => showAddUniModal(true)}>Add University</button>
				<button className="unilist-button">Send Feedback</button>
			</div>

			{ props.globalState.universityListState != null && props.globalState.universityListState.length > 0 &&
				<div className="search-results-items flex-row">
					{ props.globalState.universityListState.map((item, index) => {
						return (
							<div className="search-results-item" key={item.name}>
								<img className="thumbnail-image" src={uniImage}></img>
								<div className="university-title">{item.name}</div>
								<div className="overall-rating flex-row">
									<img src={starIcon} />
									<span>{item.overall}7.2</span>
								</div>
							</div>
						);
					}) }
				</div>
			}

			

			{/* Absolute positioned */}
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
		setUniversityListState: setUniversityListState
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchResults);
