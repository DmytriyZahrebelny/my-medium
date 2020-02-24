export interface IAllArticlesData {
	articles: IArticleData[];
}

export interface IState {
	allArticles: IAllArticlesData;
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
}

export interface ICreatePostData {
	title: string;
	description: string;
	body: string;
}
