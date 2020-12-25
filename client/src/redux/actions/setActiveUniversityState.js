
/**
 * 
 * @param { activeUniversityState } Data for the active university to go in the state.
 */
export const setActiveUniversityState = (activeUniversityState) => {
	return {
		type: "SET_ACTIVE_UNIVERSITY_STATE",
		payload: activeUniversityState
	}
}