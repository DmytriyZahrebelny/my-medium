import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../components/Icon';
import { RootState } from '../../store/configureStore';
import './header.sass';

const userLogo: string = 'https://cdn-images-1.medium.com/fit/c/32/32/0*7TqUrB-WnHVdrBF5.';

const Header: React.FC = () => {
	const user = useSelector((state: RootState) => state.authStore.user);
	return (
		<header className='header'>
			<div className='header__container'>
				<Link className='header__logo' to='/'>
					<Icon name='logo' size={114} />
				</Link>
				<div className='header__menu'>
					{user ? (
						<span className='header__user'>
							<img className='header__icon' src={user.image || userLogo} alt='user' />
						</span>
					) : (
						<>
							<Link className='header__link' to='/signin'>
								Sign In
							</Link>
							<Link className='header__link' to='/signup'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
