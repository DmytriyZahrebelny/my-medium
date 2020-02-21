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

export interface IMatchParams {
	params: {
		id: string;
	};
}
