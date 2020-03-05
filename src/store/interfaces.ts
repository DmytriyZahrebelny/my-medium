import { IAuthState } from './AuthStore/interfaces';
import { IArticlesState } from './ArticlesStore/interfaces';
import { ICommentsState } from './CommentsStore/interfaces';
import { ITagsStore, TagsStore } from './TagsStore/TagsStore';
import { AuthState } from './AuthStore/AuthStore';
import { ArticlesStore } from './ArticlesStore/ArticlesStore';
import { CommentsStore } from './CommentsStore/CommentsStore';

export type StoreTypeData = IAuthState & IArticlesState & ICommentsState & ITagsStore;

export type ReducersTypeData = [
	typeof AuthState,
	typeof ArticlesStore,
	typeof CommentsStore,
	typeof TagsStore
];

export type ReducerType = ReturnType<
	typeof AuthState | typeof ArticlesStore | typeof CommentsStore | typeof TagsStore
>;
