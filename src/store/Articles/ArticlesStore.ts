import { Dispatch } from 'redux';
import { articlesApi } from '../../components/Articles/articlesApi';

enum ArticlesConstants {
	ALL_ARTICLES,
}

const initialState: any = {
	articles: null,
};

export function typedAction<T extends number>(type: T): { type: T };
export function typedAction<T extends number, P extends any>(type: T, payload: P): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const allArticlesAction = (payload: any) => typedAction(ArticlesConstants.ALL_ARTICLES, payload);

export const allArticlesAsyncAction = () => async (dispatch: Dispatch) => {
	const response = await articlesApi.allArticles();

	dispatch(allArticlesAction(response));
};

type articlesAction = ReturnType<typeof allArticlesAction>;

export default (state = initialState, action: articlesAction) => {
	switch (action.type) {
		case ArticlesConstants.ALL_ARTICLES:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
