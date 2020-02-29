const limit = (count: number, page: number): string =>
	`limit=${count}&offset=${page ? page * count : 0}`;

const encode = encodeURIComponent;

export const articlesApi: any = {
	async allArticles(page: number, token: string = ''): Promise<any> {
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
	async favoriteArticle(slug: string, token: string) {
		const response = await fetch(`/api/articles/${slug}/favorite`, {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await response.json();
		return data;
	},
	async unfavoriteArticle(slug: string, token: string) {
		const response = await fetch(`/api/articles/${slug}/favorite`, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await response.json();
		return data;
	},
};
