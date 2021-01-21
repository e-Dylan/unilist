import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const SearchResultsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	${breakpoints("align-self", "", [
		{ 4000: "flex-start" }, // Applie as a row -> position at top of page.
		{ 1300: "center" }, // Applies as a column -> center column.
	])};
	${breakpoints("width", "%", [
		{ 4000: "65" },
		{ 768: "98" },
	])}
	${breakpoints("padding", "px", [
		{ 4000: "0 20" },
		{ 768: "0" }
	])};
`;

export const SearchResultsNav = styled.div`
	width: 100%;
	height: 60px;
	align-items: center;
	${breakpoints("justify-content", "", [
		{ 4000: "flex-start" },
		{ 1300: "center" }
	])};
`;

export const SearchResultsItems = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	${breakpoints("justify-content", "", [
		{ 4000: "row" },
		{ 1300: "center" }
	])};
	justify-content: flex-start;
`;
