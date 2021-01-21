import styled from 'styled-components';
import theme from '../../styles/theme';
import { breakpoints } from '../../styles/breakpoints';

export const NavContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 6vh;
	background-color: ${theme.colors.brand.gray["light"]};
	border-bottom: 1px solid #323232;
	font-family: "Open Sans", sans-serif;
`

export const NavBar = styled.div`
	width: 92%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;

	${breakpoints("flex-direction", "", [
		{ 900: "column" },
	])};
`;

export const NavLeft = styled.div`
	width: 50%;

	${breakpoints("width", "%", [
		{900: "100"}
	])}
`;

export const NavLeftUl = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	${breakpoints("width", "%", [
		{ 4000: "80" },
		{ 900: "100" }
	])}
	${breakpoints("justify-content", "", [
		{900: "space-around"}
	])}
	${breakpoints("padding", "px", [
		{900: "10px 0"}
	])}
`;

export const NavRight = styled.div`
	${breakpoints("padding-bottom", "px", [
		{900: "20"}
	])}
`;