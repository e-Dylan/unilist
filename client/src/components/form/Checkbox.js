import React, { useState, useEffect, useRef } from "react";
import '../styles/SearchArea.scss';
import '../styles/JoinModal.scss';

// Images/Icons

export default function Checkbox({ title }) {

	return (
		<div className="email-sub flex-row">
			<input className="input-checkbox" type="checkbox" />
			<span className="desc-text">{title}</span>
		</div>
	);
}
