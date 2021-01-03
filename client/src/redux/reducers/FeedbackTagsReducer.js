
/**
 * Reducer that updates the global redux store with user session state data.
 * Called whenever the user logs in or logs out with the setUserState action.
 * 
 * @param { state } Default state object
 * @param { action } Action that alerts this reducer to update the store, called when user logs in. 
 */

var stateInit = [];

const feedbackTagsReducer = (state = stateInit, action) => {
	switch (action.type) {
		case "SET_FEEDBACK_TAGS_STATE":
			state.feedbackTags = action.payload;
			return state.feedbackTags;
		default: 
			return state;
	}
}

export default feedbackTagsReducer;