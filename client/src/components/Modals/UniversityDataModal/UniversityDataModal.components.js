import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${p => p.justify || "center"};
	align-items: center;
`;

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

export const WeatherContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	top: 15px;
	right: 0px;
	width: 180px;
	
	.weather-text-container {
		margin-right: 10px;
	}
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

export const FeedbackHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 643px) {
		flex-direction: column-reverse;
		justify-content: space-between;
		padding: 10px 16px;
		background-color: rgb(20, 20, 20);
		align-items: center;
	}
`;

export const HeaderMessageContainer = styled.div`
	color: white;
	font-size: 12pt;
	align-items: center;
	margin: 6px 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;

	@media screen and (max-width: 643px) {
		${p => p.disappear && css`
		
			justify-content: space-between;
			span {
				display: none;
			}
		`}

		${'' /* position: absolute;
		top: 0px; */}
		
	}
	
`;

export const EditButton = styled.div`
	margin-left: 6px;
`;

export const TabButtonBar = styled.div`
	height: 41px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	@media screen and (max-width: 643px) {
		height: 0;
	}
`;

export const NavButtons = styled.div`
	align-items: center;
	border-bottom: 2px rgb(80, 80, 80) solid;
	width: 100%;
	display: flex;
	flex-direction: row;
	height: 100%;

	@media screen and (max-width: 643px) {
		position: absolute;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100vw;
		height: 300px;
		left: 0;
		max-height: 0px;
		overflow-y: hidden;
		border: none;
		transition: 400ms all cubic-bezier(0, 0, 0, 1);

		.data-modal-tab-button {
			width: 100% !important;
			background-color: rgb(20, 20, 20) !important;
		}
	}
`;

export const FeedbackNavBurger = styled.div`
	margin: auto 10px;
	${breakpoints("display", "", [
		{ 4000: "none" },
		{ 643: "block" },
	])};
	div {
		width: 30px;
		height: 3px;
		background-color: white;
		margin: 6px;
		border-radius: 3px;
	}

	&:hover {
		cursor: pointer;
	}
`;

// DATA TAB -> USED BOTH: DATAMODAL, FEEDBACKMODAL
export const TableColumn = styled.div`
	display: flex;
	flex-direction: column;
	${breakpoints("width", "", [
		{ 4000: "31%" },
		{ 1700: "45%" },
		{ 700: "94%" }
	])};
	${'' /* height: 100%; */}
	color: white;
	align-items: center;
	justify-content: flex-start;
`; 