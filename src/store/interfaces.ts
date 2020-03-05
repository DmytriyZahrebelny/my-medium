import { IAuthState } from './AuthStore/interfaces';
import { IArticlesState } from './ArticlesStore/interfaces';
import { ICommentsState } from './CommentsStore/interfaces';
import { ITagsStore } from './TagsStore/TagsStore';

export type StoreData = IAuthState & IArticlesState & ICommentsState & ITagsStore;
