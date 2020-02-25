import { Dispatch } from 'redux';
import { articlesApi } from '../../components/Articles/articlesApi';
import { newPostApi } from '../../api/newPostApi';
import {
	IAllArticlesData,
	IState,
	INewArticleData,
	ICreatePostData,
	IArticleData,
} from './interfaces';
import { RootState } from '../configureStore';

enum ActionType {
	ALL_ARTICLES = 'ALL_ARTICLES',
	CREATED_ARTICLE = 'CREATED_ARTICLE',
	CHECK_PREFERENCE = 'CHECK_PREFERENCE',
}

const initialState: IState = {
	allArticles: {
		articles: [],
	},
	articleId: null,
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

const createdArticle = (payload: INewArticleData) =>
	typedAction(ActionType.CREATED_ARTICLE, payload);

const checkPreferenceArticleAction = (payload: IArticleData[]) =>
	typedAction(ActionType.CHECK_PREFERENCE, payload);

export const allArticlesAsyncAction = (page: number = 0) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: IAllArticlesData = await articlesApi.allArticles(page, token);
	dispatch(allArticlesAction(response));
};

export const addNewPostAsyncAction = (data: ICreatePostData) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: INewArticleData = await newPostApi.createPost(data, token);
	dispatch(createdArticle(response));
};

export const checkPreferenceArticleAsyncAction = (favorited: boolean, slug: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { articles }: IAllArticlesData = store().articlesStore.allArticles;
	const articleIndex: number = articles.findIndex((article: IArticleData) => article.slug === slug);

	if (favorited) {
		const { article } = await articlesApi.unfavoriteArticle(slug, token);
		articles.splice(articleIndex, 1, article);
		dispatch(checkPreferenceArticleAction(articles));
	} else {
		const { article } = await articlesApi.favoriteArticle(slug, token);
		articles.splice(articleIndex, 1, article);
		dispatch(checkPreferenceArticleAction(articles));
	}
};

type articlesAction = ReturnType<
	typeof allArticlesAction | typeof createdArticle | typeof checkPreferenceArticleAction
>;

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
				articleId: action.payload.article.slug,
			};
		case ActionType.CHECK_PREFERENCE:
			return {
				...state,
				allArticles: {
					articles: [...action.payload],
				},
			};
		default:
			return state;
	}
};
