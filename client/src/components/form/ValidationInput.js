import React, { useState, useEffect, useRef } from "react";
import '../styles/SearchArea.scss';
import '../styles/JoinModal.scss';

// Images/Icons

export default function ValidationInput({ title, type, id, placeholder, errorMessage }) {

	return (
		<div className="input-field flex-col">
			<span className="signup-header">{title}</span>
			<input className="signup-input" type={type} id={id} placeholder={placeholder} />
			{ errorMessage && <span className="signup-error-message">{errorMessage}</span> }
		</div>
	);
}
