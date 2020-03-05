import { useStore, IRootState } from '../globalStore';
import { articlesApi } from '../../api/articlesApi';
import { newPostApi } from '../../api/newPostApi';
import {
	INewArticleData,
	IResponseArticlesData,
	IArticleData,
	INewArticleFormData,
} from './interfaces';

export interface IArticlesState {
	articles: IArticleData[];
	articleId: null | string;
}

export const articlesInitialState: IArticlesState = {
	articles: [],
	articleId: null,
};

export const useArticlesStore = () => {
	const { state, dispatch }: IRootState = useStore();
	return {
		articles: state.articles,
		articleId: state.articleId,
		async getArticlesAction(page: number = 0) {
			const { token } = state;
			const response: IResponseArticlesData = await articlesApi.allArticles(page, token);
			if (page) {
				dispatch({ type: 'INFINITY_ATTICALS', payload: response.articles });
			} else {
				dispatch({ type: 'GET_ARTICLES', payload: response.articles });
			}
		},
		async getArticlesByTagAction(tag: string, page: number = 0) {
			const response: IResponseArticlesData = await articlesApi.getArticlesByTag(page, tag);
			if (page) {
				dispatch({ type: 'INFINITY_ATTICALS', payload: response.articles });
			} else {
				dispatch({ type: 'ARTICLE_BY_TAG', payload: response.articles });
			}
		},
		async addNewPostAction(data: INewArticleFormData) {
			const { token } = state;
			const response = await newPostApi.createPost(data, token);
			dispatch({ type: 'CREATED_ARTICLE', payload: response });
		},
		async checkPreferenceArticleAction(favorited: boolean, slug: string) {
			const { token } = state;
			const { articles }: IResponseArticlesData = state;
			const articleIndex: number = articles.findIndex(
				(article: IArticleData) => article.slug === slug
			);

			if (favorited) {
				const { article } = await articlesApi.unfavoriteArticle(slug, token);
				articles.splice(articleIndex, 1, article);
				dispatch({ type: 'CHECK_PREFERENCE', payload: articles });
			} else {
				const { article } = await articlesApi.favoriteArticle(slug, token);
				articles.splice(articleIndex, 1, article);
				dispatch({ type: 'CHECK_PREFERENCE', payload: articles });
			}
		},
	};
};

type Action =
	| {
			type: 'GET_ARTICLES' | 'INFINITY_ATTICALS' | 'ARTICLE_BY_TAG' | 'CHECK_PREFERENCE';
			payload: IArticleData[];
	  }
	| { type: 'CREATED_ARTICLE'; payload: INewArticleData };

export const ArticlesStore = (state = articlesInitialState, action: Action) => {
	switch (action.type) {
		case 'GET_ARTICLES':
			return {
				...state,
				articles: action.payload,
			};
		case 'INFINITY_ATTICALS':
			return {
				...state,
				articles: [...state.articles, ...action.payload],
			};
		case 'CREATED_ARTICLE':
			return {
				...state,
				articles: [action.payload.article, ...state.articles],
				articleId: action.payload.article.slug,
			};
		case 'ARTICLE_BY_TAG':
			return {
				...state,
				articles: action.payload,
			};
		case 'CHECK_PREFERENCE':
			return {
				...state,
				articles: [...action.payload],
			};
		default:
			return state;
	}
};
