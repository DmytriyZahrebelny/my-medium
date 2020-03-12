import { types, flow, cast, getParent } from 'mobx-state-tree';
import { commentsApi } from '../../api/commentsApi';
import { ICommentData, ICommentsResponseData, ICommentsState } from './interfaces';

const CommentModel = types.model({
	id: types.number,
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
	.actions(self => ({
		getCommentsAction: flow(function* getComments(slug: string) {
			const { authStore } = getParent(self);
			const response: ICommentsState = yield commentsApi.getComments(slug, authStore.token);
			self.comments = cast(response.comments);
		}),
		deleteCommentsAction: flow(function* deleteComments(slug: string, commentId: string) {
			const { authStore } = getParent(self);
			yield commentsApi.deleteComments(slug, commentId, authStore.token);
			const newComments: ICommentData[] = self.comments.filter(
				({ id }: any) => id !== Number(commentId)
			);
			self.comments = cast(newComments);
		}),
		createCommentsAction: flow(function* createComments(slug: string, comment: string) {
			const { authStore } = getParent(self);
			const response: ICommentsResponseData = yield commentsApi.createComments(
				slug,
				comment,
				authStore.token
			);
			const newComments: ICommentData[] = [response.comment, ...self.comments];
			self.comments = cast(newComments);
		}),
	}));
