import React from 'react';
import { Link } from 'react-router-dom';
import './header.sass';

const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='header__container'>
				<Link className='header__logo' to='/'>
					Logo
				</Link>
				<div className='header__menu'>
					<Link className='header__link' to='/signin'>
						Sign In
					</Link>
					<Link className='header__link' to='/signup'>
						Sign Up
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
