import { combineReducers } from 'redux';

// Reducers
import universityListReducer from './universityListReducer';
import activeUniversityReducer from './activeUniversityReducer';
import editingUniversityReducer from './editingUniversityReducer';
import userReducer from './userReducer';
import feedbackTagsReducer from './FeedbackTagsReducer';

// import UserReducer from './userReducer';

// Combine all reducers into single reducer object
// Export all modules from this directory.

/* OVERALL GLOBAL STATE OBJECT CONTAINING ALL STATE REDUCERS. */

const allReducers = combineReducers({
	userState: userReducer,
	universityListState: universityListReducer,
	activeUniversityState: activeUniversityReducer,
	editingUniversityState: editingUniversityReducer,
	feedbackTagsState: feedbackTagsReducer,
});

export default allReducers;