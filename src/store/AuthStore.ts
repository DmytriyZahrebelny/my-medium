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
}

enum AuthConstants {
	LOGIN,
	LOGOUT,
}

export function typedAction<T extends number>(type: T): { type: T };
export function typedAction<T extends number, P extends any>(type: T, payload: P): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const initialState: IAuth = { user: null };

export const loginAction = (payload: IAuth) => typedAction(AuthConstants.LOGIN, payload);
export const logoutAction = () => typedAction(AuthConstants.LOGOUT);

type AuthACtion = ReturnType<typeof loginAction | typeof logoutAction>;

export default (state = initialState, action: AuthACtion): IAuth => {
	switch (action.type) {
		case AuthConstants.LOGIN:
			return action.payload;
		case AuthConstants.LOGOUT:
			window.localStorage.removeItem('__token');
			return { user: null };
		default:
			return state;
	}
};
