import React, { createContext, useContext, useReducer } from 'react';
import { AuthState, authInitialState } from './AuthStore/AuthStore';

interface IAuth {
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

export interface ILoginResponse {
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

export interface IRootState {
	state: IAuth;
	dispatch: ({ type }: { type: string; payload?: any }) => void;
}

const StoreContext = createContext({} as IRootState);

const initialState = {
	...authInitialState,
};

export const combineReducers = (...reducers: any) => {
	return (prevState: any, value: any) => {
		return reducers.reduce((newState: any, reducer: any) => {
			return reducer(newState, value);
		}, prevState);
	};
};

export const StoreProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(combineReducers(AuthState), initialState);

	return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
