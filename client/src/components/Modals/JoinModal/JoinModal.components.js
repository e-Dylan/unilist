import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const JoinModalContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 60%;
	height: 70%;
	padding: 15px;
	background-color: rgb(30,30,30);
	padding: 0;

	${breakpoints("flex-direction", "", [
		{ 1000: "column" },
	])};
	${breakpoints("height", "%", [
		{ 1000: "90" },
	])};
	${breakpoints("width", "%", [
		{ 1000: "90" },
	])};
`;

export const ModalBodyContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100%;
	justify-content: space-between;

	${breakpoints("flex-direction", "", [
		{ 1000: "column" },
	])};
`;

export const ModalColumn = styled.div`
	width: 50%;
	height: 100%;
	background-color: ${p => p.bg};
	border-radius: 5px;

	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
`;

export const HeaderBar = styled.div`
	background: linear-gradient(-5deg, #BA3E3F, rgba(235, 69, 110, 1));
	height: 4px;
	width: 100%;
	position: absolute;
	top: 0px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
`
export const FooterBar = styled.div`
	background: linear-gradient(-5deg, #BA3E3F, rgba(235, 69, 110, 1));
	height: 4px;
	width: 101%;
	position: absolute;
	bottom:-2px;
	width: 100%;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;

	${breakpoints("bottom", "", [
		{ 1000: "0px" },
	])};
	${breakpoints("display", "", [
		{ 1000: "none" },
	])};
`
