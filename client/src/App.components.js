import styled from 'styled-components';
import { breakpoints } from './styles/breakpoints';

export const UnilistButton = styled.div`
	text-align: center;
	border: 1px solid rgb(161, 34, 98);
	background: linear-gradient(-5deg, #BA3E3F, rgba(235, 69, 110, 1));
	border-radius: 4px;
	${breakpoints("padding", "", [
		{ 4000: "7px 50px" },
		{ 768: "6px 25px" },
	])}
	transition: 100ms all ease-in-out;
	color: white;
	max-height: 40px;
	margin: ${p => p.m || "0 5px"};

	&:hover {
		cursor: pointer;
		color: black;
	}

	&:focus {
		outline: none;
	}
`;