import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const SearchResultsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	width: 65%;
	align-items: center;
	padding: 0 20px;

	${breakpoints("width", "%", [
		{ 1300: "100" }
	])}
`;

export const SearchResultsItems = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap;
	justify-content: flex-start;

	${breakpoints("justify-content", "", [
		{ 1300: "center" }
	])}
`;
