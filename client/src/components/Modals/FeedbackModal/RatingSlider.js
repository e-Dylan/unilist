import React, { useState, useEffect, useRef } from "react";
import activeUniversityReducer from "../../../redux/reducers/activeUniversityReducer";
import '../../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { setEditingUniversityState } from "../../../redux/actions/setEditingUniversityState";

// Images/Icons

const RatingSlider = (props) => {

	const inputEl = useRef(null);
	const labelEl = useRef(null);

	// ADD AN ONCHANGE METHOD THAT AUTOCALCULATES OVERALL RATING SLIDER, PREVENT FROM CHANGING
	// OVERALL RATING SLIDER VALUE DIRECTLY.

	return (
		<div className="rating-container flex-row">
			<span className="rating-title">{props.labelTitle}</span>
			<input className="rating-slider" ref={inputEl} type="range" id="feedback-rating-slider" min="0" max="100" onChange={() => {
				labelEl.current.innerHTML = inputEl.current.value;
				
				// Update value in redux object whenever rating slider is changed.
				props.globalState.editingUniversityState.university_data.ratings[props.stateVal].rating = inputEl.current.value;
				props.setEditingUniversityState(props.globalState.editingUniversityState);
			}} />
			<label id="overall-rating-label" className="rating-slider-label" ref={labelEl}>0</label>
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
		setEditingUniversityState: setEditingUniversityState,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RatingSlider);
