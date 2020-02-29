export interface IArticlesList {
	articles: IArticlesData[];
}

export interface IObserverData {
	current: any;
}

export interface IArticlesData {
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

export interface IArticlesProps {
	articles: any[];
	lastArticlesLinkRef: any;
}

export interface IPreferenceArticleProps {
	favorited: boolean;
	favoritesCount: number;
	slug: string;
}
