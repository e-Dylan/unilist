import React, { useState, useEffect, useRef } from "react";
import '../../styles/SearchArea.scss';

import { RatingContainer, RatingBarContainer } from './UniversityDataModal.components';

// Images/Icons

export default function RatingBar(props) {

	return (
		<RatingContainer>
			<span className="rating-title">{props.title}</span>
			<RatingBarContainer>
				<div className="rating-bar-fill" style={{width: props.rating + "%"}}></div>
			</RatingBarContainer>
		</RatingContainer>
	);
}
