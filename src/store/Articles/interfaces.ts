export interface IAllArticlesData {
	articles: object[] | [];
}

export interface IState {
	allArticles: IAllArticlesData;
}

export interface IArticleData {
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

export interface ICreatePostData {
	title: string;
	description: string;
	body: string;
}
