import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header className='header'>
			<div>Logo</div>
			<Link to='/signin'>Sign In</Link>
			<Link to='/signup'>Sign Up</Link>
		</header>
	);
};

export default Header;
