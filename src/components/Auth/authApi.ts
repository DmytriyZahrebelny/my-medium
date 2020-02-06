export const AuthApi = {
	async getViewerData() {
		const response = await fetch('/api/user', {
			method: 'GET',
			// headers: {
			// 	Authorization: `Token token="${token}"`,
			// },
		});

		const data = await response.json();

		return data;
	},
};
