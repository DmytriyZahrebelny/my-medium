interface ICreatePost {
	title: string;
	description: string;
	body: string;
	tagList?: string;
}

export const newPostApi = {
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
