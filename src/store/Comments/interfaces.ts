export interface ICommentsState {
	comments: ICommentData[];
}

export interface ICommentData {
	id: string;
	createdAt: string;
	body: string;
	author: {
		username: string;
		image: string;
	};
}

export interface ICommentsResponseData {
	comment: ICommentData;
}
