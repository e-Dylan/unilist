import React, { useState, useEffect, useRef } from "react";
import '../../styles/SearchArea.scss';

// Images/Icons

export default function RatingBar(props) {

	return (
		<div className="rating-container flex-row">
			<span className="rating-title">{props.title}</span>
			<div className="rating-bar-container">
				<div className="rating-bar-fill" style={{width: props.rating + "%"}}></div>
			</div>
		</div>
	);
}
