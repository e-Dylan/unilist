import React from "react";

import './styles/HomePage.scss';

// Images/Icons
import unilistLogo from '../resources/logo/unilist-logo.png';
import cityIcon from '../resources/homepage/city-icon.png';
import networkIcon from '../resources/homepage/network-icon.svg';

function HomePage(props) {
  return (
    <div className="homepage-container">
		<div className="homepage-image flex-col"> 
			<a className="homepage-logo" href="/">
				<img src={unilistLogo} />
			</a>
			<div className="main-content-container container-center flex-row">
				<div className="main-text flex-col">
					<span className="title-text">
						<img className="in-text-image" src={cityIcon} /> Find your spot.
					</span>
					<span className="desc-text">Join the community of students and broaden your opportunities.</span>
				</div>
				<div className="main-image flex-row">
					<img src={networkIcon} />
				</div>
			</div>
		</div>
    </div>
  );
}

export default HomePage;
