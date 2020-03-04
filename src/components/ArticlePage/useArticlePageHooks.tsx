import { useEffect } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthStore } from '../../store/AuthStore/AuthStore';
import { useArticlesStore } from '../../store/ArticlesStore/ArticlesStore';
import { IAllArticlesData, IMatchParams, IArticleCommentsData, IUserData } from './interfaces';

import * as actions from '../../store/Comments/CommentsStore';

export const useArticlePageHooks = (slug: string = '') => {
	const { number } = useParams();
	// const { comments }: IArticleCommentsData = useSelector((state: RootState) => state.commentsStore);
	const comments: any = [];
	const { params }: IMatchParams = useRouteMatch();
	const { user, token } = useAuthStore();
	const { articles, getArticlesAction }: any = useArticlesStore();
	console.log(articles);
	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			comment: '',
		},
		onSubmit: ({ comment }) => {
			if (comment.length) {
				// dispatch(actions.createCommentsAsyncAction(slug, comment));
			}
		},
	});

	const onDeleteCommentClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
		const currentElement = (evt.target as HTMLButtonElement).closest('.comments__delete');

		// if (currentElement) {
		// 	const commentId: string = currentElement.id;
		// 	// dispatch(actions.deleteCommentsAsyncAction(slug, commentId));
		// }
	};

	useEffect(() => {
		if (!articles.length) {
			getArticlesAction(Number(number) - 1);
		}
	}, [number, articles]);

	return {
		token,
		articles,
		params,
		user,
		handleSubmit,
		getFieldProps,
		comments,
		onDeleteCommentClick,
	};
};
