import { Dispatch } from 'redux';
import { commentsApi } from '../../api/commentsApi';
import { RootState } from '../configureStore';
import { ICommentData, ICommentsResponseData, ICommentsState } from './interfaces';

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

const deleteCommentsAction = (payload: ICommentData[]) =>
	typedAction(ActionType.DELETE_COMMENTS, payload);

const createCommentsAction = (payload: ICommentData[]) =>
	typedAction(ActionType.CREATE_COMMENTS, payload);

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

	const newCommentsList: ICommentData[] = comments.filter(
		({ id }: any) => id !== Number(commentId)
	);
	dispatch(deleteCommentsAction(newCommentsList));
};

export const createCommentsAsyncAction = (slug: string, comment: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { comments } = store().commentsStore;
	const response: ICommentsResponseData = await commentsApi.createComments(slug, comment, token);
	const newCommentsList: ICommentData[] = [response.comment, ...comments];
	dispatch(createCommentsAction(newCommentsList));
};

type typeAction = ReturnType<
	typeof getCommentsAction | typeof deleteCommentsAction | typeof createCommentsAction
>;

export default (state = initialState, action: typeAction) => {
	switch (action.type) {
		case ActionType.COMMENTS:
			return action.payload;
		case ActionType.DELETE_COMMENTS:
			return { comments: action.payload };
		case ActionType.CREATE_COMMENTS:
			return { comments: action.payload };
		default:
			return state;
	}
};
