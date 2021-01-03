
/**
 * 
 * @param { activeUniversityState } Data for the active university to go in the state.
 */
export const setFeedbackTagsState = (feedbackTagsState) => {
	return {
		type: "SET_FEEDBACK_TAGS_STATE",
		payload: feedbackTagsState
	}
}