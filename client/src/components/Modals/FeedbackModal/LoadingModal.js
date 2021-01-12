import React, { useState, useEffect, useRef } from "react";
import '../../styles/SearchArea.scss';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions

// Images/Icons

const LoadingModal = (props) => {
	return (
		<div>
			
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

export default connect(mapStateToProps, matchDispatchToProps)(LoadingModal);
