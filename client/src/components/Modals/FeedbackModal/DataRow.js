import React, { useState, useEffect, useRef } from "react";
import '../../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { setEditingUniversityState } from "../../../redux/actions/setEditingUniversityState";

// Images/Icons

function DataRow(props) {

	return (
		<div className="data-row flex-row">
			<div className="data-key">{props.title}</div>
			<input className="datatab-data-input" placeholder="No data" onChange={e => {
				if (e.target.value[0] === "$") e.target.value = e.target.value.slice(1, e.target.value.length);
				// console.log(e.target.value);
				// console.log(props.globalState.editingUniversityState.university_data.data);
				props.globalState.editingUniversityState.university_data.data[props.table][props.value] = e.target.value;
				props.setEditingUniversityState(props.globalState.editingUniversityState);
			}}>{}</input>
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

export default connect(mapStateToProps, matchDispatchToProps)(DataRow);