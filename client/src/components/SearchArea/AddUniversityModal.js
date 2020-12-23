import React, { useState, useEffect } from "react";

import '../styles/AddUniversityModal.scss';

import * as api from '../../api';

// Components

// Images/Icons
// import addUniversityIcon from '../../resources/search-area/add-university-image.jpg';
import addUniversityIcon from '../../resources/search-area/uoft.gif';

export function showAddUniModal(bool) {
	const modal = document.querySelector(".modal");
	if (bool) {
		if (!modal.classList.contains('active'))
			modal.classList.add('active');
	} else {
		if (modal.classList.contains('active'))
			modal.classList.remove('active');
	}
}

function AddUniversityModal(props) {
  return (
    <div className="modal flex-row">
		<div className="info-col flex-col">
			<img className="add-image" src={addUniversityIcon} />
			<div className="add-info">
				Don't see your university on the list? <a>Let me know.</a>
			</div>
		</div>
		<div className="form-col">
			<div className="add-uni-form flex-col">
				<h1 className="title-text">Add a University</h1>
				<input className="modal-input form-control" id="u-name" placeholder="University Name"></input>
				<input className="modal-input form-control" id="u-tags" placeholder="University Tags"></input>
				<input className="unilist-button add-button" type="submit" value="Add" onClick={() => {
					const name = document.getElementById("u-name").value
					const tags = document.getElementById("u-tags").value

					api.addUniversityToDb(JSON.stringify({
						name,
						tags,
					}));

					showAddUniModal(false);
				}}></input>
			</div>
		</div>
	</div>
  );
}

export default AddUniversityModal;
