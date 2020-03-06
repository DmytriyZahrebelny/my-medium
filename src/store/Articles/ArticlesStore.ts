import { Dispatch } from 'redux';
import { articlesApi } from '../../api/articlesApi';
import {
	IArticlesResponse,
	IArticlesState,
	INewArticleData,
	ICreatePostData,
	IArticleData,
} from './interfaces';
import { RootState } from '../configureStore';

export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

enum ActionType {
	GET_ARTICLES = 'GET_ARTICLES',
	INFINITY_ATTICALS = 'INFINITY_ATTICALS',
	ARTICLE_BY_TAG = 'ARTICLE_BY_TAG',
	CREATED_ARTICLE = 'CREATED_ARTICLE',
	CHECK_PREFERENCE = 'CHECK_PREFERENCE',
}

const initialState: IArticlesState = {
	articles: [],
	articleId: null,
};

const getArticlesAction = (payload: IArticleData[]) =>
	typedAction(ActionType.GET_ARTICLES, payload);

const infinityLoadArticlesAction = (payload: IArticleData[]) =>
	typedAction(ActionType.INFINITY_ATTICALS, payload);

const getArticleByTagAction = (payload: IArticleData[]) =>
	typedAction(ActionType.ARTICLE_BY_TAG, payload);

const infinityLoadArticlesByTagAction = (payload: IArticleData[]) =>
	typedAction(ActionType.INFINITY_ATTICALS, payload);

const createdArticleAction = (payload: INewArticleData) =>
	typedAction(ActionType.CREATED_ARTICLE, payload);

const checkPreferenceArticleAction = (payload: IArticleData[]) =>
	typedAction(ActionType.CHECK_PREFERENCE, payload);

export const getArticlesAsyncAction = (page: number = 0) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: IArticlesResponse = await articlesApi.getArticles(page, token);
	if (page) {
		dispatch(infinityLoadArticlesAction(response.articles));
	} else {
		dispatch(getArticlesAction(response.articles));
	}
};

export const getArticleByTagAsyncAction = (tag: string, page: number = 0) => async (
	dispatch: Dispatch
) => {
	const response: IArticlesResponse = await articlesApi.getArticlesByTag(page, tag);
	if (page) {
		dispatch(infinityLoadArticlesByTagAction(response.articles));
	} else {
		dispatch(getArticleByTagAction(response.articles));
	}
};

export const addNewPostAsyncAction = (data: ICreatePostData) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: INewArticleData = await articlesApi.createPost(data, token);
	dispatch(createdArticleAction(response));
};

export const checkPreferenceArticleAsyncAction = (favorited: boolean, slug: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { articles }: IArticlesResponse = store().articlesStore;
	const articleIndex: number = articles.findIndex((article: IArticleData) => article.slug === slug);

	if (favorited) {
		const { article } = await articlesApi.checkUnfavoriteArticle(slug, token);
		articles.splice(articleIndex, 1, article);
		dispatch(checkPreferenceArticleAction(articles));
	} else {
		const { article } = await articlesApi.checkFavoriteArticle(slug, token);
		articles.splice(articleIndex, 1, article);
		dispatch(checkPreferenceArticleAction(articles));
	}
};

type typeAction = ReturnType<
	| typeof getArticlesAction
	| typeof createdArticleAction
	| typeof checkPreferenceArticleAction
	| typeof getArticleByTagAction
	| typeof infinityLoadArticlesAction
	| typeof infinityLoadArticlesByTagAction
>;

export default (state = initialState, action: typeAction) => {
	switch (action.type) {
		case ActionType.GET_ARTICLES:
			return {
				...state,
				articles: action.payload,
			};
		case ActionType.INFINITY_ATTICALS:
			return {
				...state,
				articles: [...state.articles, ...action.payload],
			};
		case ActionType.CREATED_ARTICLE:
			return {
				...state,
				articles: [action.payload.article, ...state.articles],
				articleId: action.payload.article.slug,
			};
		case ActionType.ARTICLE_BY_TAG:
			return {
				...state,
				articles: action.payload,
			};
		case ActionType.CHECK_PREFERENCE:
			return {
				...state,
				articles: [...action.payload],
			};
		default:
			return state;
	}
};
