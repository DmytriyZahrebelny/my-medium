export interface ICommentData {
	id: string;
	createdAt: string;
	body: string;
	author: {
		username: string;
		image: string;
	};
}

export interface ICommentRequestData {
	comment: ICommentData;
}
