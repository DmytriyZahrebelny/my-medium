import { types, flow, cast } from 'mobx-state-tree';
import { tagsApi } from '../../api/tagsApi';

export interface ITagsStore {
	tags: string[];
}

export const TagsStore = types
	.model({
		tags: types.array(types.string),
	})
	.actions(self => ({
		getTagsAction: flow(function* getTags() {
			const response: ITagsStore = yield tagsApi.getTags();
			self.tags = cast(response.tags);
		}),
	}));
