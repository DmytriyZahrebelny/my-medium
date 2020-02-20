export interface IArticlesData {
	title: string;
	slug: string;
	author: {
		image: string;
		username: string;
	};
	createdAt: string;
	body: string;
}

export interface IArticlesProps {
	articles: any[];
	lastArticlesLinkRef: any;
}
