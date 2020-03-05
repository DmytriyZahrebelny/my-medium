import React, { createContext, useContext, useReducer } from 'react';
import { AuthState, authInitialState } from './AuthStore/AuthStore';
import { ArticlesStore, articlesInitialState } from './ArticlesStore/ArticlesStore';
import { CommentsStore, commentsInitialState } from './CommentsStore/CommentsStore';
import { TagsStore } from './TagsStore/TagsStore';
import { StoreTypeData, ReducersTypeData, ReducerType } from './interfaces';

export interface IRootState {
	state: StoreTypeData;
	dispatch: ({ type }: { type: string; payload?: any }) => void;
}

const StoreContext = createContext({} as IRootState);

const initialState = {
	...authInitialState,
	...articlesInitialState,
	...commentsInitialState,
	tags: [],
};

export const combineReducers = (...reducers: ReducersTypeData) => {
	return (prevState: StoreTypeData, value: any) =>
		reducers.reduce((newState: StoreTypeData, reducer: ReducerType) => {
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
