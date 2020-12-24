
/**
 * Reducer that updates the global redux store with user session state data.
 * Called whenever the user logs in or logs out with the setUserState action.
 * 
 * @param { state } Default state object
 * @param { action } Action that alerts this reducer to update the store, called when user logs in. 
 */

var stateInit = [{"name": "one"}, {"name": "two"}];

const universityListReducer = (state = stateInit, action) => {
	switch (action.type) {
		case "SET_UNIVERSITY_LIST_STATE":
			state.universityList = action.payload;
			return state.universityList;
		default: 
			return state;
	}
}

export default universityListReducer;