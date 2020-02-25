export const articleCommentsApi: any = {
	async getComments(slug: string, token: string): Promise<any> {
		const response = await fetch(`/api/articles/${slug}/comments`, {
			method: 'GET',
			headers: {
				Authorization: token ? `Token ${token}` : '',
			},
		});

		const data = await response.json();
		return data;
	},
	async deleteComments(slug: string, commentId: number, token: string): Promise<any> {
		await fetch(`/api/articles/${slug}/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token ? `Token ${token}` : '',
			},
		});
	},
	async createComments(slug: string, comment: string, token: string): Promise<any> {
		const response = await fetch(`/api/articles/${slug}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? `Token ${token}` : '',
			},
			body: JSON.stringify({ comment: { body: comment } }),
		});

		const data = await response.json();
		return data;
	},
};
