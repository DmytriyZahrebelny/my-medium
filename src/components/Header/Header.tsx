import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu/UserMenu';
import Icon from '../components/Icon';
import { useHeaderHooks } from './useHeaderHooks';
import './header.sass';

const userLogo: string = 'https://cdn-images-1.medium.com/fit/c/32/32/0*7TqUrB-WnHVdrBF5.';

const Header: React.FC = () => {
	const { showUserMenu, isSearch, user, onUserClick, onSearchClick } = useHeaderHooks();

	return (
		<header className='header'>
			<div className='header__container'>
				<Link className='header__logo' to='/'>
					<Icon name='logo' size={114} />
				</Link>
				<div className='header__menu'>
					{user ? (
						<>
							<button type='button' className='header__search' onClick={onSearchClick}>
								<Icon name='search' size={30} />
							</button>
							{isSearch ? <input className='header__search-input' type='text' placeholder='Search Medium' /> : null}
							<button onClick={onUserClick} className='header__user'>
								<img className='header__icon' src={user.image || userLogo} alt='user' />
								{showUserMenu ? <UserMenu user={user} /> : null}
							</button>
						</>
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
