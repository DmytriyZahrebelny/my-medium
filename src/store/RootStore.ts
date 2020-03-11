import { types, Instance } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';

export type RootStoreModel = Instance<typeof RootStore>;

export const RootStore = types.model('RootStore', {
	auth: types.optional(AuthStore, {}),
});
