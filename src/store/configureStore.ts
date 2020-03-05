import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tagsStore from './Tags/TagsStore';

export const rootReducer = combineReducers({
	tagsStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
