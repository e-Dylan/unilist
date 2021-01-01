import React, { useState, useEffect, useRef } from "react";
import '../styles/SearchArea.scss';


// Images/Icons

export default function RatingSlider(props) {

	const inputEl = useRef(null);
	const labelEl = useRef(null);

	return (
		<>
			<span className="rating-title">{props.labelTitle}</span>
			<input className="rating-slider" ref={inputEl} type="range" id="overall-rating-slider" min="0" max="100" onChange={() => {
				labelEl.current.innerHTML = inputEl.current.value;
			}} />
			<label id="overall-rating-label" ref={labelEl}>0</label>
		</>
	);
}
