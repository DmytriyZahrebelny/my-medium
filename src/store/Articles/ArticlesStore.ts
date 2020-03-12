import { types, flow, cast, getParent } from 'mobx-state-tree';
import { articlesApi } from '../../api/articlesApi';
import { newPostApi } from '../../api/newPostApi';
import { IResponseArticlesData, IArticleData, INewArticleFormData } from './interfaces';

const ArticleModel = types.model({
	title: types.string,
	slug: types.string,
	author: types.model({
		image: types.string,
		username: types.string,
	}),
	createdAt: types.string,
	body: types.string,
	favorited: types.boolean,
	favoritesCount: types.number,
});

export const ArticlesStore = types
	.model('ArticlesStore', {
		articles: types.array(ArticleModel),
		articleId: types.maybeNull(types.string),
	})
	.actions(self => ({
		getArticlesAction: flow(function* getArticles(page: number = 0) {
			const { authStore } = getParent(self);
			const response: IResponseArticlesData = yield articlesApi.allArticles(page, authStore.token);

			if (page) {
				self.articles = cast([...self.articles, ...response.articles]);
			} else {
				self.articles = cast(response.articles);
			}
		}),
		getArticlesByTagAction: flow(function* getArticlesByTag(tag: string, page: number = 0) {
			const response: IResponseArticlesData = yield articlesApi.getArticlesByTag(page, tag);
			if (page) {
				self.articles = cast([...self.articles, ...response.articles]);
			} else {
				self.articles = cast(response.articles);
			}
		}),
		addNewPostAction: flow(function* addNewPost(data: INewArticleFormData) {
			const { authStore } = getParent(self);
			const response = yield newPostApi.createPost(data, authStore.token);
			self.articles = cast([response.article, ...self.articles]);
			self.articleId = response.article.slug;
		}),
		checkPreferenceArticleAction: flow(function* checkPreferenceArticle(
			favorited: boolean,
			slug: string
		) {
			const { authStore } = getParent(self);
			const articleIndex: number = self.articles.findIndex(
				(article: IArticleData) => article.slug === slug
			);

			if (favorited) {
				const { article } = yield articlesApi.unfavoriteArticle(slug, authStore.token);
				self.articles.splice(articleIndex, 1, article);
			} else {
				const { article } = yield articlesApi.favoriteArticle(slug, authStore.token);
				self.articles.splice(articleIndex, 1, article);
			}
		}),
	}));
