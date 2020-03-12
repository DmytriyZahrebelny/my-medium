export interface IResponseArticlesData {
	articles: IArticleData[];
}

export interface IArticlesState {
	articles: IArticleData[];
	articleId: null | string;
}

export interface INewArticleData {
	article: {
		title: string;
		slug: string;
		author: {
			image: string;
			username: string;
		};
		createdAt: string;
		body: string;
	};
}

export interface IArticleData {
	title: string;
	slug: string;
	author: {
		image: string;
		username: string;
	};
	createdAt: string;
	body: string;
	favorited: boolean;
	favoritesCount: number;
}

export interface INewArticleFormData {
	title: string;
	description: string;
	body: string;
}
