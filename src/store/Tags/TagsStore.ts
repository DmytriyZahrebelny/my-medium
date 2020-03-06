import { Dispatch } from 'redux';
import { tagsApi } from '../../api/tagsApi';

enum ActionType {
	TAGS = 'TAGS',
}

interface ITagsData {
	tags: string[];
}

export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };
export function typedAction(type: number, payload?: any) {
	return { type, payload };
}

const getTagsAction = (payload: string[]) => typedAction(ActionType.TAGS, payload);

export const getTagsAsyncAction = () => async (dispatch: Dispatch) => {
	const response: ITagsData = await tagsApi.getTags();
	dispatch(getTagsAction(response.tags));
};

type typeAction = ReturnType<typeof getTagsAction>;

export default (state: string[] = [], action: typeAction) => {
	switch (action.type) {
		case ActionType.TAGS:
			return action.payload;
		default:
			return state;
	}
};
