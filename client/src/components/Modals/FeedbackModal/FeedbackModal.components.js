import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const FeedbackModalContainer = styled.div`
	display: flex;
	flex-directon: row;

	justify-content: flex-start;
	padding: 0;
	width: 65%;
	height: 87%;
	max-width: 1300px;
	max-height: 1000px;

	${breakpoints("flex-direction", "", [
		{ 1000: "column" },
	])};
	${breakpoints("height", "%", [
		{ 1000: "100" },
	])};
	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
`;

export const FeedbackColumn = styled.div`
	background: rgb(41, 41, 41);
	width: 500px;
	padding: 20px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	width: 25%;
	justify-content: flex-start;
	align-items: center;
	transition: 120ms opacity ease-in-out;
	${breakpoints("height", "", [
		{ 4000: "100%" },
		{ 1000: "50px" },
	])};
	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
	${breakpoints("padding", "px", [
		{ 1000: "10 0" },
	])};
`;

export const FeedbackCards = styled.div`
	width: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	${breakpoints("flex-direction", "", [
		{ 1000: "row" },
	])};
	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
	${breakpoints("margin-bottom", "px", [
		{ 1000: "8" },
	])};

	${breakpoints("display", "", [
		{ 1000: "none" },
	])};
`;

export const InfoCard = styled.div`
	background-color: rgb(65, 65, 65);
	padding: 10px;
	margin: 10px 0;
	text-align: center;
	font-size: 11pt;
	color: rgb(196, 196, 196);
	max-width: 200px;
	width: 100%;
	margin: 6px;

	display: flex;
	flex-direction: row;
	align-items: center;
	height: 80%;
	max-height: 100px;
`;

// Ratings Data Column

export const TabContainer = styled.div`
	opacity: 0;
	display: none;
	flex-wrap: wrap;
	justify-content: flex-start;
	justify-content: center;
`;

export const FeedbackDataColumn = styled.div`
	max-width: none;
	max-height: none;
	min-width: 0;
	width: 75%;
	height: 100%;
	transition: 100ms opacity ease-in-out;

	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
`;

export const RatingSlidersWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	align-items: center;

	${'' /* Switch to column mobile */}
	${breakpoints("flex-direction", "", [
		{ 1100: "column" },
	])};
`;

export const RatingSliderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 44%;
	align-items: center;
	height: 100%;
	padding: 1% 2%;
	border-top: 2px solid rgba(109, 109, 109, 0.2);
	position: relative;
	height: 32px;
	color: white;

	${breakpoints("width", "%", [
		{ 1100: "95" },
	])};
	${breakpoints("padding", "px", [
		{ 1100: "25px" },
	])};
`;