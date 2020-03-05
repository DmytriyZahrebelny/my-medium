import { useStore, IRootState } from '../globalStore';
import { commentsApi } from '../../api/commentsApi';
import { ICommentData, ICommentRequestData, ICommentsState } from './interfaces';

export const commentsInitialState: ICommentsState = {
	comments: [],
};

export const useCommentsStore = () => {
	const {
		state: { comments, token },
		dispatch,
	}: IRootState = useStore();

	return {
		comments,
		async getCommentsAction(slug: string) {
			const response: ICommentsState = await commentsApi.getComments(slug, token);
			dispatch({ type: 'COMMENTS', payload: response });
		},
		async deleteCommentsAction(slug: string, commentId: string) {
			await commentsApi.deleteComments(slug, commentId, token);
			const newComments: ICommentData[] = comments.filter(
				({ id }: any) => id !== Number(commentId)
			);
			dispatch({ type: 'DELETE_COMMENTS', payload: { comments: newComments } });
		},
		async createCommentsAction(slug: string, comment: string) {
			const response: ICommentRequestData = await commentsApi.createComments(slug, comment, token);
			const newComments: ICommentData[] = [response.comment, ...comments];
			dispatch({ type: 'CREATE_COMMENTS', payload: { comments: newComments } });
		},
	};
};

export const CommentsStore = (state = commentsInitialState, action: any) => {
	switch (action.type) {
		case 'COMMENTS':
			return action.payload;
		case 'DELETE_COMMENTS':
			return action.payload;
		case 'CREATE_COMMENTS':
			return action.payload;
		default:
			return state;
	}
};
