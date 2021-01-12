
/**
 * 
 * @param { activeUniversityState } Data for the active university to go in the state.
 */
export const setEditingUniversityState = (universityData) => {
	return {
		type: "SET_EDITING_UNIVERSITY_STATE",
		payload: universityData
	}
}