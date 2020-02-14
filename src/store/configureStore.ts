import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authStore from './Auth/AuthStore';
import articlesStore from './Articles/ArticlesStore';

export const rootReducer = combineReducers({
	authStore,
	articlesStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
