import { combineReducers } from 'redux';

// Reducers
import universityListReducer from './universityListReducer';

// import UserReducer from './userReducer';

// Combine all reducers into single reducer object
// Export all modules from this directory.

/* OVERALL GLOBAL STATE OBJECT CONTAINING ALL STATE REDUCERS. */

const allReducers = combineReducers({
	// userState: UserReducer,

	universityListState: universityListReducer
});

export default allReducers;