import { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/AuthStore';
import { RootState } from '../../store/configureStore';
import { headerReducer, initialState, HADER_CONSTANTS } from './useHeaderReducer';

export const useHeaderHooks = () => {
	const reduxDispatch = useDispatch();
	const [{ showUserMenu, isSearch }, dispatch] = useReducer(headerReducer, initialState);
	const user = useSelector((state: RootState) => state.authStore.user);

	useEffect(() => {
		const removeUserMenu = (evt: any): void => {
			if (!evt.target.closest('.header__user')) {
				dispatch({ type: HADER_CONSTANTS.SHOW_USER_MENU, showUserMenu: false });
			}
		};
		window.addEventListener('click', removeUserMenu);

		return () => window.removeEventListener('click', removeUserMenu);
	}, [showUserMenu]);

	const onUserClick = (): void => dispatch({ type: HADER_CONSTANTS.SHOW_USER_MENU, showUserMenu: !showUserMenu });
	const onSearchClick = (): void => dispatch({ type: HADER_CONSTANTS.IS_SEARCH, isSearch: !isSearch });

	const transformEmail = (email: string): string => {
		const mailSymbolIndex = email.split('').findIndex((symbol: string) => symbol === '@');

		return email.slice(0, mailSymbolIndex);
	};

	const logoutClick = (): void => {
		reduxDispatch(actions.logoutAction());
	};

	return {
		showUserMenu,
		isSearch,
		user,
		onUserClick,
		onSearchClick,
		transformEmail,
		logoutClick,
	};
};
