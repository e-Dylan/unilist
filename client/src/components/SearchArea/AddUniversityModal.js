import React, { useState } from "react";
import $ from "jquery";

import '../styles/AddUniversityModal.scss';

import * as userApi from '../../api/userApi';

// Components

// Images/Icons
// import addUniversityIcon from '../../resources/search-area/add-university-image.jpg';
import addUniversityIcon from '../../resources/search-area/uoft.gif';

export function showAddUniModal(bool) {
	const modalBg = document.getElementById('add-modal-bg');
	const modal = document.getElementById("add-university-modal");
	if (bool) {
		if (!modal.classList.contains('modal-active')) modal.classList.add('modal-active');
		if (!modalBg.classList.contains('modal-active')) modalBg.classList.add('modal-active');
	} else {
		if (modal.classList.contains('modal-active')) modal.classList.remove('modal-active');
		if (modalBg.classList.contains('modal-active')) modalBg.classList.remove('modal-active');
	}
}

$(document).mouseup(e => {
	var modalBg = $("#add-modal-bg");
	// if target isnt in display window:
	if (modalBg.is(e.target))
		showAddUniModal(false);

})

function AddUniversityModal(props) {
	const [file, setFile] = useState('');
	const [fileName, setFileName] = useState('None selected.');

	const onSubmit = async e => {
		e.preventDefault();

		const name = document.getElementById("u-name").value
		const tags = document.getElementById("u-tags").value

		const formData = new FormData();
		formData.append('file', file);
		console.log(file);

		// try {
		// 	const res = await axios.post('/sendImage', formData, {
		// 		'Content-Type': 'multipart/form-data'
		// 	})
		// 	.then(response => console.log(response));
		// } catch (err) {
		// 	console.log(err);
		// }

		// const data = {};
		// api.addUniversityToDb(JSON.stringify({
		// 	name,
		// 	tags,
		// 	data,
		// }));

		showAddUniModal(false);
	}

	return (
		<div className="modal-bg" id="add-modal-bg">
			<div className="add-uni-modal modal flex-row" id="add-university-modal">
				<div className="info-col flex-col">
					<img className="add-image" src={addUniversityIcon} />
					<div className="add-info">
						Don't see your university on the list? <a>Let me know.</a>
					</div>
				</div>
				<div className="form-col">
					<form className="add-uni-form flex-col" onSubmit={onSubmit}>
						<h1 className="title-text">Add a University</h1>
						<input className="modal-input form-control" id="u-name" placeholder="University Name"></input>
						<input className="modal-input form-control" id="u-tags" placeholder="University Tags"></input>
						<div className="add-image-div flex-col">
							<div className="add-image-title">Add an image</div>
							<div className="add-image-row flex-row">
								<input type="file" id="selectedFile" style={{display: 'none'}} onChange={(e) => {
									if (e.target != null) { 
										setFile(e.target.files[0]);
										setFileName(e.target.files[0].name);
									}
								}} />
								<input type="button" value="Browse..." className="unilist-button" onClick={() => {
									document.getElementById('selectedFile').click();
								}} />
								<label htmlFor="customFile">{fileName}</label>	
							</div>
							
						</div>
						<input className="unilist-button add-button" type="submit" value="Add" onClick={onSubmit} />
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddUniversityModal;
