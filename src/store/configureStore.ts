import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authStore from './Auth/AuthStore';
import articlesStore from './Articles/ArticlesStore';
import commentsStore from './Comments/CommentsStore';
import tagsStore from './Tags/TagsStore';

export const rootReducer = combineReducers({
	authStore,
	articlesStore,
	commentsStore,
	tagsStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
