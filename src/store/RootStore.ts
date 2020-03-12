import { types, Instance } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ArticlesStore } from './Articles/ArticlesStore';
import { CommentsStore } from './Comments/CommentsStore';
import { TagsStore } from './Tags/TagsStore';

export type RootStoreModel = Instance<typeof RootStore>;

export const RootStore = types.model('RootStore', {
	authStore: types.optional(AuthStore, {}),
	articlesStore: types.optional(ArticlesStore, {}),
	commentsStore: types.optional(CommentsStore, {}),
	tagsStore: types.optional(TagsStore, {}),
});
