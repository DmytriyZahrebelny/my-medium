import { Dispatch } from 'redux';
import { authApi } from '../../components/Auth/authApi';

export interface IAuth {
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
}

interface ILogonResponse {
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

interface ISignIn {
	email: string;
	password: string;
}

interface ISignUp {
	username: string;
	email: string;
	password: string;
}

enum ActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	ERRORS = 'ERRORS',
}

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
	return { type, payload };
}

const initialState: IAuth = { user: null, errorsMesages: null };

const loginAction = (payload: ILogonResponse) => typedAction(ActionType.LOGIN, payload);
export const logoutAction = () => {
	window.localStorage.removeItem('__token');
	return typedAction(ActionType.LOGOUT);
};
export const authErrorAction = (payload: any) => typedAction(ActionType.ERRORS, payload);

export const loginAsyncAction = () => async (dispatch: Dispatch) => {
	try {
		const token = window.localStorage.getItem('__token');
		if (token) {
			const response: ILogonResponse = await authApi.getViewerData(token);

			dispatch(loginAction(response));
		}
	} catch (error) {
		window.localStorage.removeItem('__token');
	}
};

export const signInAsyncAction = (formData: ISignIn) => async (dispatch: Dispatch) => {
	const data: ILogonResponse | string[] = await authApi.signIn(formData);
	if (data instanceof Array) {
		dispatch(authErrorAction(data));
	} else {
		dispatch(loginAction(data));
	}
};

export const signUpAsyncAction = (formData: ISignUp) => async (dispatch: Dispatch) => {
	const data: ILogonResponse | string[] = await authApi.signUp(formData);

	if (data instanceof Array) {
		dispatch(authErrorAction(data));
	} else {
		dispatch(loginAction(data));
	}
};

type AuthAction = ReturnType<typeof loginAction | typeof logoutAction | typeof authErrorAction>;

export default (state = initialState, action: AuthAction): IAuth => {
	switch (action.type) {
		case ActionType.LOGIN:
			return { ...state, ...action.payload };
		case ActionType.LOGOUT:
			return { ...state, user: null };
		case ActionType.ERRORS:
			return { ...state, errorsMesages: action.payload };
		default:
			return state;
	}
};
