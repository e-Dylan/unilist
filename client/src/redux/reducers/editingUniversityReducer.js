
/**
 * Reducer that updates the global redux store with user session state data.
 * Called whenever the user logs in or logs out with the setUserState action.
 * 
 * @param { state } Default state object
 * @param { action } Action that alerts this reducer to update the store, called when user logs in. 
 */

import * as uniApi from '../../api/uniApi';

var stateInit = uniApi.nullUniData;

const editingUniversityReducer = (state = stateInit, action) => {
	switch (action.type) {
		case "SET_EDITING_UNIVERSITY_STATE":
			state = action.payload;
			return state;
		default: 
			return state;
	}
}

export default editingUniversityReducer;