import { Dispatch } from 'redux';
import { articlesApi } from '../../components/Articles/articlesApi';
import { newPostApi } from '../../components/NewPost/newPostApi';
import { IAllArticlesData, IState, IArticleData, ICreatePostData } from './interfaces';
import { RootState } from '../configureStore';

enum ActionType {
	ALL_ARTICLES = 'ALL_ARTICLES',
	CREATED_ARTICLE = 'CREATED_ARTICLE',
}

const initialState: IState = {
	allArticles: {
		articles: [],
	},
};

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const allArticlesAction = (payload: IAllArticlesData) =>
	typedAction(ActionType.ALL_ARTICLES, payload);
const createdArticle = (payload: IArticleData) => typedAction(ActionType.CREATED_ARTICLE, payload);

export const allArticlesAsyncAction = (page: number = 0) => async (dispatch: Dispatch) => {
	const response: IAllArticlesData = await articlesApi.allArticles(page);
	dispatch(allArticlesAction(response));
};

export const addNewPostAsyncAction = (data: ICreatePostData) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: IArticleData = await newPostApi.createPost(data, token);
	dispatch(createdArticle(response));
};

type articlesAction = ReturnType<typeof allArticlesAction | typeof createdArticle>;

export default (state = initialState, action: articlesAction) => {
	switch (action.type) {
		case ActionType.ALL_ARTICLES:
			return {
				...state,
				allArticles: {
					...state.allArticles,
					articles: [...state.allArticles.articles, ...action.payload.articles],
				},
			};
		case ActionType.CREATED_ARTICLE:
			return {
				...state,
				allArticles: {
					...state.allArticles,
					articles: [action.payload.article, ...state.allArticles.articles],
				},
			};
		default:
			return state;
	}
};
