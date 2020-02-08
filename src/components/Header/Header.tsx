import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu/UserMenu';
import Icon from '../components/Icon';
import { RootState } from '../../store/configureStore';
import './header.sass';

const userLogo: string = 'https://cdn-images-1.medium.com/fit/c/32/32/0*7TqUrB-WnHVdrBF5.';

const Header: React.FC = () => {
	const [isUserMenu, setUserMenu] = useState<boolean>(false);
	const [isSearch, setSearchStete] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.authStore.user);
	const onUserClick = (): void => setUserMenu(!isUserMenu);
	const onSearchClick = (): void => setSearchStete(!isSearch);

	useEffect(() => {
		const removeUserMenu = (evt: any) => {
			if (!evt.target.closest('.header__user')) {
				setUserMenu(false);
			}
		};
		window.addEventListener('click', removeUserMenu);

		return () => window.removeEventListener('click', removeUserMenu);
	}, [isUserMenu]);

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
								{isUserMenu ? <UserMenu user={user} /> : null}
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
