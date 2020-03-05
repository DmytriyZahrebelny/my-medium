import { useStore, IRootState } from '../globalStore';
import { authApi } from '../../api/authApi';
import { settingsApi } from '../../api/settingsApi';
import { ILoginResponse, ISignIn, ISignUp } from './interfaces';

export interface IAuthState {
	user: {
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string | null;
		token: string;
	} | null;
	errorsMesages: string[] | null;
	token: string | null;
	redirectTo: null | string;
}

export const authInitialState: IAuthState = {
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
		async signInAction(values: ISignIn) {
			const response: ILoginResponse | string[] = await authApi.signIn(values);
			if (response instanceof Array) {
				dispatch({ type: 'ERRORS', payload: response });
			} else {
				dispatch({ type: 'SIGN_IN', payload: response });
			}
		},
		async signUpAction(values: ISignUp) {
			const response: ILoginResponse | string[] = await authApi.signUp(values);
			if (response instanceof Array) {
				dispatch({ type: 'ERRORS', payload: response });
			} else {
				dispatch({ type: 'SIGN_IN', payload: response });
			}
		},
		async loginAction() {
			const token: string | null = window.localStorage.getItem('__token');
			if (token) {
				const response = await authApi.getViewerData(token);
				dispatch({ type: 'LOGIN', payload: response });
			}
		},
		async updateDataAction(formData: any) {
			const response: ILoginResponse | string[] = await settingsApi.updateUserData(
				formData,
				state.token
			);
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

type Action =
	| { type: 'SIGN_IN' | 'LOGIN' | 'UPDATE'; payload: ILoginResponse }
	| { type: 'LOGOUT'; payload: ILoginResponse }
	| { type: 'ERRORS'; payload: string[] };

export const AuthState = (state: IAuthState, action: Action) => {
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
