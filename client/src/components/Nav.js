import React from "react";

// Css
import './styles/Nav.scss';

// Images/Icons
import unilistLogo from '../resources/logo/unilist-logo.png';

function Nav(props) {
  return (
    <nav className="nav-container">
		<div className="nav-bar">
			<div className="nav-left">
				<ul>
					<a className="unilist-logo" href="/">
						<img src={unilistLogo} />
					</a>
					<li className="nav-link">Community</li>
					<li className="nav-link">Universities</li>
					<li className="nav-link">Find Jobs</li>
				</ul>
			</div>
			<div className="nav-right">
				<ul>
					<button className="nav-button">Join Unilist</button>
				</ul>
			</div>	
		</div>
		
    </nav>
  );
}

export default Nav;
