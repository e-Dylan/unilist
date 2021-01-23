import { Button, Icon } from '@chakra-ui/react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
	&:hover {
		cursor: pointer;
		background-color: black;
	}
`;

const IconButton = ({ icon, size, color, bg, onClick, ...buttonProps }) => {
	return (
		<ButtonContainer>
			<Button
				{...buttonProps}
				bg={bg || "transparent"} border="none" onClick={onClick}
			>
				<Icon as={icon} boxSize={size} color={color} _hover={{
					backgroundColor: "rgba(255, 255, 255, 0.01)",
					color: "white",
					transition: "100ms",
				}} />
			</Button>
		</ButtonContainer>
	);
}

export default IconButton;