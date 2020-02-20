const limit = (count: number, page: number): string =>
	`limit=${count}&offset=${page ? page * count : 0}`;

export const articlesApi: any = {
	async allArticles(page: number): Promise<any> {
		const response = await fetch(`/api/articles?${limit(10, page)}`, {
			method: 'GET',
		});

		const data = await response.json();

		return data;
	},
};
