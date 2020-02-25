import { Dispatch } from 'redux';
import { articleCommentsApi } from '../../components/ArticlePage/ArticleComments/articleCommentsApi';
import { RootState } from '../configureStore';

interface ICommentsState {
	comments: any[];
}

enum ActionType {
	COMMENTS = 'COMMENTS',
	DELETE_COMMENTS = 'DELETE_COMMENTS',
}

const initialState: ICommentsState = {
	comments: [],
};

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const getCommentsAction = (payload: ICommentsState) => typedAction(ActionType.COMMENTS, payload);

const deleteCommentsAction = (payload: ICommentsState) =>
	typedAction(ActionType.DELETE_COMMENTS, payload);

export const getCommentsAsyncAction = (slug: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const response: ICommentsState = await articleCommentsApi.getComments(slug, token);
	dispatch(getCommentsAction(response));
};

export const deleteCommentsAsyncAction = (slug: string, commentId: string) => async (
	dispatch: Dispatch,
	store: () => RootState
) => {
	const { token } = store().authStore;
	const { comments } = store().commentsStore;
	await articleCommentsApi.deleteComments(slug, commentId, token);
	const newComments = comments.filter(({ id }: any) => id !== Number(commentId));
	dispatch(deleteCommentsAction({ comments: newComments }));
};

type commentsAction = ReturnType<typeof getCommentsAction | typeof deleteCommentsAction>;

export default (state = initialState, action: commentsAction) => {
	switch (action.type) {
		case ActionType.COMMENTS:
			return action.payload;
		case ActionType.DELETE_COMMENTS:
			return action.payload;
		default:
			return state;
	}
};
