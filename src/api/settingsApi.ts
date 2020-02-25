export const settingsApi = {
	async updateUserData(formData: any, token: string | null) {
		try {
			const response = await fetch('/api/user', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
				body: JSON.stringify({
					user: formData,
				}),
			});

			if (response.status >= 200 && response.status > 300) {
				const error = await response.json();
				await Promise.reject(error);
			}

			const data = await response.json();

			return data;
		} catch ({ errors }) {
			const errorsFields = Object.keys(errors);
			const errorsMessages = errorsFields.map(err => `${err} ${errors[err]}`);
			return errorsMessages;
		}
	},
};
