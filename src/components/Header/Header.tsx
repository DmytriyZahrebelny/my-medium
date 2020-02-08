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
	const user = useSelector((state: RootState) => state.authStore.user);
	const onUserClick = (): void => {
		setUserMenu(!isUserMenu);
	};

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
						<div onClick={onUserClick} onKeyDown={onUserClick} className='header__user' role='button' tabIndex={0}>
							<img className='header__icon' src={user.image || userLogo} alt='user' />
							{isUserMenu ? <UserMenu user={user} /> : null}
						</div>
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
