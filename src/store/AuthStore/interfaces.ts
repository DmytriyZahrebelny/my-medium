export interface ILoginResponse {
	user: {
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string | null;
		token: string;
	};
}

export interface ISignIn {
	email: string;
	password: string;
}

export interface ISignUp {
	username: string;
	email: string;
	password: string;
}
