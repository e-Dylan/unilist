import React from "react";
import styled from 'styled-components';

import { showJoinModal } from "../Modals/JoinModal/JoinModal";

// Css
import '../styles/Nav.scss';
import { theme } from '../../styles/theme';

// Styled Components
import { NavContainer, NavBar, NavLeft, NavLeftUl, NavRight } from './Nav.components';

// Images/Icons
import unilistLogo from '../../resources/logo/unilist-logo.png';

function Nav(props) {
  return (
    <NavContainer>
		<NavBar>
			<NavLeft>
				<NavLeftUl>
					<a className="unilist-logo" href="/">
						<img src={unilistLogo} />
					</a>
					<li className="nav-link highlight">Universities</li>
					<li className="nav-link disabled">Social</li>
					<li className="nav-link disabled">Find Jobs</li>
				</NavLeftUl>
			</NavLeft>
			<NavRight>
				<ul>
					<button className="unilist-button" onClick={() => {
						showJoinModal(true);
					}}>Join Unilist</button>
				</ul>
			</NavRight>
		</NavBar>
    </NavContainer>
  );
}

export default Nav;
