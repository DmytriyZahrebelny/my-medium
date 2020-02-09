import React from 'react';
import { Link } from 'react-router-dom';
import { useHeaderHooks } from '../useHeaderHooks';
import './userMenu.sass';

export interface IUserMenu {
	user: {
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string | null;
		token: string;
	};
}

const userLogo: string = 'https://cdn-images-1.medium.com/fit/c/50/50/0*7TqUrB-WnHVdrBF5.';

const UserMenu: React.FC<IUserMenu> = ({ user }) => {
	const { transformEmail, logoutClick } = useHeaderHooks();

	return (
		<div className='user-menu'>
			<div className='user-menu__user'>
				<img src={user.image || userLogo} alt='user' />
				<div className='user-menu__data'>
					<Link className='user-menu__name' to='/profile'>
						{user.username}
					</Link>
					<Link className='user-menu__email' to='/profile'>
						{`@${transformEmail(user.email)}`}
					</Link>
				</div>
			</div>
			<div className='user-menu__links'>
				<Link to='/settings'>Settings</Link>
				<Link onClick={logoutClick} to='/'>
					Sign Out
				</Link>
			</div>
		</div>
	);
};

export default UserMenu;
