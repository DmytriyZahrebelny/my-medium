interface IAuth {
	user: {
		id: number;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string;
		token: string;
	} | null;
}

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
	return { type, payload };
}

const initialState: IAuth = { user: null };

export const loginAction = (payload: IAuth) => typedAction('auth/LOGIN', payload);
export const logoutAction = () => typedAction('auth/LOGOUT');
export const logout = () => typedAction('auth/LOGOUT');

type AuthACtion = ReturnType<typeof loginAction | typeof logoutAction>;

export default (state = initialState, action: AuthACtion): IAuth => {
	switch (action.type) {
		case 'auth/LOGIN':
			return action.payload;
		case 'auth/LOGOUT':
			return { user: null };
		default:
			return state;
	}
};
