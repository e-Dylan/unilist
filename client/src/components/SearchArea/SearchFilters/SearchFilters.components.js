import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const SearchFiltersContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	width: 20%;
	min-width: 260px;
	padding: 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background-color: ${theme.colors.brand.gray["light"]};

	${breakpoints("width", "%", [
		{ 1300: "100" },
	])};
	${breakpoints("flex-direction", "", [
		{ 1300: "row" },
	])};
	${breakpoints("padding", "px", [
		{ 1300: "0" },
	])};
`;

export const FilterSectionContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const FilterOptionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	border-radius: 10px;
	flex-wrap: wrap;
	background-color: rgb(30, 30, 30);
	padding: 8px;

	.filter-button {
		border: 1px solid rgb(20, 20, 20);
		text-align: center;
		margin: 0px;
		border-radius: 2px;
		width: 25%;
		flex-grow: 1;
		font-size: 10pt;
		padding: 5px;
		background-color: rgb(39, 39, 39);
		color: white;
		transition: 100ms all ease-in-out;

		&:hover {
			cursor: pointer;
			background-color: rgb(184, 27, 79);
		}

	}
	
	.location-button {
		padding: 4px;
	}
`;