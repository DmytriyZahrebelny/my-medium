export interface IAllArticlesData {
	articles: any[];
}

export interface IUserData {
	user: {
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string | null;
		token: string;
	} | null;
	token: string | null;
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

export interface IMatchParams {
	params: {
		id: string;
	};
}

export interface ICommentData {
	id: string;
	createdAt: string;
	body: string;
	author: {
		username: string;
		image: string;
	};
}

export interface IArticleCommentsData {
	comments: ICommentData[];
}

export interface ICommentsProps {
	slug: string;
}
