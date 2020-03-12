import { types, flow, cast, getParent } from 'mobx-state-tree';
import { commentsApi } from '../../api/commentsApi';
// import { ICommentData, ICommentRequestData, ICommentsState } from '../ArticlesStore/interfaces';

const CommentModel = types.model({
	id: types.string,
	createdAt: types.string,
	body: types.string,
	author: types.model({
		username: types.string,
		image: types.string,
	}),
});

export const CommentsStore = types
	.model('CommentsStore', {
		comments: types.array(CommentModel),
	})
	.actions(self => ({}));
