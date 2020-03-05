import { useStore, IRootState } from '../globalStore';
import { tagsApi } from '../../api/tagsApi';

export interface ITagsStore {
	tags: string[];
}

export const useTagsStore = () => {
	const {
		state: { tags },
		dispatch,
	}: IRootState = useStore();

	return {
		tags,
		async getTagsAction() {
			const response: ITagsStore = await tagsApi.getTags();
			dispatch({ type: 'TAGS', payload: response });
		},
	};
};

type Action = { type: 'TAGS'; payload: string[] };

export const TagsStore = (state: string[] = [], action: Action) => {
	switch (action.type) {
		case 'TAGS':
			return action.payload;
		default:
			return state;
	}
};
