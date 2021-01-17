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
`;
