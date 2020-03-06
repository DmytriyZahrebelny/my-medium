const limit = (count: number, page: number): string =>
	`limit=${count}&offset=${page ? page * count : 0}`;

const encode = encodeURIComponent;

interface ICreatePost {
	title: string;
	description: string;
	body: string;
	tagList?: string;
}

export const articlesApi: any = {
	async getArticles(page: number, token: string = ''): Promise<any> {
		const response = await fetch(`/api/articles?${limit(10, page)}`, {
			method: 'GET',
			headers: {
				Authorization: token ? `Token ${token}` : '',
			},
		});

		const data = await response.json();
		return data;
	},
	async getArticlesByTag(page: number, tag: string): Promise<any> {
		const response = await fetch(`/api//articles?tag=${encode(tag)}&${limit(10, page)}`, {
			method: 'GET',
		});

		const data = await response.json();
		return data;
	},
	async checkFavoriteArticle(slug: string, token: string) {
		const response = await fetch(`/api/articles/${slug}/favorite`, {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await response.json();
		return data;
	},
	async checkUnfavoriteArticle(slug: string, token: string) {
		const response = await fetch(`/api/articles/${slug}/favorite`, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await response.json();
		return data;
	},
	async createPost(
		{ title, description, body, tagList = '' }: ICreatePost,
		token: string | null
	): Promise<any> {
		try {
			const response = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
				body: JSON.stringify({ article: { title, description, body, tagList } }),
			});

			if (response.status >= 200 && response.status > 300) {
				const error = await response.json();
				await Promise.reject(error);
			}

			const data = await response.json();

			return data;
		} catch ({ errors }) {
			return errors;
		}
	},
};
