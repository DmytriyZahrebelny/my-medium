import React, { createContext, useContext, useReducer } from 'react';
import { AuthState, authInitialState } from './AuthStore/AuthStore';
import { ArticlesStore, articlesInitialState } from './ArticlesStore/ArticlesStore';
import { CommentsStore, commentsInitialState } from './CommentsStore/CommentsStore';
import { TagsStore } from './TagsStore/TagsStore';
import { StoreData } from './interfaces';

export interface IRootState {
	state: StoreData;
	dispatch: ({ type }: { type: string; payload?: any }) => void;
}

const StoreContext = createContext({} as IRootState);

const initialState = {
	...authInitialState,
	...articlesInitialState,
	...commentsInitialState,
	tags: [],
};

export const combineReducers = (...reducers: any) => {
	return (prevState: any, value: any) =>
		reducers.reduce((newState: any, reducer: any) => {
			return { ...newState, ...reducer(newState, value) };
		}, prevState);
};

export const StoreProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(
		combineReducers(AuthState, ArticlesStore, CommentsStore, TagsStore),
		initialState
	);

	return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
