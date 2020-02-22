import { Dispatch } from 'redux';
import { authApi } from '../../components/Auth/authApi';
import { settingsApi } from '../../components/SettingsPage/settingsApi';
import { IAuth, ILoginResponse, ISignIn, ISignUp } from './interfaces';
import { RootState } from '../configureStore';

enum ActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	ERRORS = 'ERRORS',
}

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
	return { type, payload };
}

const initialState: IAuth = {
	user: null,
	errorsMesages: null,
	token: null,
};

export const logoutAction = () => {
	window.localStorage.removeItem('__token');
	return typedAction(ActionType.LOGOUT);
};
const loginAction = (payload: ILoginResponse) => typedAction(ActionType.LOGIN, payload);
const authErrorAction = (payload: any) => typedAction(ActionType.ERRORS, payload);
const updateUserData = (payload: any) => typedAction(ActionType.LOGIN, payload);

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
	const data: ILoginResponse | string[] = await authApi.signIn(formData);
	if (data instanceof Array) {
		dispatch(authErrorAction(data));
	} else {
		dispatch(loginAction(data));
	}
};

export const signUpAsyncAction = (formData: ISignUp) => async (dispatch: Dispatch) => {
	const data: ILoginResponse | string[] = await authApi.signUp(formData);

	if (data instanceof Array) {
		dispatch(authErrorAction(data));
	} else {
		dispatch(loginAction(data));
	}
};

export const updateUserDataAsyncAction = (formData: any) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const data: ILoginResponse | string[] = await settingsApi.updateUserData(formData, token);

	if (data instanceof Array) {
		dispatch(authErrorAction(data));
	} else {
		dispatch(updateUserData(data));
	}
};

type AuthAction = ReturnType<typeof loginAction | typeof logoutAction | typeof authErrorAction>;

export default (state = initialState, action: AuthAction): IAuth => {
	switch (action.type) {
		case ActionType.LOGIN:
			return { ...action.payload, token: action.payload.user.token, errorsMesages: null };
		case ActionType.LOGOUT:
			return { user: null, token: null, errorsMesages: null };
		case ActionType.ERRORS:
			return { ...state, errorsMesages: action.payload };
		default:
			return state;
	}
};
