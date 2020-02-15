import { Dispatch } from 'redux';
import { articlesApi } from '../../components/Articles/articlesApi';

interface IAllArticles {
	articles: object[] | [];
}

interface IState {
	allArticles: IAllArticles;
}

enum ActionType {
	ALL_ARTICLES = 'ALL_ARTICLES',
}

const initialState: IState = {
	allArticles: {
		articles: [],
	},
};

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const allArticlesAction = (payload: IAllArticles) => typedAction(ActionType.ALL_ARTICLES, payload);

export const allArticlesAsyncAction = (page: number = 0) => async (dispatch: Dispatch) => {
	const response: IAllArticles = await articlesApi.allArticles(page);
	dispatch(allArticlesAction(response));
};

type articlesAction = ReturnType<typeof allArticlesAction>;

export default (state = initialState, action: articlesAction) => {
	switch (action.type) {
		case ActionType.ALL_ARTICLES:
			return {
				...state,
				allArticles: { ...state.allArticles, articles: [...state.allArticles.articles, ...action.payload.articles] },
			};
		default:
			return state;
	}
};
