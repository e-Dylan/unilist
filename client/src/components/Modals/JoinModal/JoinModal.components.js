import styled from 'styled-components';
import theme from '../../../styles/theme';
import { breakpoints } from '../../../styles/breakpoints';

export const JoinModalContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 60%;
	${'' /* ${breakpoints("height", "%", [
		{ 4000: "88" },
		{ 1580: "83" },
	])}; */}
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
	${breakpoints("overflow-y", "", [
		{ 4000: "hidden" },
		{ 1000: "scroll" },
	])}
`;

export const ModalColumn = styled.div`
	width: 50%;
	${'' /* height: 100%; */}
	height: auto;
	background-color: ${p => p.bg};
	border-radius: 5px;

	${breakpoints("width", "%", [
		{ 1000: "100" },
	])};
`;

export const SignupTitleContainer = styled.div`
	align-items: center;
	color: rgb(220, 220, 220);
	${'' /* ${breakpoints("margin", "", [
		{ 4000: "15px" },
		{ 768: "530px 15px 15px 15px" }
	])}; */}
	margin: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.signup-title-text {
		margin-bottom: 10px;
		font-size: 15pt;
	}
	.signup-desc-text {
		margin-top: 10px;
		font-size: 9pt;
		color: white;
		padding: 0px 2px;
		// background: linear-gradient(-5deg, #BA3E3F, rgba(235, 69, 110, 1));
		border-radius: 6px;
	}
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

export const DisclaimerCard = () => {
	return (
		<div className="not-available-card shadow flex-col">
			<div className="top-text"><span>HEY!</span></div>
			<div className="disclaimer-text">Membership features are still being built.</div>
			<div className="disclaimer-text">You currently get <span>full access</span> as a <span>free</span> member.</div>
			<div className="disclaimer-text">Subscriptions act to support the development of this app and give you access to all of the exciting advanced features as they are released.</div>
			<div className="disclaimer-text bold">You'll want in on them, trust me.</div>
		</div>
	);
}
