import { Dispatch } from 'redux';
import { commentsApi } from '../../api/commentsApi';
import { RootState } from '../configureStore';
import { ICommentData, ICommentRequestData, ICommentsState } from './interfaces';

export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

enum ActionType {
	COMMENTS = 'COMMENTS',
	DELETE_COMMENTS = 'DELETE_COMMENTS',
	CREATE_COMMENTS = 'CREATE_COMMENTS',
}

const initialState: ICommentsState = {
	comments: [],
};

const getCommentsAction = (payload: ICommentsState) => typedAction(ActionType.COMMENTS, payload);

const deleteCommentsAction = (payload: ICommentsState) =>
	typedAction(ActionType.DELETE_COMMENTS, payload);

const createCommentsAction = (payload: any) => typedAction(ActionType.CREATE_COMMENTS, payload);

export const getCommentsAsyncAction = (slug: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: ICommentsState = await commentsApi.getComments(slug, token);
	dispatch(getCommentsAction(response));
};

export const deleteCommentsAsyncAction = (slug: string, commentId: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { comments } = store().commentsStore;
	await commentsApi.deleteComments(slug, commentId, token);
	const newComments: ICommentData[] = comments.filter(({ id }: any) => id !== Number(commentId));
	dispatch(deleteCommentsAction({ comments: newComments }));
};

export const createCommentsAsyncAction = (slug: string, comment: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { comments } = store().commentsStore;
	const response: ICommentRequestData = await commentsApi.createComments(slug, comment, token);
	const newComments: ICommentData[] = [response.comment, ...comments];
	dispatch(createCommentsAction({ comments: newComments }));
};

type commentsAction = ReturnType<
	typeof getCommentsAction | typeof deleteCommentsAction | typeof createCommentsAction
>;

export default (state = initialState, action: commentsAction) => {
	switch (action.type) {
		case ActionType.COMMENTS:
			return action.payload;
		case ActionType.DELETE_COMMENTS:
			return action.payload;
		case ActionType.CREATE_COMMENTS:
			return action.payload;
		default:
			return state;
	}
};