import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authStore from './Auth/AuthStore';
// import expensesReducer from '../reducers/expenses';

export const rootReducer = combineReducers({
	authStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
