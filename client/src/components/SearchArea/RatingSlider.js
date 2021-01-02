import React, { useState, useEffect, useRef } from "react";
import '../styles/SearchArea.scss';


// Images/Icons

export default function RatingSlider(props) {

	const inputEl = useRef(null);
	const labelEl = useRef(null);

	// ADD AN ONCHANGE METHOD THAT AUTOCALCULATES OVERALL RATING SLIDER, PREVENT FROM CHANGING
	// OVERALL RATING SLIDER VALUE DIRECTLY.

	return (
		<>
			<span className="rating-title">{props.labelTitle}</span>
			<input className="rating-slider" ref={inputEl} type="range" id="overall-rating-slider" min="0" max="100" onChange={() => {
				labelEl.current.innerHTML = inputEl.current.value;
			}} />
			<label id="overall-rating-label" className="rating-slider-label" ref={labelEl}>0</label>
		</>
	);
}
