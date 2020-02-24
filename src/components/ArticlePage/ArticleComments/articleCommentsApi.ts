export const articleCommentsApi: any = {
	async allArticles(slug: string, token: string): Promise<any> {
		const response = await fetch(`/api/articles/${slug}/comments`, {
			method: 'GET',
			headers: {
				Authorization: token ? `Token ${token}` : '',
			},
		});

		const data = await response.json();
		return data;
	},
};
