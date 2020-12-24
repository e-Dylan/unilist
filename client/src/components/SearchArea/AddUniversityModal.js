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
	const [file, setFile] = useState('');
	const [fileName, setFileName] = useState('None selected.');

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
				<div className="add-image-div flex-col">
					<div className="add-image-title">Add an image</div>
					<div className="add-image-row flex-row">
						<input type="file" id="selectedFile" style={{display: 'none'}} />
						<input type="button" value="Browse..." className="unilist-button" onClick={() => {
							document.getElementById('selectedFile').click();
						}} />
						<label htmlFor="customFile">{fileName}</label>	
					</div>
					
				</div>
				<input className="unilist-button add-button" type="submit" value="Add" onClick={() => {
					const name = document.getElementById("u-name").value
					const tags = document.getElementById("u-tags").value
					
					// MAKE A GOOD WAY TO SELECT TAGS TO ENTER WITH A UNIVERSITY.
					const data = {
						
					};

					api.addUniversityToDb(JSON.stringify({
						name,
						tags,
						data,
					}));

					showAddUniModal(false);
				}}></input>
			</div>
		</div>
	</div>
  );
}

export default AddUniversityModal;
