
/**
 * 
 * @param { userData } Active user session data being set in the store state. 
 */
export const setUniversityListState = (universityListState) => {
	return {
		type: "SET_UNIVERSITY_LIST_STATE",
		payload: universityListState
	}
}