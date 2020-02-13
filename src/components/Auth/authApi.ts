interface ISignIn {
	email: string;
	password: string;
}

interface IRegist {
	username: string;
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
			window.localStorage.setItem('__token', data.user.token);

			return data;
		} catch ({ errors }) {
			const errorsFields: string[] = Object.keys(errors);
			const errorsMessages: string[] = errorsFields.map(err => `${err} ${errors[err]}`);
			return errorsMessages;
		}
	},
	async signUp({ username, email, password }: IRegist): Promise<any> {
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { username, email, password } }),
			});

			if (response.status >= 200 && response.status > 300) {
				const error = await response.json();
				await Promise.reject(error);
			}
			const data = await response.json();
			window.localStorage.setItem('__token', data.user.token);

			return data;
		} catch ({ errors }) {
			const errorsFields = Object.keys(errors);
			const errorsMessages = errorsFields.map(err => `${err} ${errors[err]}`);
			return errorsMessages;
		}
	},
	async getViewerData(token: string): Promise<any> {
		const response = await fetch('/api/user', {
			method: 'GET',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const data = await response.json();

		return data;
	},
};
