interface ISignIn {
	email: string;
	password: string;
}

export const authApi = {
	async signIn({ email, password }: ISignIn): Promise<any> {
		try {
			const response = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { email, password } }),
			});

			if (response.status >= 200 && response.status > 300) {
				const error = await response.json();
				await Promise.reject(error);
			}

			const data = await response.json();

			return data;
		} catch ({ errors }) {
			const errorValue = Object.keys(errors)[0];
			const errorMessage = errorValue + errors[errorValue][0];
			return errorMessage;
		}
	},
	async getViewerData() {
		const response = await fetch('/api/user', {
			method: 'GET',
			// headers: {
			// 	Authorization: `Token ${token}`,
			// },
		});

		const data = await response.json();

		return data;
	},
};
