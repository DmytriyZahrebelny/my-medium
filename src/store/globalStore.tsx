import React, { createContext, useContext, useReducer } from 'react';
import { AuthState, authInitialState, IAuthState } from './AuthStore/AuthStore';
import { ArticlesStore, articlesInitialState, IArticlesState } from './ArticlesStore/ArticlesStore';

export interface IRootState {
	state: IAuthState & IArticlesState;
	dispatch: ({ type }: { type: string; payload?: any }) => void;
}

const StoreContext = createContext({} as IRootState);

const initialState = {
	...authInitialState,
	...articlesInitialState,
};

export const combineReducers = (...reducers: any) => {
	return (prevState: any, value: any) =>
		reducers.reduce((newState: any, reducer: any) => {
			return { ...newState, ...reducer(newState, value) };
		}, prevState);
};

export const StoreProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(combineReducers(AuthState, ArticlesStore), initialState);

	return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
