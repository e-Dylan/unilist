import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const UniversityDataModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0;
	height: 95%;
	${breakpoints("width", "%", [
		{ 4000: "45" },
		{ 1000: "95" },
	])};
	max-height: 1000px;
`;

export const RatingsContainer = styled.div`
	display: flex;
	${breakpoints("flex-direction", "", [
		{ 4000: "row" },
		{ 1400: "column" },
	])};
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
`;

// OUTER CONTAINER OF EACH RATING BAR.
export const RatingContainer = styled.div`
	${breakpoints("width", "%", [
		{ 4000: "44" },
		{ 1400: "90" },
	])}
	align-self: center;
	align-items: center;
	height: auto;
	padding: 0.69% 2%;
	border-top: 2px solid rgba(109, 109, 109, 0.2);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const RatingBarContainer = styled.div`
	${breakpoints("width", "", [
		{ 4000: "160px" },
		{ 1400: "50%" },
	])}
	height: 25px;
	background-color: rgb(196, 196, 196);
	border-radius: 4px;
	margin: 5px 0;
`;

// Only half rating bars have this:
export const HalfRatingBar = styled.div`
	position: relative;
	${breakpoints("width", "%", [
		{ 4000: "70%" },
		{ 1400: "100" },
	])}
`;

export const MakeChangeText = styled.div`
	color: rgb(151, 55, 71);
	font-weight: bolder;
	margin: 0 10px;
	text-decoration: underline;
	&:hover {
		cursor: pointer;
	}

	${breakpoints("display", "", [
		{ 1490: "none" }
	])};
`

export const EditButton = styled.div`
	margin-left: 6px;
`;