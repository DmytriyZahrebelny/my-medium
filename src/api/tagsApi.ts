export const tagsApi: any = {
	async getTags(): Promise<any> {
		const response = await fetch('/api/tags', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return data;
	},
};
