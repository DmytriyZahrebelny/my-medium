export interface ICommentsState {
	comments: ICommentData[];
}

export interface ICommentData {
	id: number;
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
