import { IAuthState } from './AuthStore/interfaces';
import { IArticlesState } from './ArticlesStore/interfaces';
import { ICommentsState } from './CommentsStore/interfaces';

export type StoreData = IAuthState & IArticlesState & ICommentsState;
