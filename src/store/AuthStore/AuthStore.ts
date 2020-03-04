import { useStore, IRootState } from '../globalStore';
import { authApi } from '../../api/authApi';
import { settingsApi } from '../../api/settingsApi';
import { IAuth } from './interfaces';

export const authInitialState: IAuth = {
	user: null,
	errorsMesages: null,
	token: null,
	redirectTo: null,
};

export const useAuthStore = () => {
	const { state, dispatch }: IRootState = useStore();
	return {
		user: state.user,
		token: state.token,
		redirectTo: state.redirectTo,
		errorsMesages: state.errorsMesages,
		signInAction: async (values: any) => {
			const response = await authApi.signIn(values);
			if (response instanceof Array) {
				dispatch({ type: 'ERRORS', payload: response });
			} else {
				dispatch({ type: 'SIGN_IN', payload: response });
			}
		},
		signUpAction: async (values: any) => {
			const response = await authApi.signUp(values);
			if (response instanceof Array) {
				dispatch({ type: 'ERRORS', payload: response });
			} else {
				dispatch({ type: 'SIGN_IN', payload: response });
			}
		},
		loginAction: async () => {
			const token = window.localStorage.getItem('__token');
			if (token) {
				const response = await authApi.getViewerData(token);
				dispatch({ type: 'LOGIN', payload: response });
			}
		},
		updateDataAction: async (formData: any) => {
			const response = await settingsApi.updateUserData(formData, state.token);
			if (response instanceof Array) {
				dispatch({ type: 'UPDATE', payload: response });
			} else {
				dispatch({ type: 'UPDATE', payload: response });
			}
		},
		logoutAction: () => {
			window.localStorage.removeItem('__token');
			dispatch({ type: 'LOGOUT' });
		},
	};
};

type Action = { type: string; payload?: any };

export const AuthState = (state: IAuth, action: Action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: '/',
			};
		case 'LOGIN':
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: null,
			};
		case 'LOGOUT':
			return { user: null, token: null, errorsMesages: null, redirectTo: null };
		case 'UPDATE':
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: '/posts',
			};
		case 'ERRORS':
			return { ...state, errorsMesages: action.payload };
		default:
			return state;
	}
};
