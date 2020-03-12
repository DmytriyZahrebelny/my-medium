import { types, Instance } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ArticlesStore } from './Articles/ArticlesStore';

export type RootStoreModel = Instance<typeof RootStore>;

export const RootStore = types.model('RootStore', {
	auth: types.optional(AuthStore, {}),
	articlesStore: types.optional(ArticlesStore, {}),
});
