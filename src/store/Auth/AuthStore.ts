import { Dispatch } from 'redux';
import { authApi } from '../../api/authApi';
import { IAuthState, ILoginResponse, ISignIn, ISignUp } from './interfaces';
import { RootState } from '../configureStore';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
	return { type, payload };
}

enum ActionType {
	SIGN_IN = 'SIGN_IN',
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	ERRORS = 'ERRORS',
	UPDATE = 'UPDATE',
}

const initialState: IAuthState = {
	user: null,
	errorsMesages: null,
	token: null,
	redirectTo: null,
};

export const logoutAction = () => {
	window.localStorage.removeItem('__token');
	return typedAction(ActionType.LOGOUT);
};
const signInAction = (payload: ILoginResponse) => typedAction(ActionType.SIGN_IN, payload);
const loginAction = (payload: ILoginResponse) => typedAction(ActionType.LOGIN, payload);
const authErrorAction = (payload: string[]) => typedAction(ActionType.ERRORS, payload);
const updateUserData = (payload: ILoginResponse) => typedAction(ActionType.UPDATE, payload);

export const loginAsyncAction = () => async (dispatch: Dispatch) => {
	try {
		const token = window.localStorage.getItem('__token');
		if (token) {
			const response: ILoginResponse = await authApi.getViewerData(token);

			dispatch(loginAction(response));
		}
	} catch (error) {
		window.localStorage.removeItem('__token');
	}
};

export const signInAsyncAction = (formData: ISignIn) => async (dispatch: Dispatch) => {
	const response: ILoginResponse | string[] = await authApi.signIn(formData);
	if (response instanceof Array) {
		dispatch(authErrorAction(response));
	} else {
		dispatch(signInAction(response));
	}
};

export const signUpAsyncAction = (formData: ISignUp) => async (dispatch: Dispatch) => {
	const response: ILoginResponse | string[] = await authApi.signUp(formData);

	if (response instanceof Array) {
		dispatch(authErrorAction(response));
	} else {
		dispatch(signInAction(response));
	}
};

export const updateUserDataAsyncAction = (formData: any) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: ILoginResponse | string[] = await authApi.updateUserData(formData, token);
	if (response instanceof Array) {
		dispatch(authErrorAction(response));
	} else {
		dispatch(updateUserData(response));
	}
};

type typeAction = ReturnType<
	| typeof signInAction
	| typeof logoutAction
	| typeof authErrorAction
	| typeof updateUserData
	| typeof loginAction
>;

export default (state = initialState, action: typeAction): IAuthState => {
	switch (action.type) {
		case ActionType.SIGN_IN:
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: '/',
			};
		case ActionType.LOGIN:
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: null,
			};
		case ActionType.LOGOUT:
			return { user: null, token: null, errorsMesages: null, redirectTo: null };
		case ActionType.UPDATE:
			return {
				...action.payload,
				token: action.payload.user.token,
				errorsMesages: null,
				redirectTo: '/posts',
			};
		case ActionType.ERRORS:
			return { ...state, errorsMesages: action.payload };
		default:
			return state;
	}
};
