export interface IAuth {
	user: {
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		username: string;
		bio: any;
		image: string | null;
		token: string;
	} | null;
	errorsMesages: string[] | null;
	token: string | null;
	redirectTo: null | string;
}

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
