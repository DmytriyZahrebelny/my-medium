import { types, Instance } from 'mobx-state-tree';
import { AuthStore } from './AuthStore/AuthStore';
import { ArticlesStore } from './ArticlesStore/ArticlesStore';
import { CommentsStore } from './CommentsStore/CommentsStore';
import { TagsStore } from './TagsStore/TagsStore';

export type RootStoreModel = Instance<typeof RootStore>;

export const RootStore = types.model('RootStore', {
	authStore: types.optional(AuthStore, {}),
	articlesStore: types.optional(ArticlesStore, {}),
	commentsStore: types.optional(CommentsStore, {}),
	tagsStore: types.optional(TagsStore, {}),
});
